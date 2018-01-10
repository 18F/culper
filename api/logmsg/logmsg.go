package logmsg

import (
	"log/syslog"
	"net/http"
	"net/url"
	"os"
	"path"
	"strings"

	"github.com/18F/e-QIP-prototype/api/jwt"

	"github.com/rifflock/lfshook"
	"github.com/sirupsen/logrus"
	logrus_syslog "github.com/sirupsen/logrus/hooks/syslog"
)

func NewLogger() *logrus.Logger {
	log := logrus.New()

	// Set log level
	level, err := logrus.ParseLevel(os.Getenv("LOG_LEVEL"))
	if err == nil {
		log.SetLevel(level)
	}

	// Apply environment specific hooks
	hookLocalFile(log)
	hookLocalDirectory(log)
	hookSyslog(log)

	// Return the logger with dynamic hooks
	return log
}

func NewLoggerFromRequest(r *http.Request) *logrus.Entry {
	log := NewLogger()

	id := ""
	token, err := jwt.ParseWithClaims(jwt.ExtractToken(r))
	if err == nil && token.Valid {
		id = jwt.TokenClaims(token).Id
	}

	ip := r.RemoteAddr
	proxies := r.Header.Get(http.CanonicalHeaderKey("x-forwarded-for"))
	if proxies != "" {
		for _, proxy := range strings.Split(proxies, ", ") {
			ip = proxy
		}
	}

	// Return request specific settings
	contextLogger := log.WithFields(logrus.Fields{
		"ip":      ip,
		"account": id,
	})
	return contextLogger
}

// Support for logging to an append only log file.
func hookLocalFile(log *logrus.Logger) {
	logFile := os.Getenv("LOG_FILE")
	if logFile == "" {
		return
	}

	hook := lfshook.NewHook(lfshook.PathMap{
		logrus.InfoLevel:  logFile,
		logrus.WarnLevel:  logFile,
		logrus.ErrorLevel: logFile,
	}, nil)
	log.AddHook(hook)
}

// Support for logging to multiple files within a given directory.
func hookLocalDirectory(log *logrus.Logger) {
	logDir := os.Getenv("LOG_DIRECTORY")
	if logDir == "" {
		return
	}

	hook := lfshook.NewHook(lfshook.PathMap{
		logrus.InfoLevel:  path.Join(logDir, "info.log"),
		logrus.WarnLevel:  path.Join(logDir, "warning.log"),
		logrus.ErrorLevel: path.Join(logDir, "error.log"),
	}, nil)
	log.AddHook(hook)
}

// Support for logging to a syslog server.
func hookSyslog(log *logrus.Logger) {
	connectionString := os.Getenv("LOG_SYSLOG")
	if connectionString == "" {
		return
	}

	protocol := ""
	host := ""
	uri, err := url.Parse(connectionString)
	if err == nil {
		protocol = uri.Scheme
		host = uri.Host
	}

	connectionCert := os.Getenv("LOG_SYSLOG_CERT")
	if connectionCert == "" {
		hook, err := logrus_syslog.NewSyslogHook(protocol, host, syslog.LOG_INFO, "")
		if err == nil {
			log.AddHook(hook)
		}
	} else {
		// Currently this is not implemented due to a dependency conflict. The Go standard
		// library implementation of syslog does not implement TLS.
		//
		// To use the folling we require these libraries to be imported:
		//
		//   syslog "github.com/RackSec/srslog"
		//   logrus_syslog "github.com/shinji62/logrus-syslog-ng"
		//
		// hook, err := logrus_syslog.NewSyslogHookTLS(host, syslog.LOG_INFO, "", connectionCert)
		// if err == nil {
		// 	log.AddHook(hook)
		// }
	}

	if err != nil {
		log.WithError(err).Error("Unable to connect to syslog daemon")
	}
}

// Warning messages
const (
	WarnFailedMigration      = "Failed to migrate database"
	MiddlewareError          = "Middleware has thrown an error"
	MFAAttemptDenied         = "An attempt for multiple factor authentication was denied"
	RetrievingAccount        = "Retrieving account"
	NoUsername               = "Unable to retrieve account because no username was provided"
	NoAccount                = "Unable to retrieve account"
	AccountUpdateError       = "Not able to update account information"
	NoAuthorizationToken     = "No authorization token header found"
	InvalidJWT               = "Invalid JSON web token"
	QRCodeError              = "Failed to generate multiple factor authentication QR code"
	MFAError                 = "Error during multiple factor authentication"
	MFAInvalid               = "Failed multiple factor authentication"
	MFAEmailError            = "Failed to send email for multiple factor authentication"
	MFAResetAttempt          = "An attempt to reset multiple factor authentication was denied"
	JWTError                 = "Failed to generate JSON web token"
	OAuthAttemptDenied       = "An attempt for OAuth authentication was denied"
	OAuthConfigurationError  = "Failed to create OAuth service bindings"
	OAuthStateError          = "Invalid OAuth state"
	OAuthCodeExchangeError   = "OAuth code exchange failed"
	BasicAuthAttemptDenied   = "An attempt for basic authentication was denied"
	BasicAuthError           = "Failed to decode JSON for basic authentication"
	BasicAuthMissingUsername = "Basic authentication failed because missing a username"
	BasicAuthMissingPassword = "Basic authentication failed because missing a password"
	BasicAuthInvalid         = "Basic authentication invalid"
	SamlAttemptDenied        = "An attempt for SAML authentication was denied"
	SamlRequestError         = "Error creating SAML authentication request"
	SamlRequestURLError      = "Error creating SAML authentication request URL"
	SamlFormError            = "SAML response form value missing"
	SamlParseError           = "Error parsing SAML response"
	SamlInvalid              = "SAML response invalid"
	SamlIdentifierMissing    = "SAML attribute identifier missing"
	PayloadMissingType       = "Payload is missing a type"
	PayloadEntityError       = "Error creating entity from the payload"
	EntityError              = "Error getting entity data"
	EntitySaveError          = "Error getting entity data"
	PayloadEmpty             = "Payload not provided"
	PayloadDeserializeError  = "Failed to deserialize payload"
	PayloadInvalid           = "Payload is invalid"
	USPSRequestError         = "Error executing USPS geocoding request"
	USPSDecodeError          = "Error decoding USPS geocoding response"
	USPSKnownErrorCode       = "USPS known error received"
	USPSUnknownErrorCode     = "USPS known error received"
	USPSMissingKey           = "USPS API key has not been set"
	MigrationUnsupported     = "Database migrations are not automated for Windows. Please manually execute the migrations."
)

// Informative messages
const (
	StartingServer     = "Starting server"
	StartingServerTLS  = "Starting server with HTTPS/TLS"
	WebRequest         = "Web server request received"
	BasicAuthValid     = "Basic authentication validated"
	MFAValid           = "Multiple factor authentication validated"
	SamlValid          = "SAML authentication validated"
	ValidatingJWT      = "Validating JSON web token"
	GenerateQRCode     = "Generating multiple factor authentication QR code"
	ResetMFA           = "Reset of multiple factor authentication"
	OAuthConfiguration = "Configuring OAuth service"
	PurgeAccountData   = "Purging account data"
)
