package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var (
	// APIName ...
	APIName = "eqip"

	// APIVersion ...
	APIVersion = "v1"
)

// rootHandler accepts GET requests to get all endpoints that the API
// supports.
func RootHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("X-Eqip-Media-Type", fmt.Sprintf("%s.%s", APIName, APIVersion))
	w.Header().Set("Content-Type", "application/json")

	// TODO: Update the structure to include HTTP verbs
	json.NewEncoder(w).Encode(struct {
		Endpoints map[string]string `json:"endpoints"`
	}{
		Endpoints: map[string]string{
			"root":                                     "/",
			"web token refresh":                        "/refresh",
			"two factor authentication":                "/2fa",
			"two factor authentication for an account": "/2fa/{account}",
			"verification":                             "/2fa/{account}/verify",
			"email":                                    "/2fa/{account}/email",
			"reset":                                    "/2fa/{account}/reset",
			"authentication":                           "/auth",
			"basic authentication":                     "/auth/basic",
			"oauth entrypoint":                         "/auth/{service}",
			"oauth callback":                           "/auth/{service}/callback",
			"me":                                       "/me",
			"validation":                               "/me/validate",
			"save":                                     "/save",
			"store attachment":                         "/attachment",
			"get attachment":                           "/attachment/{id}",
			"delete attachment":                        "/attachment/{id}/delete",
		},
	})
}
