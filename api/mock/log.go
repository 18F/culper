package mock

import (
	"fmt"
	"log"
	"os"

	"github.com/18F/e-QIP-prototype/api"
)

// LogService mock implementation of logging.
type LogService struct {
	Off    bool
	fields api.LogFields
}

// AddField will add a field using the name and value to the logger.
func (service *LogService) AddField(name string, value interface{}) {
	if _, ok := service.fields[name]; !ok {
		service.fields = service.mergeFields(api.LogFields{name: value})
	}
}

// Print outputs a message to the log.
func (service *LogService) Print(message string, fields api.LogFields) {
	if service.Off {
		log.Println(withFields(message, service.mergeFields(fields)))
	}
}

// PrintError outputs a message and error to the log.
func (service *LogService) PrintError(message string, err error, fields api.LogFields) {
	if service.Off {
		log.Println(withFieldsAndError(message, err, service.mergeFields(fields)))
	}
}

// Debug outputs a debug message to the log.
func (service *LogService) Debug(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "debug" {
		log.Println(withFields(message, service.mergeFields(fields)))
	}
}

// DebugError outputs a debug message and error to the log.
func (service *LogService) DebugError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "debug" {
		log.Println(withFieldsAndError(message, err, service.mergeFields(fields)))
	}
}

// Warn outputs a warning message to the log.
func (service *LogService) Warn(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "warning" {
		log.Println(withFields(message, service.mergeFields(fields)))
	}
}

// WarnError outputs a warning message and error to the log.
func (service *LogService) WarnError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "warning" {
		log.Println(withFieldsAndError(message, err, service.mergeFields(fields)))
	}
}

// Info outputs a informative message to the log.
func (service *LogService) Info(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "info" {
		log.Println(withFields(message, service.mergeFields(fields)))
	}
}

// InfoError outputs a informative message and error to the log.
func (service *LogService) InfoError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "info" {
		log.Println(withFieldsAndError(message, err, service.mergeFields(fields)))
	}
}

// Fatal outputs a fatal message to the log.
func (service *LogService) Fatal(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "fatal" {
		log.Println(withFields(message, service.mergeFields(fields)))
	}
}

// FatalError outputs a fatal message and error to the log.
func (service *LogService) FatalError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "fatal" {
		log.Println(withFieldsAndError(message, err, service.mergeFields(fields)))
	}
}

// Panic outputs a panic message to the log.
func (service *LogService) Panic(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "panic" {
		log.Println(withFields(message, service.mergeFields(fields)))
	}
}

// PanicError outputs a panic message and error to the log.
func (service *LogService) PanicError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "panic" {
		log.Println(withFieldsAndError(message, err, service.mergeFields(fields)))
	}
}

func (service *LogService) mergeFields(fields api.LogFields) api.LogFields {
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

func withFields(message string, fields api.LogFields) string {
	s := message
	for k, v := range fields {
		s += fmt.Sprintf(", %s: %v", k, v)
	}
	return s
}

func withFieldsAndError(message string, err error, fields api.LogFields) string {
	s := fmt.Sprintf("%s, error: %s", message, err)
	for k, v := range fields {
		s += fmt.Sprintf(", %s: %v", k, v)
	}
	return s
}
