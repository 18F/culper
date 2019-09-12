package log

import (
	"errors"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
)

func TestLogPrint(t *testing.T) {
	log := &Service{Log: NewLogger(), fields: api.LogFields{"what": "ever"}}
	log.Print("Print message", log.fields)
}

func TestLogPrintErr(t *testing.T) {
	log := &Service{Log: NewLogger(), fields: api.LogFields{"what": "ever"}}
	log.PrintError("Print with error", errors.New("new error"), log.fields)
}

func TestLogDebugError(t *testing.T) {
	log := &Service{Log: NewLogger(), fields: api.LogFields{"what": "ever"}}
	log.DebugError("Debug with error", errors.New("new error"), log.fields)
}

func TestLogInfo(t *testing.T) {
	log := &Service{Log: NewLogger(), fields: api.LogFields{"what": "ever"}}
	log.Info("Info message", log.fields)
}
func TestLogInfoError(t *testing.T) {
	log := &Service{Log: NewLogger(), fields: api.LogFields{"what": "ever"}}
	log.InfoError("Info with error", errors.New("new error"), log.fields)
}

func TestLogPanic(t *testing.T) {
	func() {
		defer func() {
			if r := recover(); r == nil {
				t.Errorf("TestLogPanic should panic")
			}
		}()
		// This function should cause a panic
		log := &Service{Log: NewLogger(), fields: api.LogFields{"what": "ever"}}
		log.Panic("Panic log", log.fields)
	}()

}

func TestLogPanicError(t *testing.T) {
	func() {
		defer func() {
			if r := recover(); r == nil {
				t.Errorf("TestLogPanicError should panic")
			}
		}()
		// This function should cause a panic
		log := &Service{Log: NewLogger(), fields: api.LogFields{"what": "ever"}}
		log.PanicError("Panic with error", errors.New("new error"), log.fields)
	}()
}
