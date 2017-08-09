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

	// Declare a new router with any middleware injected
	r := middleware.NewRouter().Inject(handlers.LoggerHandler)
	r.HandleFunc("/", handlers.RootHandler)

	// Two-factor authentication
	s := r.PathPrefix("/2fa").Subrouter()
	s.HandleFunc("/{account}", handlers.TwofactorHandler)
	s.HandleFunc("/{account}/verify", handlers.TwofactorVerifyHandler)
	s.HandleFunc("/{account}/email", handlers.TwofactorEmailHandler)
	s.HandleFunc("/{account}/reset", handlers.TwofactorResetHandler)

	// Authentication schemes
	o := r.PathPrefix("/auth").Subrouter()
	o.HandleFunc("/basic", handlers.BasicAuth).Methods("POST")
	o.HandleFunc("/{service}", handlers.AuthServiceHandler)
	o.HandleFunc("/{service}/callback", handlers.AuthCallbackHandler)

	// Validation
	v := r.PathPrefix("/validate").Subrouter().Inject(handlers.JwtTokenValidatorHandler)
	v.HandleFunc("/address", handlers.ValidateAddress)

	// Account specific actions
	a := r.PathPrefix("/{account}").Subrouter().Inject(handlers.JwtTokenValidatorHandler)
	a.HandleFunc("/save", handlers.Save).Methods("POST")
	a.HandleFunc("/attachment", handlers.SaveAttachment).Methods("POST")
	a.HandleFunc("/attachment/{id}", handlers.GetAttachment)
	a.HandleFunc("/attachment/{id}/delete", handlers.DeleteAttachment).Methods("POST")

	log.Println("Starting API server")
	fmt.Println(http.ListenAndServe(cf.PublicAddress(), handlers.CORS(r)))
}
