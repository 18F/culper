package admin

import (
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// Rejector is used to reject/kickback an application
type Rejector struct {
	DB  api.DatabaseService
	PDF api.PdfService
}

// Reject rejects the application for a given account
func (r Rejector) Reject(account api.Account) error {
	err := account.Unlock(r.DB)
	if err != nil {
		return errors.Wrap(err, "Reject failed to unlock account")
	}

	// TODO: port over PDF.RemovePdfs.
	// err = r.PDF.RemovePdfs(account)
	// if err != nil {
	// 	return errors.Wrap(err, "Reject failed to remove PDFs")
	// }

	err = account.ClearNoBranches(r.DB)
	if err != nil {
		return errors.Wrap(err, "Reject failed to clear the no branches")
	}

	return nil
}
