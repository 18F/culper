package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/cf"
)

var (
	// APIName ...
	APIName = "eqip"

	// APIVersion ...
	APIVersion = "v1"
)

type endpoint struct {
	Path        string
	Description string
	Verbs       []string
}

// rootHandler accepts GET requests to get all endpoints that the API
// supports.
func RootHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("X-Eqip-Media-Type", fmt.Sprintf("%s.%s", APIName, APIVersion))
	w.Header().Set("Content-Type", "application/json")

	// Core set of endpoints
	endpoints := []endpoint{
		endpoint{
			Path:        "/",
			Description: "root",
			Verbs:       []string{"GET"},
		},
		endpoint{
			Path:        "/refresh",
			Description: "web token refresh",
			Verbs:       []string{"POST"},
		},
		endpoint{
			Path:        "/me",
			Description: "me",
			Verbs:       []string{"GET"},
		},
		endpoint{
			Path:        "/me/logout",
			Description: "end session for account",
			Verbs:       []string{"GET"},
		},
		endpoint{
			Path:        "/me/validate",
			Description: "validation",
			Verbs:       []string{"POST"},
		},
		endpoint{
			Path:        "/me/save",
			Description: "save",
			Verbs:       []string{"POST", "PUT"},
		},
		endpoint{
			Path:        "/me/form",
			Description: "returns the form in its entirety",
			Verbs:       []string{"GET"},
		},
		endpoint{
			Path:        "/me/form/hash",
			Description: "returns the form hash code",
			Verbs:       []string{"GET"},
		},
		endpoint{
			Path:        "/me/section?:id",
			Description: "returns the form section",
			Verbs:       []string{"GET"},
		},
		endpoint{
			Path:        "/me/attachment",
			Description: "store attachment",
			Verbs:       []string{"POST", "PUT"},
		},
		endpoint{
			Path:        "/me/attachment/:id",
			Description: "get attachment",
			Verbs:       []string{"GET"},
		},
		endpoint{
			Path:        "/me/attachment/:id/delete",
			Description: "delete attachment",
			Verbs:       []string{"POST", "DELETE"},
		},
	}

	if !cf.TwofactorDisabled() {
		mfa := []endpoint{
			endpoint{
				Path:        "/2fa",
				Description: "two factor authentication",
				Verbs:       []string{"GET"},
			},
			endpoint{
				Path:        "/2fa/:account",
				Description: "two factor authentication for an account",
				Verbs:       []string{"GET"},
			},
			endpoint{
				Path:        "/2fa/:account/verify",
				Description: "two factor verification",
				Verbs:       []string{"POST"},
			},
		}
		endpoints = append(endpoints, mfa...)

		if cf.TwofactorResettable() {
			endpoints = append(endpoints, endpoint{
				Path:        "/2fa/:account/reset",
				Description: "two factor reset",
				Verbs:       []string{"GET"},
			})
		}
	}

	if cf.BasicEnabled() {
		basic := []endpoint{
			endpoint{
				Path:        "/auth/basic",
				Description: "basic authentication",
				Verbs:       []string{"POST"},
			},
		}
		endpoints = append(endpoints, basic...)
	}

	if cf.SamlEnabled() {
		saml := []endpoint{
			endpoint{
				Path:        "/auth/saml",
				Description: "SAML entrypoint",
				Verbs:       []string{"GET"},
			},
			endpoint{
				Path:        "/auth/saml/callback",
				Description: "SAML callback",
				Verbs:       []string{"GET", "POST"},
			},
		}
		endpoints = append(endpoints, saml...)
	}

	json.NewEncoder(w).Encode(struct {
		Endpoints []endpoint `json:"endpoints"`
	}{
		Endpoints: endpoints,
	})
}
