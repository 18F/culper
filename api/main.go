package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/handlers"
	middleware "github.com/18F/e-QIP-prototype/api/middleware"
)

var (
	flagSkipMigration = flag.Bool("skip-migration", false, "skip any pending database migrations")
)

func main() {
	flag.Parse()
	if !*flagSkipMigration {
		if err := db.MigrateUp("db", "environment", ""); err != nil {
			log.Println("Failed to migrate database:", err)
		}
	}

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
	v.HandleFunc("/email", handlers.ValidateEmail)

	// Passport validation
	v.HandleFunc("/passport/number/{passport}", handlers.ValidatePassportNumber)
	v.HandleFunc("/passport/dates/{issued}/to/{expiration}", handlers.ValidatePassportDates)

	v.HandleFunc("/height", handlers.ValidateHeight)
	v.HandleFunc("/weight/{weight}", handlers.ValidateWeight)
	v.HandleFunc("/haircolor/{haircolor}", handlers.ValidateHairColor)
	v.HandleFunc("/eyecolor/{eyecolor}", handlers.ValidateEyeColor)
	v.HandleFunc("/sex/{sex}", handlers.ValidateSex)
	v.HandleFunc("/daterange", handlers.ValidateDateRange)

	// Address Validation
	v.HandleFunc("/address/city/{city}", handlers.ValidateCity)
	v.HandleFunc("/address/zipcode/{zipcode}", handlers.ValidateZipcode)
	v.HandleFunc("/address/state/{state}", handlers.ValidateState)
	v.HandleFunc("/address", handlers.ValidateAddress)

	// Applicant Validation
	v.HandleFunc("/applicant/name", handlers.ValidateApplicantName)
	v.HandleFunc("/applicant/birthplace", handlers.ValidateApplicantBirthplace)
	v.HandleFunc("/applicant/birthdate", handlers.ValidateApplicantBirthdate)

	log.Println("Starting API mock server")
	fmt.Println(http.ListenAndServe(cf.PublicAddress(), handlers.CORS(r)))
}
