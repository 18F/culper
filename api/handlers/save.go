package handlers

import (
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
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

	// If the account is locked then we cannot proceed
	if account.Locked {
		log.Warn(logmsg.AccountLocked)
		EncodeErrJSON(w, err)
		return
	}

	url := os.Getenv("WS_URL")
	if url == "" {
		log.Warn(logmsg.WebserviceMissingURL)
		EncodeErrJSON(w, errors.New(logmsg.WebserviceMissingURL))
		return
	}
	key := os.Getenv("WS_KEY")
	if key == "" {
		log.Warn(logmsg.WebserviceMissingKey)
		EncodeErrJSON(w, errors.New(logmsg.WebserviceMissingKey))
		return
	}

	// Generate an XML package and send to the external webservice.
	log.Info(logmsg.GeneratingPackage)
	xml := form.Package(context, account.ID, false)
	xmlEncoded := base64.StdEncoding.EncodeToString([]byte(xml))

	log.Info(logmsg.TransmissionStarted)
	client := webservice.NewClient(url, key)
	response, err := client.ImportRequest(&webservice.ImportRequest{
		Base64Content: xmlEncoded,
	})
	log.Info(logmsg.TransmissionStopped)

	// Store transmission information
	status := "Sent"
	if err != nil {
		status = err.Error()
	}
	agencyKey, requestKey := response.Keys()
	transmission := &model.Transmission{
		AccountID:  account.ID,
		Raw:        response.Bytes(),
		AgencyKey:  agencyKey,
		RequestKey: requestKey,
		Status:     status,
		Created:    time.Now(),
		Modified:   time.Now(),
	}
	if err = transmission.Save(context); err != nil {
		log.Warn(logmsg.TransmissionStorageError)
		EncodeErrJSON(w, err)
		return
	}
	log.Info(logmsg.TransmissionRecorded)
	if status != "Sent" {
		log.Warn(logmsg.TransmissionError)
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
