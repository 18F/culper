package main

import (
	"flag"
	"os"
	"path/filepath"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cloudfoundry"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/mfa"
	"github.com/18F/e-QIP-prototype/api/postgresql"
	"github.com/18F/e-QIP-prototype/api/saml"
	"github.com/18F/e-QIP-prototype/api/usps"
	"github.com/18F/e-QIP-prototype/api/xml"
	"github.com/gorilla/mux"
)

var (
	flagSkipMigration = flag.Bool("skip-migration", false, "skip any pending database migrations")
)

func main() {
	cloudfoundry.Configure()
	logger := log.LogService{Log: log.NewLogger()}
	settings := env.Native{}
	settings.Configure()
	database := &postgresql.DatabaseService{Log: logger, Env: settings}
	database.Configure()
	token := jwt.TokenService{Env: settings}
	xmlsvc := xml.XmlService{Log: logger}
	mfasvc := mfa.MFAService{Log: logger, Env: settings}
	samlsvc := &saml.SamlService{Log: logger, Env: settings}
	api.Geocode := usps.USPSGeocoder{Log: logger, Env: settings}

	flag.Parse()
	if !*flagSkipMigration {
		ex, _ := os.Executable()
		migration := api.Migration{Env: settings}
		if err := migration.Up(filepath.Dir(ex), settings.String(api.GOLANG_ENV), ""); err != nil {
			logger.WarnError(api.WarnFailedMigration, err, api.LogFields{})
		}
	}

	// Make sure the JWT are properly configured
	if err := token.ConfigureEnvironment(256); err != nil {
		logger.WarnError(api.JWTSecretNotSet, err, api.LogFields{})
	} else {
		logger.Info(api.JWTSecretSet, api.LogFields{})
	}

	// Declare a new router with any middleware injected
	r := mux.NewRouter()
	r.HandleFunc("/", http.RootHandler{Env: settings}.ServeHTTP).Methods("GET")
	r.HandleFunc("/refresh", http.RefreshHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("POST")

	// Two-factor authentication
	if !settings.True(api.DISABLE_2FA) {
		s := r.PathPrefix("/2fa").Subrouter()
		s.HandleFunc("/{account}", http.MFAGenerateHandler{Env: settings, Log: logger, Token: token, Database: database, MFA: mfasvc}.ServeHTTP).Methods("GET")
		s.HandleFunc("/{account}/verify", http.MFAVerifyHandler{Env: settings, Log: logger, Token: token, Database: database, MFA: mfasvc}.ServeHTTP).Methods("POST")

		if settings.True(api.ALLOW_2FA_RESET) {
			s.HandleFunc("/{account}/reset", http.MFAResetHandler{Env: settings, Log: logger, Token: token, Database: database, MFA: mfasvc}.ServeHTTP).Methods("GET")
		}
	}

	// Authentication schemes
	o := r.PathPrefix("/auth").Subrouter()
	if settings.True(api.BASIC_ENABLED) {
		o.HandleFunc("/basic", http.BasicAuthHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("POST")
	}
	if settings.True(api.SAML_ENABLED) {
		o.HandleFunc("/saml", http.SamlRequestHandler{Env: settings, Log: logger, Token: token, Database: database, SAML: samlsvc}.ServeHTTP).Methods("GET")
		o.HandleFunc("/saml/callback", http.SamlResponseHandler{Env: settings, Log: logger, Token: token, Database: database, SAML: samlsvc}.ServeHTTP).Methods("POST")
	}

	// Account specific actions
	a := r.PathPrefix("/me").Subrouter()
	a.HandleFunc("/logout", http.LogoutHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("GET")
	a.HandleFunc("/validate", http.ValidateHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("POST")
	a.HandleFunc("/save", http.SaveHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("POST", "PUT")
	a.HandleFunc("/status", http.StatusHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("GET")
	a.HandleFunc("/form", http.FormHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("GET")
	a.HandleFunc("/form/hash", http.HashHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("GET")
	a.HandleFunc("/form/submit", http.SubmitHandler{Env: settings, Log: logger, Token: token, Database: database, Xml: xmlsvc}.ServeHTTP).Methods("POST")
	a.HandleFunc("/form/section", http.SectionHandler{Env: settings, Log: logger, Token: token, Database: database}.ServeHTTP).Methods("GET")

	// Inject middleware
	router := http.CORS(http.StandardLogging(r, logger), logger, settings)

	// Get the public address
	address := settings.String(api.API_BASE_URL) + ":" + settings.String(api.PORT)

	// Listen and serve
	server := http.Server{Env: settings, Log: logger}
	logger.FatalError(api.StoppingServer, server.ListenAndServe(address, router), api.LogFields{})
}
