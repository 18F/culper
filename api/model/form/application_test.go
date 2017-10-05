package form

import (
	"testing"

	"github.com/18F/e-QIP-prototype/api/db"
)

func TestApplication(t *testing.T) {
	account := 1
	context := db.NewDB()

	js := Application(context, account)
	if len(js) == 0 {
		t.Fatal("Failed to get application state")
	}
}

func TestSignature(t *testing.T) {
	account := 1
	context := db.NewDB()

	sig := Signature(context, account)
	if len(sig) == 0 {
		t.Fatal("Failed to get application signature")
	}
}
