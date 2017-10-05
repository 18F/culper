package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/handlers"
	"github.com/gorilla/mux"
	// middleware "github.com/18F/e-QIP-prototype/api/middleware"
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
	// r := middleware.NewRouter().Inject(handlers.LoggerHandler)
	r := mux.NewRouter()
	r.HandleFunc("/", handlers.RootHandler)
	r.HandleFunc("/refresh", handlers.JwtTokenRefresh).Methods("POST")

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

	// Account specific actions
	a := r.PathPrefix("/me").Subrouter() //.Inject(handlers.JwtTokenValidatorHandler)
	a.HandleFunc("/validate", inject(handlers.Validate, handlers.JwtTokenValidatorHandler)).Methods("POST")
	a.HandleFunc("/save", inject(handlers.Save, handlers.JwtTokenValidatorHandler)).Methods("POST", "PUT")
	a.HandleFunc("/form", inject(handlers.AllSections, handlers.JwtTokenValidatorHandler)).Methods("GET")
	a.HandleFunc("/section", inject(handlers.Section, handlers.JwtTokenValidatorHandler)).Methods("GET")
	a.HandleFunc("/attachment", inject(handlers.SaveAttachment, handlers.JwtTokenValidatorHandler)).Methods("POST", "PUT")
	a.HandleFunc("/attachment/{id}", inject(handlers.GetAttachment, handlers.JwtTokenValidatorHandler))
	a.HandleFunc("/attachment/{id}/delete", inject(handlers.DeleteAttachment, handlers.JwtTokenValidatorHandler)).Methods("POST", "DELETE")

	log.Println("Starting API server")
	fmt.Println(http.ListenAndServe(cf.PublicAddress(), handlers.CORS(r)))
}

type Handler func(w http.ResponseWriter, r *http.Request) error

func inject(handler http.HandlerFunc, middleware ...Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		for _, shim := range middleware {
			if err := shim(w, r); err != nil {
				log.Println(err)
				return
			}
		}

		handler(w, r)
	}
}
