package http

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/gorilla/mux"
)

// AttachmentListHandler is the handler for listing attachments.
type AttachmentListHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentListHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentDenied, api.LogFields{})
		http.Error(w, "Attachments is not implemented", http.StatusInternalServerError)
		return
	}

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var attachments []api.Attachment
	if err := service.Database.Where(&attachments, "account_id = ?", account.ID); err != nil {
		service.Log.Warn(api.AttachmentNotFound, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	EncodeJSON(w, attachments)
}

// AttachmentSaveHandler is the handler for saving attachments.
type AttachmentSaveHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentSaveHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentDenied, api.LogFields{})
		http.Error(w, "Attachments is not implemented", http.StatusInternalServerError)
		return
	}

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Retrieve the file and metadata from the multipart form data.
	r.ParseMultipartForm(32 << 20)
	file, header, err := r.FormFile("file")
	if err != nil {
		service.Log.WarnError(api.AttachmentNoFile, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Copy the buffer so we can safely write it to storage.
	var buffer bytes.Buffer
	if _, err := io.Copy(&buffer, file); err != nil {
		service.Log.WarnError(api.AttachmentCopyBufferError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Check size contraints
	maximumSize := service.Env.Int(api.FileMaximumSize)
	bufferSize := buffer.Len()
	headerSize := int(header.Size)
	if headerSize != bufferSize {
		service.Log.Warn(api.AttachmentSizeMismatch, api.LogFields{"header": headerSize, "buffer": bufferSize})
		http.Error(w, api.AttachmentSizeMismatch, http.StatusInternalServerError)
		return
	}
	if headerSize > maximumSize {
		service.Log.Warn(api.AttachmentSizeExceeded, api.LogFields{"size": headerSize})
		http.Error(w, api.AttachmentSizeExceeded, http.StatusInternalServerError)
		return
	}

	// Check file type constraints
	allowedTypes := strings.Split(service.Env.String(api.FileTypes), ";")
	extension := filepath.Ext(header.Filename)
	allowed := false
	for _, ext := range allowedTypes {
		if strings.EqualFold(ext, extension) {
			allowed = true
			break
		}
	}
	if !allowed {
		service.Log.Warn(api.AttachmentTypeNotAllowed, api.LogFields{"extension": extension})
		http.Error(w, api.AttachmentTypeNotAllowed, http.StatusInternalServerError)
		return
	}

	// Create the attachment and store any metadata
	attachment := &api.Attachment{
		AccountID: account.ID,
		Filename:  header.Filename,
		Size:      header.Size,
		Raw:       buffer.Bytes(),
	}
	if _, err := attachment.Save(service.Database, id); err != nil {
		service.Log.WarnError(api.AttachmentNotSaved, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	buffer.Reset()
	service.Log.Info(api.AttachmentSaved, api.LogFields{"attachment": attachment.ID})
	fmt.Fprint(w, attachment.ID)
}

// AttachmentUpdateHandler is the handler for updating attachments.
type AttachmentUpdateHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentUpdateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentDenied, api.LogFields{})
		http.Error(w, "Attachments is not implemented", http.StatusInternalServerError)
		return
	}

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the attachment by identifier.
	vars := mux.Vars(r)
	attachmentID, err := strconv.Atoi(vars["id"])
	if err != nil {
		service.Log.WarnError(api.AttachmentNoID, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	attachment := &api.Attachment{ID: attachmentID}
	if _, err := attachment.Get(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.AttachmentNotFound, err, api.LogFields{"attachment": attachmentID})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the body of additional settings to update.
	var body struct {
		Description string `json:"description"`
	}
	if err := DecodeJSON(r.Body, &body); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Apply the settings and save it back to storage.
	attachment.Description = body.Description
	if _, err := attachment.Save(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.AttachmentNotSaved, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	service.Log.Info(api.AttachmentSaved, api.LogFields{"attachment": attachment.ID})
	fmt.Fprint(w, attachment.ID)
}

// AttachmentGetHandler is the handler for getting attachments.
type AttachmentGetHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentGetHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentDenied, api.LogFields{})
		http.Error(w, "Attachments is not implemented", http.StatusInternalServerError)
		return
	}

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the attachment by identifier.
	vars := mux.Vars(r)
	attachmentID, err := strconv.Atoi(vars["id"])
	if err != nil {
		service.Log.WarnError(api.AttachmentNoID, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	attachment := &api.Attachment{ID: attachmentID}
	if _, err := attachment.Get(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.AttachmentNotFound, err, api.LogFields{"attachment": attachmentID})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	service.Log.Info(api.AttachmentDownloaded, api.LogFields{"attachment": attachmentID})
	fmt.Fprint(w, base64.StdEncoding.EncodeToString(attachment.Raw))
}

// AttachmentDeleteHandler is the handler for deleting attachments.
type AttachmentDeleteHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentDeleteHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentDenied, api.LogFields{})
		http.Error(w, "Attachments is not implemented", http.StatusInternalServerError)
		return
	}

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the attachment by identifier.
	vars := mux.Vars(r)
	attachmentID, err := strconv.Atoi(vars["id"])
	if err != nil {
		service.Log.WarnError(api.AttachmentNoID, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	attachment := &api.Attachment{ID: attachmentID}
	if _, err := attachment.Delete(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.AttachmentDeleted, err, api.LogFields{"attachment": attachmentID})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	service.Log.Info(api.AttachmentDeleted, api.LogFields{"attachment": attachmentID})
}
