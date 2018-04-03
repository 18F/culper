package log

import (
	"log/syslog"
	"net/url"
	"os"
	"path"

	"github.com/rifflock/lfshook"
	"github.com/sirupsen/logrus"
	logrus_syslog "github.com/sirupsen/logrus/hooks/syslog"
)

type LogService struct {
	log *logrus.Logger
}

func (service LogService) Print(message, fields ...LogField) {
	service.log.WithFields(fields).Print(message)
}

func (service LogService) Print(message string, err error, fields LogFields) {
	service.log.WithFields(fields).WithError(err).Print(message)
}

func (service LogService) Debug(message, fields ...LogField) {
	service.log.WithFields(fields).Debug(message)
}

func (service LogService) Debug(message string, err error, fields LogFields) {
	service.log.WithFields(fields).WithError(err).Debug(message)
}

func (service LogService) Warn(message, fields ...LogField) {
	service.log.WithFields(fields).Warn(message)
}

func (service LogService) Warn(message string, err error, fields LogFields) {
	service.log.WithFields(fields).WithError(err).Warn(message)
}

func (service LogService) Info(message, fields ...LogField) {
	service.log.WithFields(fields).Info(message)
}

func (service LogService) Info(message string, err error, fields LogFields) {
	service.log.WithFields(fields).WithError(err).Info(message)
}

func (service LogService) Fatal(message, fields ...LogField) {
	service.log.WithFields(fields).Fatal(message)
}

func (service LogService) Fatal(message string, err error, fields LogFields) {
	service.log.WithFields(fields).WithError(err).Fatal(message)
}

func (service LogService) Panic(message, fields ...LogField) {
	service.log.WithFields(fields).Panic(message)
}

func (service LogService) Panic(message string, err error, fields LogFields) {
	service.log.WithFields(fields).WithError(err).Panic(message)
}

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

// // NewLoggerFromRequest creates a custom logger based on properties found in an HTTP request.
// func NewLoggerFromRequest(r *http.Request) *logrus.Entry {
// 	log := NewLogger()

// 	id := ""
// 	token, err := jwt.ParseWithClaims(jwt.ExtractToken(r))
// 	if err == nil && token.Valid {
// 		id = jwt.TokenClaims(token).Id
// 	}

// 	ip := r.RemoteAddr
// 	proxies := r.Header.Get(http.CanonicalHeaderKey("x-forwarded-for"))
// 	if proxies != "" {
// 		for _, proxy := range strings.Split(proxies, ", ") {
// 			ip = proxy
// 		}
// 	}

// 	// Return request specific settings
// 	contextLogger := log.WithFields(logrus.Fields{
// 		"ip":      ip,
// 		"account": id,
// 	})
// 	return contextLogger
// }

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
