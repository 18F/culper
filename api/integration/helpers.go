package integration

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"math/rand"
	gohttp "net/http"
	"net/http/httptest"
	"os"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/nsf/jsondiff"
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/postgresql"
	"github.com/18F/e-QIP-prototype/api/simplestore"
)

var updateGolden = flag.Bool("update-golden", false, "update golden files")

type serviceSet struct {
	env   api.Settings
	log   api.LogService
	db    api.DatabaseService
	store api.StorageService
}

func cleanTestServices(t *testing.T) serviceSet {
	t.Helper()

	env := &env.Native{}
	os.Setenv(api.LogLevel, "info")
	env.Configure()

	log := &log.Service{Log: log.NewLogger()}

	dbConf := postgresql.DBConfig{
		User:     env.String(api.DatabaseUser),
		Password: env.String(api.DatabasePassword),
		Address:  env.String(api.DatabaseHost),
		DBName:   env.String(api.TestDatabaseName),
		SSLMode:  env.String(api.DatabaseSSLMode),
	}

	db := postgresql.NewPostgresService(dbConf, log)

	serializer := simplestore.NewJSONSerializer()

	store, storeErr := simplestore.NewSimpleStore(postgresql.PostgresConnectURI(dbConf), log, serializer)
	if storeErr != nil {
		t.Fatal(storeErr)
	}

	return serviceSet{
		env,
		log,
		db,
		store,
	}
}

// randomEmail an example.com email address with 10 random characters
func randomEmail() string {

	rand.Seed(time.Now().UTC().UnixNano())

	len := 10
	bytes := make([]byte, len)
	for i := 0; i < len; i++ {
		aint := int('a')
		zint := int('z')
		char := aint + rand.Intn(zint-aint)
		bytes[i] = byte(char)
	}

	email := string(bytes) + "@example.com"

	return email

}

func createTestAccount(t *testing.T, db api.DatabaseService) api.Account {
	t.Helper()

	email := randomEmail()

	account := api.Account{
		Username:    email,
		Email:       email,
		FormType:    "SF86",
		FormVersion: "2016-11",
	}

	_, err := account.Save(db, -1)
	if err != nil {
		t.Fatal(err)
	}

	return account

}

func populateAccount(db api.DatabaseService, account api.Account, testCasePath string) error {

	b, err := ioutil.ReadFile(testCasePath)
	if err != nil {
		return err
	}

	sections := make(map[string]map[string]api.Payload)
	err = json.Unmarshal(b, &sections)
	if err != nil {
		return err
	}

	for sectionName := range sections {
		section := sections[sectionName]

		for subName := range section {
			subPayload := section[subName]

			entity, err := subPayload.Entity()
			if err != nil {
				errstr := fmt.Sprintf("Failed to unpack %s %s ... %s", sectionName, subName, err.Error())
				return errors.New(errstr)
			}

			if _, err := entity.Save(db, account.ID); err != nil {
				errstr := fmt.Sprintf("Failed to save %s %s ... %s", sectionName, subName, err.Error())
				return errors.New(errstr)
			}
		}
	}

	return nil
}

// readTestData pulls in test data as a string
func readTestData(t *testing.T, filepath string) []byte {
	t.Helper()
	b, err := ioutil.ReadFile(filepath)
	if err != nil {
		t.Fatal(err)
	}
	return b
}

// saveJSON calls the save handler with the given json body.
func saveJSON(services serviceSet, json []byte, accountID int) *gohttp.Response {
	// create request/response
	r := httptest.NewRequest("POST", "/me/save", strings.NewReader(string(json)))
	// authenticate user.
	authCtx := http.SetAccountIDInRequestContext(r, accountID)
	r = r.WithContext(authCtx)

	w := httptest.NewRecorder()

	saveHandler := http.SaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	saveHandler.ServeHTTP(w, r)

	resp := w.Result()

	return resp

}

func getForm(services serviceSet, accountID int) *gohttp.Response {
	// create request/response
	path := "/me/form/"
	r := httptest.NewRequest("GET", path, nil)
	// authenticate user.
	authCtx := http.SetAccountIDInRequestContext(r, accountID)
	r = r.WithContext(authCtx)

	w := httptest.NewRecorder()

	formHandler := http.FormHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	formHandler.ServeHTTP(w, r)

	formResp := w.Result()

	return formResp
}

func getApplication(t *testing.T, services serviceSet, account api.Account) api.Application {
	t.Helper()

	formResp := getForm(services, account.ID)
	if formResp.StatusCode != 200 {
		t.Fatal("Failed to load Employment History", formResp.StatusCode)
	}
	formBody := readBody(t, formResp)

	app := api.BlankApplication(account.ID, account.FormType, account.FormVersion)
	jsonErr := json.Unmarshal([]byte(formBody), &app)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	return app

}

func readBody(t *testing.T, resp *gohttp.Response) string {
	t.Helper()

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}
	return string(body)
}

func areEqualJSON(t *testing.T, s1, s2 []byte) bool {
	t.Helper()
	var o1 interface{}
	var o2 interface{}

	var err error
	err = json.Unmarshal(s1, &o1)
	if err != nil {
		t.Log("Unable to unmarshal tested JSON 1")
		t.Fail()
	}
	err = json.Unmarshal(s2, &o2)
	if err != nil {
		t.Log("Unable to unmarshal tested JSON 2")
		t.Fail()
	}

	return reflect.DeepEqual(o1, o2)
}

func compareGoldenJSON(t *testing.T, testJSON []byte, goldenPath string) {
	t.Helper()

	if *updateGolden {

		// To get the format right, we unmarshal then marshal indent whatever we are comparing
		var parsed interface{}
		unmarshalErr := json.Unmarshal(testJSON, &parsed)
		if unmarshalErr != nil {
			t.Fatal(unmarshalErr)
		}
		prettyJSON, marshalErr := json.MarshalIndent(parsed, "", "  ")
		if marshalErr != nil {
			t.Fatal(marshalErr)
		}

		writeErr := ioutil.WriteFile(goldenPath, prettyJSON, 0644)
		if writeErr != nil {
			t.Fatal(writeErr)
		}

		t.Log("Wrote new Golden File for ", goldenPath)
		t.Fail()

	}

	expectedJSON, readErr := ioutil.ReadFile(goldenPath)
	if readErr != nil {
		t.Fatal(readErr)
	}

	opts := jsondiff.DefaultConsoleOptions()
	diff, output := jsondiff.Compare(expectedJSON, testJSON, &opts)
	if diff != jsondiff.FullMatch {
		fmt.Println("Not Equal", output)
		fmt.Println("Raw", string(testJSON))
		t.Log(fmt.Sprintf("Didn't get the same thing back in %s", goldenPath))
		t.Fail()
	}

}
