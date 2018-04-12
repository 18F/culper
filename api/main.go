package main

import (
	"crypto/tls"
	"flag"
	"net/http"
	"os"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/handlers"
	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/gorilla/mux"
)

var (
	flagSkipMigration = flag.Bool("skip-migration", false, "skip any pending database migrations")
)

func main() {
	log := logmsg.NewLogger()

	flag.Parse()
	if !*flagSkipMigration {
		if err := db.MigrateUp("db", "environment", ""); err != nil {
			log.WithError(err).Warn(logmsg.WarnFailedMigration)
		}
	}

	// Make sure the JWT are properly configured
	if err := jwt.ConfigureEnvironment(256); err != nil {
		log.WithError(err).Warn(logmsg.WarnFailedMigration)
	} else {
		log.Info(logmsg.WarnFailedMigration)
	}

	// Declare a new router with any middleware injected
	r := mux.NewRouter()
	r.HandleFunc("/", handlers.RootHandler)
	r.HandleFunc("/refresh", handlers.JwtTokenRefresh).Methods("POST")

	// Two-factor authentication
	if !cf.TwofactorDisabled() {
		s := r.PathPrefix("/2fa").Subrouter()
		s.HandleFunc("/{account}", handlers.TwofactorHandler)
		s.HandleFunc("/{account}/verify", handlers.TwofactorVerifyHandler)

		if cf.TwofactorResettable() {
			s.HandleFunc("/{account}/reset", handlers.TwofactorResetHandler)
		}
	}

	// Authentication schemes
	o := r.PathPrefix("/auth").Subrouter()
	if cf.BasicEnabled() {
		o.HandleFunc("/basic", handlers.BasicAuth).Methods("POST")
	}

	if cf.SamlEnabled() {
		o.HandleFunc("/saml", handlers.SamlServiceHandler)
		o.HandleFunc("/saml/callback", handlers.SamlCallbackHandler)
	}

	// Account specific actions
	a := r.PathPrefix("/me").Subrouter()
	a.HandleFunc("/logout", inject(handlers.Logout, handlers.JwtTokenValidatorHandler)).Methods("GET")
	a.HandleFunc("/validate", inject(handlers.Validate, handlers.JwtTokenValidatorHandler)).Methods("POST")
	a.HandleFunc("/save", inject(handlers.Save, handlers.JwtTokenValidatorHandler)).Methods("POST", "PUT")
	a.HandleFunc("/status", inject(handlers.Status, handlers.JwtTokenValidatorHandler)).Methods("GET")
	a.HandleFunc("/form", inject(handlers.AllSections, handlers.JwtTokenValidatorHandler)).Methods("GET")
	a.HandleFunc("/form/hash", inject(handlers.Hash, handlers.JwtTokenValidatorHandler)).Methods("GET")
	a.HandleFunc("/form/submit", inject(handlers.Submit, handlers.JwtTokenValidatorHandler)).Methods("POST")
	a.HandleFunc("/section", inject(handlers.Section, handlers.JwtTokenValidatorHandler)).Methods("GET")
	a.HandleFunc("/attachment", inject(handlers.SaveAttachment, handlers.JwtTokenValidatorHandler)).Methods("POST", "PUT")
	a.HandleFunc("/attachment/{id}", inject(handlers.GetAttachment, handlers.JwtTokenValidatorHandler))
	a.HandleFunc("/attachment/{id}/delete", inject(handlers.DeleteAttachment, handlers.JwtTokenValidatorHandler)).Methods("POST", "DELETE")

	address := cf.PublicAddress()
	tlsCertificate := os.Getenv("TLS_CERT")
	tlsPrivateKey := os.Getenv("TLS_KEY")
	if tlsCertificate != "" && tlsPrivateKey != "" {
		cfg := &tls.Config{
			MinVersion: tls.VersionTLS12,
			CurvePreferences: []tls.CurveID{
				tls.CurveP521,
				tls.CurveP384,
				tls.CurveP256,
			},
			PreferServerCipherSuites: true,
			CipherSuites: []uint16{
				tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
				tls.TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,
				tls.TLS_RSA_WITH_AES_256_GCM_SHA384,
				tls.TLS_RSA_WITH_AES_256_CBC_SHA,
			},
		}

		srv := &http.Server{
			Addr:         address,
			Handler:      r,
			TLSConfig:    cfg,
			TLSNextProto: make(map[string]func(*http.Server, *tls.Conn, http.Handler), 0),
		}

		log.WithField("address", address).Info(logmsg.StartingServerTLS)
		log.Fatal(srv.ListenAndServeTLS(tlsCertificate, tlsPrivateKey))
	} else {
		log.WithField("address", address).Info(logmsg.StartingServer)
		log.Fatal(http.ListenAndServe(address, handlers.CORS(handlers.StandardLogging(r))))
	}
}

// Handler is a simple handler function.
type Handler func(w http.ResponseWriter, r *http.Request) error

// inject applies middleware to a handler.
func inject(handler http.HandlerFunc, middleware ...Handler) http.HandlerFunc {
	log := logmsg.NewLogger()
	return func(w http.ResponseWriter, r *http.Request) {
		for _, shim := range middleware {
			if err := shim(w, r); err != nil {
				log.WithError(err).Warn(logmsg.MiddlewareError)
				return
			}
		}

		handler(w, r)
	}
}
