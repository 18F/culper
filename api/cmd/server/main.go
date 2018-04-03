package main

import (
	"flag"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/postgresql"
	"github.com/gorilla/mux"
)

var (
	flagSkipMigration = flag.Bool("skip-migration", false, "skip any pending database migrations")
)

func main() {
	logger := &log.LogService{log: log.NewLogger()}
	settings := &env.Native{}
	database := &postgresql.DatabaseService{Log: logger, Env: settings}
	token := &jwt.TokenService{Env: settings}

	flag.Parse()
	if !*flagSkipMigration {
		migration := Migration{Env: settings}
		if err := migration.Up("db", "environment", ""); err != nil {
			logger.Warn(api.WarnFailedMigration, err, api.LogFields{})
		}
	}

	// Make sure the JWT are properly configured
	if err := token.ConfigureEnvironment(256); err != nil {
		logger.Warn(api.WarnFailedMigration, err, api.LogFields{})
	} else {
		logger.Info(api.WarnFailedMigration, api.LogFields{})
	}

	// Declare a new router with any middleware injected
	r := mux.NewRouter()
	r.HandleFunc("/", http.RootHandler{Env: settings})
	r.HandleFunc("/refresh", http.JwtTokenRefresh{Env: settings, Log: logger, Token: token, Database: database}).Methods("POST")

	// Two-factor authentication
	if !settings.True(api.DISABLE_2FA) {
		s := r.PathPrefix("/2fa").Subrouter()
		s.HandleFunc("/{account}", http.MFAGenerateHandler{Env: settings, Log: logger, Token: token, Database: database})
		s.HandleFunc("/{account}/verify", http.MFAVerifyHandler{Env: settings, Log: logger, Token: token, Database: database})

		if settings.True(api.ALLOW_2FA_RESET) {
			s.HandleFunc("/{account}/reset", http.MFAResetHandler{Env: settings, Log: logger, Token: token, Database: database})
		}
	}

	// Authentication schemes
	o := r.PathPrefix("/auth").Subrouter()
	if settings.True(api.BASIC_ENABLED) {
		o.HandleFunc("/basic", http.BasicAuthHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("POST")
	}
	if settings.True(api.SAML_ENABLE) {
		o.HandleFunc("/saml", http.SamlHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
		o.HandleFunc("/saml/callback", http.SamlCallbackHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("POST")
	}

	// Account specific actions
	a := r.PathPrefix("/me").Subrouter()
	a.HandleFunc("/logout", http.LogoutHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
	a.HandleFunc("/validate", http.ValidateHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
	a.HandleFunc("/save", http.SaveHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
	a.HandleFunc("/status", http.StatusHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
	a.HandleFunc("/form", http.FormHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
	a.HandleFunc("/form/hash", http.HashHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
	a.HandleFunc("/form/submit", http.SubmitHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")
	a.HandleFunc("/form/section", http.SectionHandler{Env: settings, Log: logger, Token: token, Database: database}).Methods("GET")

	// Inject middleware
	router := http.CORS(http.StandardLogging(r))

	// Get the public address
	// TODO: Replace public address
	address := ":" + settings.String(api.PORT)

	// Listen and serve
	server := http.Server{Env: settings, Log: logger}
	logger.Fatal(server.ListenAndServe(address, router), api.LogFields{})
}
