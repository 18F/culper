package env

import (
	"os"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
)

func TestTwofactorDisabled(t *testing.T) {
	service := Native{}
	os.Setenv(api.Disable2FA, "1")

	// Test agains the environment variables
	if !service.True(api.Disable2FA) {
		t.Errorf("Expected twofactor authentication to be disabled")
	}

	// Test against defaults
	os.Setenv(api.Disable2FA, "")
	if service.True(api.Disable2FA) {
		t.Errorf("Expected twofactor authentication to be enabled")
	}
}

func TestTwofactorResettable(t *testing.T) {
	service := Native{}
	os.Setenv(api.Allow2FAReset, "1")

	// Test agains the environment variables
	if !service.True(api.Allow2FAReset) {
		t.Errorf("Expected twofactor authentication to allow reset")
	}

	// Test against defaults
	os.Setenv(api.Allow2FAReset, "")
	if service.True(api.Allow2FAReset) {
		t.Errorf("Expected twofactor authentication to disallow reset")
	}
}
