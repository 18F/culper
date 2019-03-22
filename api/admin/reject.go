package admin

import (
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

type Rejector struct {
	DB  api.DatabaseService
	PDF api.PdfService
}

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
