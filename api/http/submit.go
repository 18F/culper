package http

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/eqip"
)

type SubmitHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	Xml      api.XmlService
}

// Submit the application package to the external web service for further processing.
func (service SubmitHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	account := &api.Account{}

	// Valid token and audience while populating the audience ID
	_, id, err := service.Token.CheckToken(r)
	if err != nil {
		service.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	account.ID = id
	if _, err := account.Get(service.Database, id); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	if err := service.transmit(w, r, account); err != nil {
		w.WriteHeader(http.StatusConflict)
		EncodeErrJSON(w, err)
		return
	}

	// Lock the account
	if err = account.Lock(service.Database); err != nil {
		service.Log.WarnError(api.AccountUpdateError, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}
}

func (service SubmitHandler) transmit(w http.ResponseWriter, r *http.Request, account *api.Account) error {
	if !service.Env.True(api.WS_ENABLED) {
		service.Log.Info("Skipping webservice call", nil)
		return nil
	}
	url := service.Env.String(api.WS_URL)
	if url == "" {
		service.Log.Warn(api.WebserviceMissingURL, api.LogFields{})
		return errors.New(api.WebserviceMissingURL)
	}
	key := service.Env.String(api.WS_KEY)
	if key == "" {
		service.Log.Warn(api.WebserviceMissingKey, api.LogFields{})
		return errors.New(api.WebserviceMissingKey)
	}

	// Generate an XML package and send to the external webservice.
	service.Log.Info(api.GeneratingPackage, api.LogFields{})
	xml := api.Package(service.Database, service.Xml, account.ID, false)
	data, err := api.ApplicationData(service.Database, account.ID, false)
	if err != nil {
		service.Log.WarnError(api.WebserviceCannotGetApplicationData, err, api.LogFields{})
		return err
	}

	service.Log.Info(api.TransmissionStarted, api.LogFields{})
	client := eqip.NewClient(url, key)

	ir, err := service.newImportRequest(data, string(xml))
	if err != nil {
		service.Log.WarnError(api.WebserviceErrorCreatingImportRequest, err, api.LogFields{})
		return err
	}
	response, err := client.ImportRequest(ir)
	service.Log.InfoError(api.TransmissionStopped, err, api.LogFields{})

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

	transmission := &api.Transmission{
		AccountID:  account.ID,
		Raw:        response.ResponseBody,
		AgencyKey:  agencyKey,
		RequestKey: requestKey,
		Status:     status,
		Created:    time.Now(),
		Modified:   time.Now(),
	}
	if err = transmission.Save(service.Database); err != nil {
		service.Log.Warn(api.TransmissionStorageError, api.LogFields{})
		return err
	}
	service.Log.Info(api.TransmissionRecorded, api.LogFields{})
	if status != "Sent" {
		service.Log.Warn(api.TransmissionError, api.LogFields{})
		return errors.New(api.TransmissionError)
	}
	return nil
}

func (service SubmitHandler) newImportRequest(application map[string]interface{}, xmlContent string) (*eqip.ImportRequest, error) {
	var ciAgencyUserPseudoSSN bool
	var agencyID int
	var agencyGroupID int

	ciAgencyIDEnv := service.Env.String(api.WS_CALLERINFO_AGENCY_ID)
	if ciAgencyIDEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyID)
	}
	ciAgencyUserSSNEnv := service.Env.String(api.WS_CALLERINFO_AGENCY_USER_SSN)
	if ciAgencyUserSSNEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencySSN)
	}
	// Parse agency id
	agencyIDEnv := service.Env.String(api.WS_AGENCY_ID)
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
	agencyGroupIDEnv := service.Env.String(api.WS_AGENCY_GROUP_ID)
	if agencyGroupIDEnv != "" {
		i, err := strconv.Atoi(agencyGroupIDEnv)
		if err != nil {
			return nil, err
		}
		agencyGroupID = i
	}

	ciAgencyUserPseudoSSNEnv := service.Env.String(api.WS_CALLERINFO_AGENCY_USER_PSEUDOSSN)
	if ciAgencyUserPseudoSSNEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	b, err := strconv.ParseBool(ciAgencyUserPseudoSSNEnv)
	if err != nil {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	ciAgencyUserPseudoSSN = b

	ci := eqip.NewCallerInfo(ciAgencyIDEnv, ciAgencyUserPseudoSSN, ciAgencyUserSSNEnv)
	return eqip.NewImportRequest(ci, agencyID, agencyGroupID, application, xmlContent)
}
