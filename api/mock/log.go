package mock

import (
	"log"
	"os"

	"github.com/18F/e-QIP-prototype/api"
)

type LogService struct {
	Off bool
}

func (service LogService) Print(message string, fields api.LogFields) {
	if service.Off {
		log.Println(message)
	}
}

func (service LogService) PrintError(message string, err error, fields api.LogFields) {
	if service.Off {
		log.Println(message)
	}
}

func (service LogService) Debug(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "debug" {
		log.Println(message)
	}
}

func (service LogService) DebugError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "debug" {
		log.Println(message)
	}
}

func (service LogService) Warn(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "warning" {
		log.Println(message)
	}
}

func (service LogService) WarnError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "warning" {
		log.Println(message)
	}
}

func (service LogService) Info(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "info" {
		log.Println(message)
	}
}

func (service LogService) InfoError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "info" {
		log.Println(message)
	}
}

func (service LogService) Fatal(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "fatal" {
		log.Println(message)
	}
}

func (service LogService) FatalError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "fatal" {
		log.Println(message)
	}
}

func (service LogService) Panic(message string, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "panic" {
		log.Println(message)
	}
}

func (service LogService) PanicError(message string, err error, fields api.LogFields) {
	if !service.Off && os.Getenv(api.LOG_LEVEL) == "panic" {
		log.Println(message)
	}
}
