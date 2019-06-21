package admin

import (
	"fmt"
	"github.com/pkg/errors"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/pdf"
)

// Rejecter is used to reject/kickback an application
type Rejecter struct {
	db    api.DatabaseService
	store api.StorageService
	pdf   api.PdfService
}

// NewRejecter returns a configured Rejecter
func NewRejecter(db api.DatabaseService, store api.StorageService, pdf api.PdfService) Rejecter {
	return Rejecter{
		db,
		store,
		pdf,
	}
}

// Reject rejects the application for a given account
func (r Rejecter) Reject(account api.Account) error {
	err := account.Unlock(r.db)
	if err != nil {
		return errors.Wrap(err, "Reject failed to unlock account")
	}

	// Load the application, clear the nos, save the application.
	app, loadErr := r.store.LoadApplication(account.ID)
	if loadErr != nil {
		if loadErr == api.ErrApplicationDoesNotExist {
			return nil
		}
		return errors.Wrap(loadErr, "Unable to load application to reject it")
	}

	clearErr := app.ClearNoBranches()
	if clearErr != nil {
		return clearErr
	}

	saveErr := r.store.UpdateApplication(app)
	if saveErr != nil {
		return errors.Wrap(saveErr, "Unable to save application after rejecting it")
	}

	// load the pfds, remove the signature pdfs.
	attachmentsMetadata, listErr := r.store.ListAttachmentsMetadata(account.ID)
	if listErr != nil {
		return errors.Wrap(listErr, "Failed to load the current attachments in order to delete them")
	}

	// Get the list of PDF Types that correspond to the signed releases
	releaseTypeSet := make(map[string]bool)
	for _, release := range pdf.ReleasePDFs {
		releaseTypeSet[release.DocType] = true
	}

	var deletionErrors []error
	for _, attachment := range attachmentsMetadata {
		if _, ok := releaseTypeSet[attachment.DocType]; ok {
			delErr := r.store.DeleteAttachment(account.ID, attachment.ID)
			if delErr != nil {
				deletionErrors = append(deletionErrors, delErr)
			}
		}
	}

	if len(deletionErrors) != 0 {
		var errStrings []string
		for _, err := range deletionErrors {
			errStrings = append(errStrings, err.Error())
		}
		joinedErrs := strings.Join(errStrings, ", ")

		return errors.New(fmt.Sprintf("Got an error deleting %d documents: [%s]", len(deletionErrors), joinedErrs))
	}

	return nil
}
