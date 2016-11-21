package main

import (
	"fmt"
	"log"
	"net/http"

	middleware "github.com/truetandem/e-QIP-prototype/api/middleware"
)

var (
	// APIName ...
	APIName = "equip"

	// APIVersion ...
	APIVersion = "v1"
)

func main() {
	r := middleware.NewRouter().Inject(LoggerHandler)
	r.HandleFunc("/", rootHandler)
	r.HandleFunc("/2fa", twofactorHandler)
	r.HandleFunc("/2fa/verify", twofactorVerifyHandler)

	s := r.PathPrefix("/").Subrouter().Inject(SessionHandler)
	s.HandleFunc("/form", rootHandler)

	o := r.PathPrefix("/auth").Subrouter()
	o.HandleFunc("/{service}", authServiceHandler)
	o.HandleFunc("/{service}/callback", authCallbackHandler)

	log.Println("Starting API mock server")
	fmt.Println(http.ListenAndServe(":3000", r))
}
