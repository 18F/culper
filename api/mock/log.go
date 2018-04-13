package mock

import (
	"fmt"
	"log"
	"os"

	"github.com/18F/e-QIP-prototype/api"
)

type LogService struct {
	Off bool
}

func (service LogService) Print(message string, fields api.LogFields) {
	if service.Off {
		log.Println(withFields(message, fields))
	}
}

func (service LogService) PrintError(message string, err error, fields api.LogFields) {
	if service.Off {
		log.Println(withFieldsAndError(message, err, fields))
	}
}

func (service LogService) Debug(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "debug" {
		log.Println(withFields(message, fields))
	}
}

func (service LogService) DebugError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "debug" {
		log.Println(withFieldsAndError(message, err, fields))
	}
}

func (service LogService) Warn(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "warning" {
		log.Println(withFields(message, fields))
	}
}

func (service LogService) WarnError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "warning" {
		log.Println(withFieldsAndError(message, err, fields))
	}
}

func (service LogService) Info(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "info" {
		log.Println(withFields(message, fields))
	}
}

func (service LogService) InfoError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "info" {
		log.Println(withFieldsAndError(message, err, fields))
	}
}

func (service LogService) Fatal(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "fatal" {
		log.Println(withFields(message, fields))
	}
}

func (service LogService) FatalError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "fatal" {
		log.Println(withFieldsAndError(message, err, fields))
	}
}

func (service LogService) Panic(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "panic" {
		log.Println(withFields(message, fields))
	}
}

func (service LogService) PanicError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "panic" {
		log.Println(withFieldsAndError(message, err, fields))
	}
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
