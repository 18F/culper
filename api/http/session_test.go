package http

import (
	"testing"
)

func TestURIParsing(t *testing.T) {

	// If you feed it garbage, you should get an error out
	_, invalidErr := NewSessionCookieService("httwe'''finwefo:::inwef/wefoisefsef")
	if invalidErr == nil {
		t.Fatal("Something's gotta get us an err")
	}

	validCookieTests := []struct {
		apiURL string
		secure bool
		domain string
	}{
		{"http://localhost:3000", false, ""},
		{"http://api:3000", false, ""},
		{"https://eapp.edu", true, "eapp.edu"},
	}

	for _, test := range validCookieTests {
		t.Run(test.apiURL, func(t *testing.T) {

			expectedCookieService := SessionCookieService{
				secure: test.secure,
				domain: test.domain,
			}

			cs, cookieErr := NewSessionCookieService(test.apiURL)
			if cookieErr != nil {
				t.Fatal(cookieErr)
			}

			if cs != expectedCookieService {
				t.Fatal("Didn't get the expected service back", cs, expectedCookieService)
			}
		})
	}
}
