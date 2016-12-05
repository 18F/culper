package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/truetandem/e-QIP-prototype/api/handlers"
	middleware "github.com/truetandem/e-QIP-prototype/api/middleware"
)

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	return port
}

func main() {
	r := middleware.NewRouter().Inject(handlers.LoggerHandler)
	r.HandleFunc("/", handlers.RootHandler)

	s := r.PathPrefix("/").Subrouter()
	s.HandleFunc("/2fa/{account}", handlers.TwofactorHandler)
	s.HandleFunc("/2fa/{account}/verify", handlers.TwofactorVerifyHandler)
	s.HandleFunc("/2fa/{account}/email", handlers.TwofactorEmailHandler)

	o := r.PathPrefix("/auth").Subrouter()
	o.HandleFunc("/basic", handlers.BasicAuth).Methods("POST")
	o.HandleFunc("/{service}", handlers.AuthServiceHandler)
	o.HandleFunc("/{service}/callback", handlers.AuthCallbackHandler)

	// Validation
	v := r.PathPrefix("/validate").Subrouter()
	v.HandleFunc("/ssn/{ssn}", handlers.ValidateSSN)
	v.HandleFunc("/passport/{passport}", handlers.ValidatePassport)

	// Address Validation
	v.HandleFunc("/address/city/{city}", handlers.ValidateCity)
	v.HandleFunc("/address/zipcode/{zipcode}", handlers.ValidateZipcode)
	v.HandleFunc("/address/state/{state}", handlers.ValidateState)
	v.HandleFunc("/address", handlers.ValidateAddress).Methods("POST")

	log.Println("Starting API mock server")
	fmt.Println(http.ListenAndServe(":"+getPort(), handlers.CORS(r)))
}
