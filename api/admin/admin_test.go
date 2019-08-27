package admin

import (
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
	"github.com/18F/e-QIP-prototype/api/simplestore"
	"github.com/google/uuid"
)

func RejectCanKickbackFailure(t *testing.T) {
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
	rejector := admin.NewRejecter(services.db, services.store)
	err := rejector.Reject(&account)
}
