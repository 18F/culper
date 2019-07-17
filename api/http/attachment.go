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
	Store    api.StorageService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentListHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentsNotImplemented, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentsNotImplemented, http.StatusInternalServerError)
		return
	}

	// Get the account information
	account := AccountFromRequestContext(r)

	// Proceed even if the account is locked, as files are presented
	// after application submission, on the Print page.

	attachments, listErr := service.Store.ListAttachmentsMetadata(account.ID)
	if listErr != nil {
		service.Log.WarnError(api.AttachmentNotFound, listErr, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentNotFound, http.StatusInternalServerError)
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
	Store    api.StorageService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentSaveHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentsNotImplemented, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentsNotImplemented, http.StatusInternalServerError)
		return
	}

	// Get account information
	account := AccountFromRequestContext(r)

	// If the account is submitted then we cannot proceed
	if account.Status == api.StatusSubmitted {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		RespondWithStructuredError(w, api.AccountLocked, http.StatusForbidden)
		return
	}

	// Retrieve the file and metadata from the multipart form data.
	file, header, err := r.FormFile("file")
	if err != nil {
		service.Log.WarnError(api.AttachmentNoFile, err, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentNoFile, http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Copy the buffer so we can safely write it to storage.
	var buffer bytes.Buffer
	if _, err := io.Copy(&buffer, file); err != nil {
		service.Log.WarnError(api.AttachmentCopyBufferError, err, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentCopyBufferError, http.StatusInternalServerError)
		return
	}

	// Check size contraints
	maximumSize := service.Env.Int(api.FileMaximumSize)
	bufferSize := buffer.Len()
	headerSize := int(header.Size)
	if headerSize != bufferSize {
		service.Log.Warn(api.AttachmentSizeMismatch, api.LogFields{"header": headerSize, "buffer": bufferSize})
		RespondWithStructuredError(w, api.AttachmentSizeMismatch, http.StatusInternalServerError)
		return
	}
	if headerSize > maximumSize {
		service.Log.Warn(api.AttachmentSizeExceeded, api.LogFields{"size": headerSize})
		RespondWithStructuredError(w, api.AttachmentSizeExceeded, http.StatusInternalServerError)
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
		RespondWithStructuredError(w, api.AttachmentTypeNotAllowed, http.StatusInternalServerError)
		return
	}

	// Create the attachment and store any metadata
	attachment := &api.Attachment{
		AccountID: account.ID,
		Filename:  header.Filename,
		Size:      header.Size,
		Raw:       buffer.Bytes(),
	}

	createErr := service.Store.CreateAttachment(attachment)
	if createErr != nil {
		service.Log.WarnError(api.AttachmentNotSaved, err, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentNotSaved, http.StatusInternalServerError)
		return
	}

	buffer.Reset()
	service.Log.Info(api.AttachmentSaved, api.LogFields{"attachment": attachment.ID})
	fmt.Fprint(w, attachment.ID)
}

// AttachmentGetHandler is the handler for getting attachments.
type AttachmentGetHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	Store    api.StorageService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentGetHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentsNotImplemented, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentsNotImplemented, http.StatusInternalServerError)
		return
	}

	// Get account information
	account := AccountFromRequestContext(r)

	// Proceed even if the account is locked, as files are presented
	// after application submission, on the Print page.

	// Get the attachment by identifier.
	vars := mux.Vars(r)
	attachmentID, err := strconv.Atoi(vars["id"])
	if err != nil {
		service.Log.WarnError(api.AttachmentNoID, err, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentNoID, http.StatusBadRequest)
		return
	}

	//LoadAttachment wants the AccountID then the AttachmentID
	attachment, loadErr := service.Store.LoadAttachment(account.ID, attachmentID)
	if loadErr != nil {
		service.Log.WarnError(api.AttachmentNotFound, err, api.LogFields{"attachment": attachmentID})
		RespondWithStructuredError(w, api.AttachmentNotFound, http.StatusNotFound)
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
	Store    api.StorageService
}

// ServeHTTP serves the HTTP response.
func (service AttachmentDeleteHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.AttachmentsEnabled) {
		service.Log.Warn(api.AttachmentsNotImplemented, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentsNotImplemented, http.StatusInternalServerError)
		return
	}

	// Get account information
	account := AccountFromRequestContext(r)

	// If the account is locked then we cannot proceed
	if account.Status == api.StatusSubmitted {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		RespondWithStructuredError(w, api.AccountLocked, http.StatusForbidden)
		return
	}

	// Get the attachment by identifier.
	vars := mux.Vars(r)
	attachmentID, err := strconv.Atoi(vars["id"])
	if err != nil {
		service.Log.WarnError(api.AttachmentNoID, err, api.LogFields{})
		RespondWithStructuredError(w, api.AttachmentNoID, http.StatusBadRequest)
		return
	}

	delErr := service.Store.DeleteAttachment(account.ID, attachmentID)
	if delErr != nil {
		if delErr == api.ErrAttachmentDoesNotExist {
			service.Log.Warn(api.AttachmentNotFound, api.LogFields{"attachment": attachmentID})
			RespondWithStructuredError(w, api.AttachmentNotFound, http.StatusNotFound)
			return
		}

		service.Log.WarnError(api.AttachmentNotDeleted, err, api.LogFields{"attachment": attachmentID})
		RespondWithStructuredError(w, api.AttachmentNotDeleted, http.StatusInternalServerError)
		return
	}

	service.Log.Info(api.AttachmentDeleted, api.LogFields{"attachment": attachmentID})
}
