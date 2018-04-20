package http

import (
	"os"
	"testing"

	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestAllowedOrigin(t *testing.T) {
	tests := []struct {
		env     string
		origin  string
		allowed bool
	}{
		{env: "", origin: "https://test.com:443", allowed: false},
		{env: "*", origin: "https://test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://sub.test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://tester.com:443", allowed: false},
		{env: "https://test.com", origin: "https://test.com:443", allowed: true},
		{env: "https://test.com:443", origin: "https://test.com:443", allowed: true},
	}

	for _, test := range tests {
		os.Setenv("CORS_ALLOWED", test.env)
		if allowedOrigin(test.origin, mock.Native{}) != test.allowed {
			suffix := ""
			if !test.allowed {
				suffix = "not "
			}
			t.Errorf("Expected origin (%s) to be %sallowed with environment (%s)", test.origin, suffix, test.env)
		}
	}
}
