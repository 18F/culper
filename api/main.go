package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	middleware "github.com/truetandem/e-QIP-prototype/api/middleware"
)

var (
	// APIName ...
	APIName = "equip"

	// APIVersion ...
	APIVersion = "v1"
)

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	return port
}

func main() {
	r := middleware.NewRouter().Inject(LoggerHandler)
	r.HandleFunc("/", rootHandler)

	s := r.PathPrefix("/").Subrouter()
	s.HandleFunc("/2fa/{account}", twofactorHandler)
	s.HandleFunc("/2fa/{account}/verify", twofactorVerifyHandler)
	s.HandleFunc("/2fa/{account}/email", twofactorEmailHandler)
	s.HandleFunc("/form", rootHandler)

	o := r.PathPrefix("/auth").Subrouter()
	o.HandleFunc("/basic", basicAuthHandler).Methods("POST")
	o.HandleFunc("/{service}", authServiceHandler)
	o.HandleFunc("/{service}/callback", authCallbackHandler)

	a := r.PathPrefix("/account").Subrouter().Inject(JwtTokenValidatorHandler)
	a.HandleFunc("/{id}", func(w http.ResponseWriter, r *http.Request) {
		EncodeJSON(w, "Testing JwtToken")
	}).Methods("GET")

	log.Println("Starting API mock server")
	fmt.Println(http.ListenAndServe(":"+getPort(), CORS(r)))
}
