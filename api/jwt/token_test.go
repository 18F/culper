package jwt

import (
	"os"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
	jwt "github.com/dgrijalva/jwt-go"
)

func TestKnownSecret(t *testing.T) {
	service := TokenService{Env: mock.Native{}}
	old := service.Env.String(api.JWT_SECRET)

	expected := "too many secrets"
	JwtSecret = expected
	secret := service.Secret()
	if len(secret) == 0 || string(secret) != expected {
		t.Fatal("The secret did not properly use the known secret provided")
	}

	JwtSecret = old
	os.Setenv(api.JWT_SECRET, old)
}

func TestRandomSecret(t *testing.T) {
	service := TokenService{Env: mock.Native{}}
	old := service.Env.String(api.JWT_SECRET)

	expected := ""
	os.Setenv(api.JWT_SECRET, expected)
	service.ConfigureEnvironment(512)

	secret := service.Secret()
	if len(secret) == 0 || string(secret) == expected {
		t.Fatal("The secret should not be empty")
	}

	os.Setenv(api.JWT_SECRET, old)
}

// Store the last token from the 256 benchmark to not allow compiler optimizations.
var token256 string

// BenchmarkRandomSecret256 performs benchmark tests for using 256 bits of randomness with
// the signing method set to HS256.
func BenchmarkRandomSecret256(b *testing.B) {
	service := TokenService{Env: mock.Native{}}
	old := service.Env.String(api.JWT_SECRET)
	size := 256

	expected := ""
	os.Setenv(api.JWT_SECRET, expected)
	service.ConfigureEnvironment(size)

	var token string
	for n := 0; n < b.N; n++ {
		JwtSigningMethod = jwt.SigningMethodHS256
		token, _, _ = service.NewToken(0, "audience")
	}
	token256 = token

	os.Setenv(api.JWT_SECRET, old)
}

// Store the last token from the 512 benchmark to not allow compiler optimizations.
var token512 string

// BenchmarkRandomSecret512 performs benchmark tests for using 512 bits of randomness with
// the signing method set to HS512.
func BenchmarkRandomSecret512(b *testing.B) {
	service := TokenService{Env: mock.Native{}}
	old := service.Env.String(api.JWT_SECRET)
	size := 512

	expected := ""
	os.Setenv(api.JWT_SECRET, expected)
	service.ConfigureEnvironment(size)

	var token string
	for n := 0; n < b.N; n++ {
		JwtSigningMethod = jwt.SigningMethodHS512
		token, _, _ = service.NewToken(0, "audience")
	}
	token512 = token

	os.Setenv(api.JWT_SECRET, old)
}

func TestTimeout(t *testing.T) {
	service := TokenService{Env: mock.Native{}}
	old := service.Env.String(api.SESSION_TIMEOUT)

	// Test the default setting
	os.Setenv(api.SESSION_TIMEOUT, "")
	timeout := service.Timeout()
	fifteen := time.Duration(15) * time.Minute
	if timeout != fifteen {
		t.Fatalf("Default session timeout %v is not %v", timeout, fifteen)
	}

	// Test setting a custom time in minutes
	os.Setenv(api.SESSION_TIMEOUT, "2")
	timeout = service.Timeout()
	two := time.Duration(2) * time.Minute
	if timeout != two {
		t.Fatalf("Session timeout %v is not %v", timeout, two)
	}

	os.Setenv(api.SESSION_TIMEOUT, old)
}

func TestValidateToken(t *testing.T) {
	service := TokenService{Env: mock.Native{}}
	token, _, err := service.NewToken(1, api.BasicAuthAudience)
	if err != nil {
		t.Fatal(err)
	}

	valid, id, _ := service.validateToken(token, api.BasicAuthAudience)
	if !valid || id != 1 {
		t.Fatalf("Expected JWT Token to be valid")
	}

	valid, _, _ = service.validateToken("badtoken", api.BasicAuthAudience)
	if valid {
		t.Fatalf("Expected JWT Token to be invalid")
	}
}
