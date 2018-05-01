package log

import (
	"log/syslog"
	"net/url"
	"os"
	"path"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/rifflock/lfshook"
	"github.com/sirupsen/logrus"
	logrus_syslog "github.com/sirupsen/logrus/hooks/syslog"
)

// Service implementation of logging using `logrus`.
type Service struct {
	Log    *logrus.Logger
	fields api.LogFields
}

// AddField will add a field using the name and value to the logger.
func (service *Service) AddField(name string, value interface{}) {
	if _, ok := service.fields[name]; !ok {
		service.fields = service.mergeFields(api.LogFields{name: value})
	}
}

// Print outputs a message to the log.
func (service *Service) Print(message string, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).Print(message)
}

// PrintError outputs a message and error to the log.
func (service *Service) PrintError(message string, err error, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).WithError(err).Print(message)
}

// Debug outputs a debug message to the log.
func (service *Service) Debug(message string, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).Debug(message)
}

// DebugError outputs a debug message and error to the log.
func (service *Service) DebugError(message string, err error, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).WithError(err).Debug(message)
}

// Warn outputs a warning message to the log.
func (service *Service) Warn(message string, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).Warn(message)
}

// WarnError outputs a warning message and error to the log.
func (service *Service) WarnError(message string, err error, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).WithError(err).Warn(message)
}

// Info outputs a informative message to the log.
func (service *Service) Info(message string, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).Info(message)
}

// InfoError outputs a informative message and error to the log.
func (service *Service) InfoError(message string, err error, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).WithError(err).Info(message)
}

// Fatal outputs a fatal message to the log.
func (service *Service) Fatal(message string, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).Fatal(message)
}

// FatalError outputs a fatal message and error to the log.
func (service *Service) FatalError(message string, err error, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).WithError(err).Fatal(message)
}

// Panic outputs a panic message to the log.
func (service *Service) Panic(message string, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).Panic(message)
}

// PanicError outputs a panic message and error to the log.
func (service *Service) PanicError(message string, err error, fields api.LogFields) {
	service.Log.WithFields(logrus.Fields(service.mergeFields(fields))).WithError(err).Panic(message)
}

// NewLogger creates a custome logger with environment hooks.
func NewLogger() *logrus.Logger {
	log := logrus.New()

	// Set log level
	level, err := logrus.ParseLevel(os.Getenv(api.LogLevel))
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

func (service *Service) mergeFields(fields api.LogFields) api.LogFields {
	merged := api.LogFields{}
	for k, v := range service.fields {
		if _, ok := merged[k]; !ok {
			merged[k] = v
		}
	}
	for k, v := range fields {
		if _, ok := merged[k]; !ok {
			merged[k] = v
		}
	}
	return merged
}

// Support for logging to an append only log file.
func hookLocalFile(log *logrus.Logger) {
	logFile := os.Getenv(api.LogFile)
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
	logDir := os.Getenv(api.LogDirectory)
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
	connectionString := os.Getenv(api.LogSyslog)
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

	connectionCert := os.Getenv(api.LogSyslogCert)
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
