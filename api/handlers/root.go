package handlers

import (
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
	w.Write([]byte(`{}`))
}
