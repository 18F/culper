package integration

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	gohttp "net/http"
	"net/http/httptest"
	"os"
	"strings"
	"time"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/postgresql"
)

type serviceSet struct {
	env api.Settings
	log api.LogService
	db  api.DatabaseService
}

func cleanTestServices() serviceSet {
	env := &env.Native{}
	os.Setenv(api.LogLevel, "info")
	env.Configure()

	log := &log.Service{Log: log.NewLogger()}

	dbConf := postgresql.DBConfig{
		User:     env.String(api.DatabaseUser),
		Password: env.String(api.DatabasePassword),
		Address:  env.String(api.DatabaseHost),
		DBName:   env.String(api.TestDatabaseName),
	}

	db := postgresql.NewPostgresService(dbConf, log)

	return serviceSet{
		env,
		log,
		db,
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

func createTestAccount(db api.DatabaseService) (api.Account, error) {

	email := randomEmail()

	account := api.Account{
		Username:    email,
		Email:       email,
		FormType:    "SF86",
		FormVersion: "2016-11",
	}

	_, err := account.Save(db, -1)
	if err != nil {
		return api.Account{}, err
	}

	return account, nil

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
func readTestData(filepath string) (string, error) {
	b, err := ioutil.ReadFile(filepath)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

// saveJSON calls the save handler with the given json body.
func saveJSON(services serviceSet, json string, accountID int) *gohttp.Response {

	// create request/response
	r := httptest.NewRequest("POST", "/me/save", strings.NewReader(json))
	// authenticate user.
	authCtx := http.SetAccountIDInRequestContext(r, accountID)
	r = r.WithContext(authCtx)

	w := httptest.NewRecorder()

	saveHandler := http.SaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
	}

	saveHandler.ServeHTTP(w, r)

	resp := w.Result()

	return resp

}
