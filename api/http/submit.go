package http

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/eqip"
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

	if err := service.generatePdfs(account); err != nil {
		service.Log.WarnError(api.PdfError, err, api.LogFields{})
		EncodeErrJSON(w, errors.New(api.PdfError))
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

func (service SubmitHandler) generatePdfs(account *api.Account) error {
	application, err := api.ApplicationData(service.Database, account.ID, false)
	if err != nil {
		return err
	}

	hash := api.Hash(service.Database, account.ID)

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
	url := service.Env.String(api.WsURL)
	if url == "" {
		service.Log.Warn(api.WebserviceMissingURL, api.LogFields{})
		return errors.New(api.WebserviceMissingURL)
	}
	key := service.Env.String(api.WsKey)
	if key == "" {
		service.Log.Warn(api.WebserviceMissingKey, api.LogFields{})
		return errors.New(api.WebserviceMissingKey)
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

	ciAgencyIDEnv := service.Env.String(api.WsCallerinfoAgencyID)
	if ciAgencyIDEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyID)
	}
	ciAgencyUserSSNEnv := service.Env.String(api.WsCallerinfoAgencyUserSSN)
	if ciAgencyUserSSNEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencySSN)
	}
	// Parse agency id
	agencyIDEnv := service.Env.String(api.WsAgencyID)
	if agencyIDEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingAgencyID)
	}
	i, err := strconv.Atoi(agencyIDEnv)
	if err != nil {
		return nil, err
	}
	agencyID = i

	// Parse agency group id if necessary
	agencyGroupIDEnv := service.Env.String(api.WsAgencyGroupID)
	if agencyGroupIDEnv != "" {
		i, err := strconv.Atoi(agencyGroupIDEnv)
		if err != nil {
			return nil, err
		}
		agencyGroupID = i
	}

	ciAgencyUserPseudoSSNEnv := service.Env.String(api.WsCallerinfoAgencyUserPseudossn)
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
