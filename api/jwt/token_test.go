package jwt

import (
	"os"
	"testing"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

func TestKnownSecret(t *testing.T) {
	envar := "JWT_SECRET"
	old := os.Getenv(envar)

	expected := "too many secrets"
	os.Setenv(envar, expected)
	secret := Secret(512)
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
	secret := Secret(512)
	if len(secret) == 0 || string(secret) == expected {
		t.Fatal("The secret should not be empty")
	}

	os.Setenv(envar, old)
}

// Store the last token from the 256 benchmark to not allow compiler optimizations.
var token256 string

// BenchmarkRandomSecret256 performs benchmark tests for using 256 bits of randomness with
// the signing method set to HS256.
func BenchmarkRandomSecret256(b *testing.B) {
	envar := "JWT_SECRET"
	old := os.Getenv(envar)

	expected := ""
	os.Setenv(envar, expected)

	var token string
	size := 256
	for n := 0; n < b.N; n++ {
		JwtSecret = Secret(size)
		JwtSigningMethod = jwt.SigningMethodHS256
		token, _, _ = NewToken(0, "audience")
	}
	token256 = token

	os.Setenv(envar, old)
}

// Store the last token from the 512 benchmark to not allow compiler optimizations.
var token512 string

// BenchmarkRandomSecret512 performs benchmark tests for using 512 bits of randomness with
// the signing method set to HS512.
func BenchmarkRandomSecret512(b *testing.B) {
	envar := "JWT_SECRET"
	old := os.Getenv(envar)

	expected := ""
	os.Setenv(envar, expected)

	var token string
	size := 512
	for n := 0; n < b.N; n++ {
		JwtSecret = Secret(size)
		JwtSigningMethod = jwt.SigningMethodHS512
		token, _, _ = NewToken(0, "audience")
	}
	token512 = token

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
		t.Fatalf("Default session timeout %v is not %v", timeout, fifteen)
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
