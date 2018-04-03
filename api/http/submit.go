package http

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/model/form"
	"github.com/18F/e-QIP-prototype/api/webservice"
)

type SubmitHandler struct {
	Env      *api.Settings
	Log      *api.LogService
	Token    *api.TokenService
	Database *api.DatabaseService
}

// Submit the application package to the external web service for further processing.
func (service SubmitHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	account := &api.Account{}

	// Valid token and audience while populating the audience ID
	_, err := service.Token.CheckToken(account.ValidJwtToken)
	if err != nil {
		service.Log.Warn(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	if err := account.Get(); err != nil {
		service.Log.Warn(api.NoAccount, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	if err := transmit(w, r, account, service.Database); err != nil {
		w.WriteHeader(http.StatusConflict)
		EncodeErrJSON(w, err)
		return
	}

	// Lock the account
	if err = account.Lock(); err != nil {
		service.Log.Warn(api.AccountUpdateError, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}
}

func transmit(w http.ResponseWriter, r *http.Request, account *model.Account, context *db.DatabaseContext) error {
	log := api.NewLoggerFromRequest(r)
	url := os.Getenv("WS_URL")
	if url == "" {
		log.Warn(api.WebserviceMissingURL)
		return errors.New(api.WebserviceMissingURL)
	}
	key := os.Getenv("WS_KEY")
	if key == "" {
		log.Warn(api.WebserviceMissingKey)
		return errors.New(api.WebserviceMissingKey)
	}

	// Generate an XML package and send to the external webservice.
	log.Info(api.GeneratingPackage)
	xml := form.Package(context, account.ID, false)
	data, err := form.ApplicationData(context, account.ID, false)
	if err != nil {
		log.Warn(api.WebserviceCannotGetApplicationData, err)
		return err
	}

	log.Info(api.TransmissionStarted)
	client := webservice.NewClient(url, key)

	ir, err := newImportRequest(data, string(xml))
	if err != nil {
		log.Warn(err)
		return err
	}
	response, err := client.ImportRequest(ir)
	log.Info(api.TransmissionStopped, err)

	// Store transmission information
	var agencyKey int
	var requestKey string
	status := "Sent"

	switch {
	case err != nil:
		// Error with actual http call
		status = err.Error()
		agencyKey = ir.AgencyID
	case response.Error() != nil:
		// Errors specific to webservice call
		status = response.Error().Error()
		agencyKey = ir.AgencyID
	default:
		// No errors. Retrieve agency and request keys
		agencyKey, requestKey = response.ImportRequestResponse.Keys()
	}

	transmission := &model.Transmission{
		AccountID:  account.ID,
		Raw:        response.ResponseBody,
		AgencyKey:  agencyKey,
		RequestKey: requestKey,
		Status:     status,
		Created:    time.Now(),
		Modified:   time.Now(),
	}
	if err = transmission.Save(context); err != nil {
		log.Warn(api.TransmissionStorageError)
		return err
	}
	log.Info(api.TransmissionRecorded)
	if status != "Sent" {
		log.Warn(api.TransmissionError)
		return errors.New(api.TransmissionError)
	}
	return nil
}

func newImportRequest(application map[string]interface{}, xmlContent string) (*webservice.ImportRequest, error) {
	var ciAgencyUserPseudoSSN bool
	var agencyID int
	var agencyGroupID int

	ciAgencyIDEnv := os.Getenv("WS_CALLERINFO_AGENCY_ID")
	if ciAgencyIDEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyID)
	}
	ciAgencyUserSSNEnv := os.Getenv("WS_CALLERINFO_AGENCY_USER_SSN")
	if ciAgencyUserSSNEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencySSN)
	}
	// Parse agency id
	agencyIDEnv := os.Getenv("WS_AGENCY_ID")
	if agencyIDEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingAgencyID)
	} else {
		i, err := strconv.Atoi(agencyIDEnv)
		if err != nil {
			return nil, err
		}
		agencyID = i
	}

	// Parse agency group id if necessary
	agencyGroupIDEnv := os.Getenv("WS_AGENCY_GROUP_ID")
	if agencyGroupIDEnv != "" {
		i, err := strconv.Atoi(agencyGroupIDEnv)
		if err != nil {
			return nil, err
		}
		agencyGroupID = i
	}

	ciAgencyUserPseudoSSNEnv := os.Getenv("WS_CALLERINFO_AGENCY_USER_PSEUDOSSN")
	if ciAgencyUserPseudoSSNEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	b, err := strconv.ParseBool(ciAgencyUserPseudoSSNEnv)
	if err != nil {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	ciAgencyUserPseudoSSN = b

	ci := webservice.NewCallerInfo(ciAgencyIDEnv, ciAgencyUserPseudoSSN, ciAgencyUserSSNEnv)
	return webservice.NewImportRequest(ci, agencyID, agencyGroupID, application, xmlContent)
}
