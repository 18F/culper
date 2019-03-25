package http

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/pdf"
)

// SubmitHandler is the handler for submitting the application.
type SubmitHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	XML      api.XMLService
	Pdf      api.PdfService
}

// ServeHTTP submits the application package to the external web service for further processing.
func (service SubmitHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// Get account ID
	id := AccountIDFromRequestContext(r)

	// Get the account information from the data store
	account := &api.Account{ID: id}
	if _, err := account.Get(service.Database, id); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		RespondWithStructuredError(w, api.NoAccount, http.StatusUnauthorized)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		RespondWithStructuredError(w, api.AccountLocked, http.StatusForbidden)
		return
	}

	if err := service.generatePdfs(account); err != nil {
		service.Log.WarnError(api.PdfError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PdfError, http.StatusInternalServerError)
		return
	}

	if err := service.transmit(w, r, account); err != nil {
		service.Log.WarnError(api.PdfError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PdfError, http.StatusConflict)
		return
	}

	// Lock the account
	if err := account.Lock(service.Database); err != nil {
		service.Log.WarnError(api.AccountUpdateError, err, api.LogFields{})
		RespondWithStructuredError(w, api.AccountUpdateError, http.StatusInternalServerError)
		return
	}

}

func (service SubmitHandler) generatePdfs(account *api.Account) error {
	application, err := api.ApplicationData(service.Database, account.ID, false)
	if err != nil {
		return err
	}

	hash, err := api.Hash(service.Database, account.ID)
	if err != nil {
		return err
	}

	for _, p := range pdf.DocumentTypes {
		signedOn, ok := service.Pdf.SignatureAvailable(application, p)
		if !ok {
			continue
		}

		dat, err := service.Pdf.CreatePdf(application, p, hash)
		if err != nil {
			return err
		}

		// Create the attachment and store any metadata
		attachment := &api.Attachment{
			AccountID: account.ID,
			Filename:  fmt.Sprintf("%s %s.pdf", p.Name, signedOn.Format("2006-01-02")),
			Size:      int64(len(dat)),
			Raw:       dat,
			DocType:   p.DocType,
		}
		if _, err := attachment.Save(service.Database, account.ID); err != nil {
			return err
		}

		service.Log.Info(api.AttachmentSaved, api.LogFields{"attachment": attachment.ID})
	}
	return nil
}

func (service SubmitHandler) transmit(w http.ResponseWriter, r *http.Request, account *api.Account) error {
	if !service.Env.True(api.WsEnabled) {
		service.Log.Info("Skipping webservice call", nil)
		return nil
	}

	// Generate an XML package and send to the external webservice.
	service.Log.Info(api.GeneratingPackage, api.LogFields{})
	xml, err := api.Package(service.Database, service.XML, account.ID, false)
	if err != nil {
		service.Log.WarnError(api.WebserviceCannotGenerateInboundXML, err, api.LogFields{})
		return err
	}

	data, err := api.ApplicationData(service.Database, account.ID, false)
	if err != nil {
		service.Log.WarnError(api.WebserviceCannotGetApplicationData, err, api.LogFields{})
		return err
	}

	service.Log.Info(api.TransmissionStarted, api.LogFields{})
	client, err := api.EqipClient(service.Env)
	if err != nil {
		service.Log.WarnError(api.WebserviceErrorCreatingImportRequest, err, api.LogFields{})
		return err
	}

	ir, err := api.EqipRequest(service.Env, data, string(xml))
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
