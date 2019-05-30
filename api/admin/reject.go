package admin

import (
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
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

	// TODO: port over PDF.RemovePdfs.
	// err = r.PDF.RemovePdfs(account)
	// if err != nil {
	// 	return errors.Wrap(err, "Reject failed to remove PDFs")
	// }

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

	return nil
}
