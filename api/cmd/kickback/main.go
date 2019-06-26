package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	logger := &log.Service{Log: log.NewLogger()}
	cmd.Command(logger, func(context api.DatabaseService, store api.StorageService, account *api.Account) {
		rejector := admin.NewRejecter(context, store)

		rejectErr := rejector.Reject(*account)
		if rejectErr != nil {
			logger.WarnError("Failed to kickback", rejectErr, api.LogFields{"account": account.Username})
		} else {
			logger.Warn("Account kicked back", api.LogFields{"account": account.Username})
		}
	})
}
