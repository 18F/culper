package env

import (
	"os"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
)

func TestTwofactorDisabled(t *testing.T) {
	service := Native{}
	os.Setenv(api.DISABLE_2FA, "1")

	// Test agains the environment variables
	if !service.True(api.DISABLE_2FA) {
		t.Errorf("Expected twofactor authentication to be disabled")
	}

	// Test against defaults
	os.Setenv(api.DISABLE_2FA, "")
	if service.True(api.DISABLE_2FA) {
		t.Errorf("Expected twofactor authentication to be enabled")
	}
}

func TestTwofactorResettable(t *testing.T) {
	service := Native{}
	os.Setenv(api.ALLOW_2FA_RESET, "1")

	// Test agains the environment variables
	if !service.True(api.ALLOW_2FA_RESET) {
		t.Errorf("Expected twofactor authentication to allow reset")
	}

	// Test against defaults
	os.Setenv(api.ALLOW_2FA_RESET, "")
	if service.True(api.ALLOW_2FA_RESET) {
		t.Errorf("Expected twofactor authentication to disallow reset")
	}
}
