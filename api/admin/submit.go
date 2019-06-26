package admin

import (
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// Submitter is used to reject/kickback an application
type Submitter struct {
	db    api.DatabaseService
	store api.StorageService
	xml   api.XMLService
	pdf   api.PdfService
}

// NewSubmitter returns a configured Submitter
func NewSubmitter(db api.DatabaseService, store api.StorageService, xml api.XMLService, pdf api.PdfService) Submitter {
	return Submitter{
		db,
		store,
		xml,
		pdf,
	}
}

// FilesForSubmission returns the XML and any Attachments for submission.
func (s Submitter) FilesForSubmission(accountID int) ([]byte, []api.Attachment, error) {

	// Get the account information from the data store
	account := api.Account{ID: accountID}
	_, accountErr := account.Get(s.db, accountID)
	if accountErr != nil {
		return []byte{}, []api.Attachment{}, accountErr
	}

	application, appErr := s.store.LoadApplication(accountID)
	if appErr != nil {
		return []byte{}, []api.Attachment{}, errors.Wrap(appErr, "Can't load applicaiton")
	}

	// get XML from applicaiton
	xml, xmlErr := s.xml.PackageXML(application)
	if xmlErr != nil {
		return []byte{}, []api.Attachment{}, errors.Wrap(xmlErr, "Couldn't get XML from applicaiton")
	}

	// generate releases
	releases, releaseErr := s.pdf.GenerateReleases(account, application)
	if releaseErr != nil {
		return []byte{}, []api.Attachment{}, errors.Wrap(releaseErr, "Couldn't generate releases")
	}

	// save releases
	for _, release := range releases {
		saveErr := s.store.CreateAttachment(&release)
		if saveErr != nil {
			return []byte{}, []api.Attachment{}, errors.Wrap(saveErr, "Couldn't save generated releases")
		}

	}

	return []byte(xml), releases, nil
}
