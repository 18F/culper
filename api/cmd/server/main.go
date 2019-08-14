package main

import (
	"flag"
	gohttp "net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
	"github.com/18F/e-QIP-prototype/api/cloudfoundry"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/pdf"
	"github.com/18F/e-QIP-prototype/api/postgresql"
	"github.com/18F/e-QIP-prototype/api/saml"
	"github.com/18F/e-QIP-prototype/api/session"
	"github.com/18F/e-QIP-prototype/api/simplestore"
	"github.com/18F/e-QIP-prototype/api/usps"
	"github.com/18F/e-QIP-prototype/api/xml"
	"github.com/gorilla/mux"
)

var (
	flagSkipMigration = flag.Bool("skip-migration", false, "skip any pending database migrations")
)

func main() {
	cloudfoundry.Configure()
	logger := &log.Service{Log: log.NewLogger()}
	settings := env.Native{}
	settings.Configure()

	dbConf := postgresql.DBConfig{
		User:     settings.String(api.DatabaseUser),
		Password: settings.String(api.DatabasePassword),
		Address:  settings.String(api.DatabaseHost),
		DBName:   settings.String(api.DatabaseName),
	}

	database := postgresql.NewPostgresService(dbConf, logger)

	serializer := simplestore.NewJSONSerializer()
	store, storeErr := simplestore.NewSimpleStore(postgresql.PostgresConnectURI(dbConf), logger, serializer)
	if storeErr != nil {
		logger.WarnError("Error configuring Simple Store", storeErr, api.LogFields{})
		return
	}

	xmlTemplatePath := "./templates/"
	xmlsvc := xml.NewXMLService(xmlTemplatePath)
	pdfTemplatePath := "./pdf/templates/"
	pdfsvc := pdf.NewPDFService(pdfTemplatePath)
	submitter := admin.NewSubmitter(database, store, xmlsvc, pdfsvc)

	sessionTimeout := time.Duration(settings.Int(api.SessionTimeout)) * time.Minute
	sessionService := session.NewSessionService(sessionTimeout, store, logger)
	samlsvc := &saml.Service{Log: logger, Env: settings}

	secureCookie := !settings.True(api.DevUseInsecureCookie)
	cookieService := http.NewSessionCookieService(secureCookie)

	api.Geocode = usps.Geocoder{Log: logger, Env: settings}

	flag.Parse()
	if !*flagSkipMigration {
		ex, _ := os.Executable()
		migration := api.Migration{Env: settings}
		connStr := postgresql.PostgresConnectURI(dbConf)
		if err := migration.Up(connStr, filepath.Dir(ex), settings.String(api.GolangEnv), ""); err != nil {
			logger.WarnError(api.WarnFailedMigration, err, api.LogFields{})
		}
	}

	// Declare a new router with any middleware injected
	r := mux.NewRouter()
	r.HandleFunc("/", http.RootHandler{Env: settings}.ServeHTTP).Methods("GET")

	// Authentication schemes
	session := http.NewSessionMiddleware(logger, sessionService)

	// CSRF
	csrfSecret := settings.String(api.CSRFSecret)
	csrf, csrfErr := http.NewCSRFMiddleware(logger, []byte(csrfSecret), secureCookie)
	if csrfErr != nil {
		logger.WarnError("Error configuring CSRF", csrfErr, api.LogFields{})
		return
	}

	// everything that is secured is wrapped in CSRF and the Session middleware
	sec := func(handler gohttp.Handler) gohttp.Handler { return csrf.Middleware(session.Middleware(handler)) }

	o := r.PathPrefix("/auth").Subrouter()
	if settings.True(api.BasicEnabled) {
		o.HandleFunc("/basic", http.BasicAuthHandler{Env: settings, Log: logger, Database: database, Store: store, Cookie: cookieService, Session: sessionService}.ServeHTTP).Methods("POST")
	}
	if settings.True(api.SamlEnabled) {
		o.HandleFunc("/saml", http.SamlRequestHandler{Env: settings, Log: logger, Database: database, SAML: samlsvc}.ServeHTTP).Methods("GET")
		// SLO uses the logged in session
		o.Handle("/saml_slo", sec(http.SamlSLORequestHandler{Env: settings, Log: logger, Database: database, SAML: samlsvc, Session: sessionService})).Methods("GET")
		o.HandleFunc("/saml/callback", http.SamlResponseHandler{Env: settings, Log: logger, Database: database, SAML: samlsvc, Session: sessionService, Cookie: cookieService}.ServeHTTP).Methods("POST")
	}

	// Account specific actions
	r.Handle("/refresh", sec(http.RefreshHandler{Env: settings, Log: logger, Database: database})).Methods("POST")

	a := r.PathPrefix("/me").Subrouter()
	a.Handle("/logout", sec(http.LogoutHandler{Log: logger, Session: sessionService})).Methods("POST")
	a.Handle("/save", sec(http.SaveHandler{Env: settings, Log: logger, Database: database, Store: store})).Methods("POST", "PUT")
	a.Handle("/status", sec(http.StatusHandler{Env: settings, Log: logger, Database: database, Store: store})).Methods("GET")
	a.Handle("/validate", sec(http.ValidateHandler{Log: logger})).Methods("POST")
	a.Handle("/form", sec(http.FormHandler{Env: settings, Log: logger, Database: database, Store: store})).Methods("GET")
	a.Handle("/form/submit", sec(http.SubmitHandler{Env: settings, Log: logger, Database: database, Store: store, Submitter: submitter})).Methods("POST")
	a.Handle("/attachment", sec(http.AttachmentListHandler{Env: settings, Log: logger, Database: database, Store: store})).Methods("GET")
	a.Handle("/attachment/{id}", sec(http.AttachmentGetHandler{Env: settings, Log: logger, Database: database, Store: store})).Methods("GET")
	if settings.True(api.AttachmentsEnabled) {
		a.Handle("/attachment", sec(http.AttachmentSaveHandler{Env: settings, Log: logger, Database: database, Store: store})).Methods("POST", "PUT")
		a.Handle("/attachment/{id}/delete", sec(http.AttachmentDeleteHandler{Env: settings, Log: logger, Database: database, Store: store})).Methods("POST", "DELETE")
	}

	// Inject middleware
	caching := http.CacheHandler{Log: logger}
	cors := http.CORSHandler{Log: logger, Env: settings}
	logging := http.LoggingHandler{Log: logger}
	router := caching.Middleware(cors.Middleware(logging.Middleware(r)))

	// Get the public address
	address := ":" + settings.String(api.Port)

	// Listen and serve
	server := http.Server{Env: settings, Log: logger}
	logger.FatalError(api.StoppingServer, server.ListenAndServe(address, router), api.LogFields{})
}
