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

// NewLogger creates a custome logger with environment hooks.
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

// NewLoggerFromRequest creates a custom logger based on properties found in an HTTP request.
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
	AccountLocked            = "The account is currently locked"
	AccountUpdateError       = "Not able to update account information"
	BasicAuthAttemptDenied   = "An attempt for basic authentication was denied"
	BasicAuthError           = "Failed to decode JSON for basic authentication"
	BasicAuthInvalid         = "Basic authentication invalid"
	BasicAuthMissingPassword = "Basic authentication failed because missing a password"
	BasicAuthMissingUsername = "Basic authentication failed because missing a username"
	EntityError              = "Error getting entity data"
	EntitySaveError          = "Error getting entity data"
	InvalidJWT               = "Invalid JSON web token"
	JWTError                 = "Failed to generate JSON web token"
	MFAAttemptDenied         = "An attempt for multiple factor authentication was denied"
	MFAEmailError            = "Failed to send email for multiple factor authentication"
	MFAError                 = "Error during multiple factor authentication"
	MFAInvalid               = "Failed multiple factor authentication"
	MFAResetAttempt          = "An attempt to reset multiple factor authentication was denied"
	MiddlewareError          = "Middleware has thrown an error"
	MigrationUnsupported     = "Database migrations are not automated for Windows. Please manually execute the migrations."
	NoAccount                = "Unable to retrieve account"
	NoAuthorizationToken     = "No authorization token header found"
	NoUsername               = "Unable to retrieve account because no username was provided"
	PayloadDeserializeError  = "Failed to deserialize payload"
	PayloadEmpty             = "Payload not provided"
	PayloadEntityError       = "Error creating entity from the payload"
	PayloadInvalid           = "Payload is invalid"
	PayloadMissingType       = "Payload is missing a type"
	QRCodeError              = "Failed to generate multiple factor authentication QR code"
	RetrievingAccount        = "Retrieving account"
	SamlAttemptDenied        = "An attempt for SAML authentication was denied"
	SamlFormError            = "SAML response form value missing"
	SamlIdentifierMissing    = "SAML attribute identifier missing"
	SamlInvalid              = "SAML response invalid"
	SamlParseError           = "Error parsing SAML response"
	SamlRequestError         = "Error creating SAML authentication request"
	SamlRequestURLError      = "Error creating SAML authentication request URL"
	USPSDecodeError          = "Error decoding USPS geocoding response"
	USPSKnownErrorCode       = "USPS known error received"
	USPSMissingKey           = "USPS API key has not been set"
	USPSRequestError         = "Error executing USPS geocoding request"
	USPSUnknownErrorCode     = "USPS known error received"
	WarnFailedMigration      = "Failed to migrate database"
	WebserviceMissingURL     = "Missing endpoint URL for web service"
	WebserviceMissingKey     = "Missing private key for web service"
	TransmissionError        = "Error transmitting package"
	TransmissionStorageError = "Failed to store transmission record"
)

// Informative messages
const (
	BasicAuthValid       = "Basic authentication validated"
	GenerateQRCode       = "Generating multiple factor authentication QR code"
	MFAValid             = "Multiple factor authentication validated"
	PurgeAccountData     = "Purging account data"
	ResetMFA             = "Reset of multiple factor authentication"
	SamlValid            = "SAML authentication validated"
	StartingServer       = "Starting server"
	StartingServerTLS    = "Starting server with HTTPS/TLS"
	ValidatingJWT        = "Validating JSON web token"
	WebRequest           = "Web server request received"
	GeneratingPackage    = "Generating package for transmission"
	TransmissionStarted  = "Transmission began"
	TransmissionStopped  = "Transmission ended"
	TransmissionRecorded = "Transmission recorded"
)
