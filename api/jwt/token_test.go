package jwt

import (
	"os"
	"testing"
	"time"
)

func TestKnownSecret(t *testing.T) {
	envar := "JWT_SECRET"
	old := os.Getenv(envar)

	expected := "too many secrets"
	os.Setenv(envar, expected)
	secret := Secret()
	if len(secret) == 0 || string(secret) != expected {
		t.Fatal("The secret did not properly use the known secret provided")
	}

	os.Setenv(envar, old)
}

func TestRandomSecret(t *testing.T) {
	envar := "JWT_SECRET"
	old := os.Getenv(envar)

	expected := ""
	os.Setenv(envar, expected)
	secret := Secret()
	if len(secret) == 0 || string(secret) == expected {
		t.Fatal("The secret should not be empty")
	}

	os.Setenv(envar, old)
}

func TestTimeout(t *testing.T) {
	envar := "SESSION_TIMEOUT"
	old := os.Getenv(envar)

	// Test the default setting
	os.Setenv(envar, "")
	timeout := Timeout()
	fifteen := time.Duration(15) * time.Minute
	if timeout != fifteen {
		t.Fatal("Default session timeout %v is not %v", timeout, fifteen)
	}

	// Test setting a custom time in minutes
	os.Setenv(envar, "2")
	timeout = Timeout()
	two := time.Duration(2) * time.Minute
	if timeout != two {
		t.Fatalf("Session timeout %v is not %v", timeout, two)
	}

	os.Setenv(envar, old)
}
