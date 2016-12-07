package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/truetandem/e-QIP-prototype/api/cf"
	"github.com/truetandem/e-QIP-prototype/api/handlers"
	middleware "github.com/truetandem/e-QIP-prototype/api/middleware"
)

func main() {
	r := middleware.NewRouter().Inject(handlers.LoggerHandler)
	r.HandleFunc("/", handlers.RootHandler)

	s := r.PathPrefix("/2fa").Subrouter()
	s.HandleFunc("/{account}", handlers.TwofactorHandler)
	s.HandleFunc("/{account}/verify", handlers.TwofactorVerifyHandler)
	s.HandleFunc("/{account}/email", handlers.TwofactorEmailHandler)

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
	fmt.Println(http.ListenAndServe(cf.PublicAddress(), handlers.CORS(r)))
}
