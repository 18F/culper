package admin

import (
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
	"github.com/18F/e-QIP-prototype/api/pdf"
	"github.com/18F/e-QIP-prototype/api/simplestore"
	"github.com/18F/e-QIP-prototype/api/xml"
	"github.com/google/uuid"
	"github.com/pkg/errors"
)

type errorAdminLoadStore struct {
	mock.StorageService
}

func (s *errorAdminLoadStore) LoadApplication(accountID int) (api.Application, error) {
	return api.Application{}, errors.New("load application error")
}

type errorAdminUpdateStore struct {
	mock.StorageService
}

func (s *errorAdminUpdateStore) UpdateApplication(app api.Application) error {
	return errors.New("update application error")
}

type errorAdminListAttachmentsMetadataStore struct {
	mock.StorageService
}

func (s *errorAdminListAttachmentsMetadataStore) ListAttachmentsMetadata(accountID int) ([]api.Attachment, error) {
	return []api.Attachment{}, errors.New("list attachment metadata error")
}

type errorAdminDeleteAttachmentStore struct {
	mock.StorageService
}

func (s *errorAdminDeleteAttachmentStore) DeleteAttachment(accountID int, attachmentID int) error {
	return errors.New("delete attachment error")
}

//
// REJECT tests
//

func TestRejectAccountCanKickbackFailure(t *testing.T) {
	var mockDB mock.DatabaseService
	var mockStore mock.StorageService

	email := "dogs@iloveyou.com"
	// Make an account with Status that isn't StatusSubmitted
	account := api.Account{
		Username:    email,
		Email:       simplestore.NonNullString(email),
		FormType:    "SF86",
		FormVersion: "2017-07",
		Status:      api.StatusIncomplete,
		ExternalID:  uuid.New().String(),
	}
	// Reject this submission
	rejector := NewRejecter(&mockDB, &mockStore)
	err := rejector.Reject(&account)
	if err == nil {
		t.Log("Should have received an error from Kickback, instead got nil. ")
		t.Fail()
	}
}

func TestRejectAccountLoadApplicationFailure(t *testing.T) {
	var mockDB mock.DatabaseService
	var mockStore errorAdminLoadStore

	email := "dogs@iloveyou.com"
	account := api.Account{
		Username:    email,
		Email:       simplestore.NonNullString(email),
		FormType:    "SF86",
		FormVersion: "2017-07",
		Status:      api.StatusSubmitted,
		ExternalID:  uuid.New().String(),
	}
	// Reject this submission
	rejector := NewRejecter(&mockDB, &mockStore)
	err := rejector.Reject(&account)
	if err == nil {
		t.Log("Should have received an error from LoadApplication, instead got nil. ")
		t.Fail()
	}
}

func TestRejectAccountUpdateApplicationFailure(t *testing.T) {
	var mockDB mock.DatabaseService
	var mockStore errorAdminUpdateStore

	email := "dogs@iloveyou.com"
	account := api.Account{
		Username:    email,
		Email:       simplestore.NonNullString(email),
		FormType:    "SF86",
		FormVersion: "2017-07",
		Status:      api.StatusSubmitted,
		ExternalID:  uuid.New().String(),
	}
	// Reject this submission
	rejector := NewRejecter(&mockDB, &mockStore)
	err := rejector.Reject(&account)
	if err == nil {
		t.Log("Should have received an error from UpdateApplication, instead got nil. ")
		t.Fail()
	}
}

func TestRejectAccountListAttachmentsMetadataFailure(t *testing.T) {
	var mockDB mock.DatabaseService
	var mockStore errorAdminListAttachmentsMetadataStore

	email := "dogs@iloveyou.com"
	account := api.Account{
		Username:    email,
		Email:       simplestore.NonNullString(email),
		FormType:    "SF86",
		FormVersion: "2017-07",
		Status:      api.StatusSubmitted,
		ExternalID:  uuid.New().String(),
	}
	// Reject this submission
	rejector := NewRejecter(&mockDB, &mockStore)
	err := rejector.Reject(&account)
	if err == nil {
		t.Log("Should have received an error from ListAttachmentsMetadata, instead got nil. ")
		t.Fail()
	}
}

func TestRejectDeleteAttachmentFailure(t *testing.T) {
	var mockDB mock.DatabaseService
	var mockStore errorAdminListAttachmentsMetadataStore

	email := "dogs@iloveyou.com"
	account := api.Account{
		Username:    email,
		Email:       simplestore.NonNullString(email),
		FormType:    "SF86",
		FormVersion: "2017-07",
		Status:      api.StatusSubmitted,
		ExternalID:  uuid.New().String(),
	}
	// Reject this submission
	rejector := NewRejecter(&mockDB, &mockStore)
	err := rejector.Reject(&account)
	if err == nil {
		t.Log("Should have received an error from DeleteAttachment, instead got nil. ")
		t.Fail()
	}
}

//
// SUBMIT tests
//

func TestSubmitLoadApplicationFailure(t *testing.T) {
	var mockDB mock.DatabaseService
	var mockStore errorAdminLoadStore

	email := "dogs@iloveyou.com"
	account := api.Account{
		Username:    email,
		Email:       simplestore.NonNullString(email),
		FormType:    "SF86",
		FormVersion: "2017-07",
		Status:      api.StatusSubmitted,
		ExternalID:  uuid.New().String(),
	}
	xmlService := xml.NewXMLService("../templates/")
	pdfService := pdf.NewPDFService("../pdf/templates/")

	// Submit this submission
	submitter := NewSubmitter(&mockDB, &mockStore, xmlService, pdfService)
	_, _, err := submitter.FilesForSubmission(account.ID)
	if err == nil {
		t.Log("Should have received an error from LoadApplication, instead got nil. ")
		t.Fail()
	}
}
