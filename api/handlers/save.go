package handlers

import (
	"encoding/hex"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/model/form"
	"github.com/18F/e-QIP-prototype/api/webservice"
)

// AllSections handler will return a JSON object of all currently saved application
// information specifict to the account.
func AllSections(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := jwt.CheckToken(r, account.ValidJwtToken, cf.TargetAudiences()...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		log.Warn(logmsg.AccountLocked)
		EncodeErrJSON(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(form.Application(context, account.ID, false)))
}

// Hash of the application data used to verify data integrity.
func Hash(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := jwt.CheckToken(r, account.ValidJwtToken, cf.TargetAudiences()...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	hash := form.Hash(context, account.ID)
	fmt.Fprint(w, hex.EncodeToString(hash[:]))
}

// Status returns the accounts current state.
func Status(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	context := db.NewDB()
	account := &model.Account{}
	account.WithContext(context)

	// Valid token and audience while populating the audience ID
	_, err := jwt.CheckToken(r, account.ValidJwtToken, cf.TargetAudiences()...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(form.Metadata(context, account.ID, account.Locked)))
}

// Submit the application package to the external web service for further processing.
func Submit(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	context := db.NewDB()
	account := &model.Account{}
	account.WithContext(context)

	// Valid token and audience while populating the audience ID
	_, err := jwt.CheckToken(r, account.ValidJwtToken, cf.TargetAudiences()...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		log.Warn(logmsg.AccountLocked)
		EncodeErrJSON(w, err)
		return
	}

	if err := transmit(w, r, account, context); err != nil {
		w.WriteHeader(http.StatusConflict)
		EncodeErrJSON(w, err)
		return
	}

	// Lock the account
	if err = account.Lock(); err != nil {
		log.WithError(err).Warn(logmsg.AccountUpdateError)
		EncodeErrJSON(w, err)
		return
	}
}

// Section returns the data for one section of the application.
func Section(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := jwt.CheckToken(r, account.ValidJwtToken, cf.TargetAudiences()...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		log.Warn(logmsg.AccountLocked)
		EncodeErrJSON(w, err)
		return
	}

	payloadType := r.FormValue("type")
	if payloadType == "" {
		log.WithError(err).Warn(logmsg.PayloadMissingType)
		http.Error(w, "No payload type provided", http.StatusInternalServerError)
		return
	}

	payload := &form.Payload{
		Type: payloadType,
	}
	entity, err := payload.Entity()
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if _, err = entity.Get(context, account.ID); err != nil {
		log.WithError(err).Warn(logmsg.EntityError)
		EncodeJSON(w, `{}`)
		return
	}

	EncodeJSON(w, entity.Marshal())
}

// Save a payload of information for the provided account.
func Save(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := jwt.CheckToken(r, account.ValidJwtToken, cf.TargetAudiences()...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		EncodeErrJSON(w, err)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		log.Warn(logmsg.AccountLocked)
		EncodeErrJSON(w, err)
		return
	}

	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEmpty)
		EncodeErrJSON(w, err)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &form.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		log.WithError(err).Warn(logmsg.PayloadDeserializeError)
		EncodeErrJSON(w, err)
		return
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		EncodeErrJSON(w, err)
		return
	}

	// Save to storage and report any errors
	if _, err = entity.Save(context, account.ID); err != nil {
		log.WithError(err).Warn(logmsg.EntitySaveError)
		EncodeErrJSON(w, err)
		return
	}
	EncodeErrJSON(w, nil)
}

// Logout will end the user session.
func Logout(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := jwt.CheckToken(r, account.ValidJwtToken, cf.TargetAudiences()...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		EncodeErrJSON(w, err)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		log.Warn(logmsg.AccountLocked)
		EncodeErrJSON(w, err)
		return
	}

	log.Info(logmsg.LoggedOut)
}

// SaveAttachment will store an attachment for the account.
func SaveAttachment(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	log.Debug("Not implemented: /me/attachment")
}

// GetAttachment will retrieve an attachment for the account.
func GetAttachment(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	log.Debug("Not implemented: /me/attachment/{id}")
}

// DeleteAttachment will removed an attachment for the account.
func DeleteAttachment(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	log.Debug("Not implemented: /me/attachment/{id}/delete")
}

func transmit(w http.ResponseWriter, r *http.Request, account *model.Account, context *db.DatabaseContext) error {
	log := logmsg.NewLoggerFromRequest(r)
	url := os.Getenv("WS_URL")
	if url == "" {
		log.Warn(logmsg.WebserviceMissingURL)
		return errors.New(logmsg.WebserviceMissingURL)
	}
	key := os.Getenv("WS_KEY")
	if key == "" {
		log.Warn(logmsg.WebserviceMissingKey)
		return errors.New(logmsg.WebserviceMissingKey)
	}

	// Generate an XML package and send to the external webservice.
	log.Info(logmsg.GeneratingPackage)
	xml := form.Package(context, account.ID, false)
	data, err := form.ApplicationData(context, account.ID, false)
	if err != nil {
		log.Warn(logmsg.WebserviceCannotGetApplicationData, err)
		return err
	}

	log.Info(logmsg.TransmissionStarted)
	client := webservice.NewClient(url, key)

	ir, err := newImportRequest(data, string(xml))
	if err != nil {
		log.Warn(err)
		return err
	}
	response, err := client.ImportRequest(ir)
	log.Info(logmsg.TransmissionStopped, err)

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
		log.Warn(logmsg.TransmissionStorageError)
		return err
	}
	log.Info(logmsg.TransmissionRecorded)
	if status != "Sent" {
		log.Warn(logmsg.TransmissionError)
		return errors.New(logmsg.TransmissionError)
	}
	return nil
}
func newImportRequest(application map[string]interface{}, xmlContent string) (*webservice.ImportRequest, error) {
	var ciAgencyUserPseudoSSN bool
	var agencyID int
	var agencyGroupID int

	ciAgencyIDEnv := os.Getenv("WS_CALLERINFO_AGENCY_ID")
	if ciAgencyIDEnv == "" {
		return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencyID)
	}
	ciAgencyUserSSNEnv := os.Getenv("WS_CALLERINFO_AGENCY_USER_SSN")
	if ciAgencyUserSSNEnv == "" {
		return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencySSN)
	}
	// Parse agency id
	agencyIDEnv := os.Getenv("WS_AGENCY_ID")
	if agencyIDEnv == "" {
		return nil, fmt.Errorf(logmsg.WebserviceMissingAgencyID)
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
		return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	b, err := strconv.ParseBool(ciAgencyUserPseudoSSNEnv)
	if err != nil {
		return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	ciAgencyUserPseudoSSN = b

	ci := webservice.NewCallerInfo(ciAgencyIDEnv, ciAgencyUserPseudoSSN, ciAgencyUserSSNEnv)
	return webservice.NewImportRequest(ci, agencyID, agencyGroupID, application, xmlContent)
}
