package main

import (
	"fmt"
	"net/http"
)

var (
	// APIName ...
	APIName = "equip"

	// APIVersion ...
	APIVersion = "v1"
)

func main() {
	http.HandleFunc("/", handleRoot)
	fmt.Println(http.ListenAndServe(":3000", nil))
}

// handleRoot accepts GET requests to get all endpoints that the API
// supports.
func handleRoot(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("X-Eqip-Media-Type", fmt.Sprintf("%s.%s", APIName, APIVersion))
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("{}"))
}
