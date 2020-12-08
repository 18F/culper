package admin

import (
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// Submitter is used to reject/kickback an application
type Submitter struct {
	store api.StorageService
	xml   api.XMLService
	pdf   api.PdfService
}

// NewSubmitter returns a configured Submitter
func NewSubmitter(store api.StorageService, xml api.XMLService, pdf api.PdfService) Submitter {
	return Submitter{
		store,
		xml,
		pdf,
	}
}

// FilesForSubmission returns the XML and any Attachments for submission.
func (s Submitter) FilesForSubmission(account api.Account) ([]byte, []api.Attachment, error) {

	application, appErr := s.store.LoadApplication(account.ID)
	if appErr != nil {
		return []byte{}, []api.Attachment{}, errors.Wrap(appErr, "Can't load application")
	}

	// get XML from application
	xml, xmlErr := s.xml.PackageXML(application)
	if xmlErr != nil {
		return []byte{}, []api.Attachment{}, errors.Wrap(xmlErr, "Couldn't get XML from application")
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
