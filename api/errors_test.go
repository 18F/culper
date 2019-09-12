package api

import (
	"testing"

	"github.com/pkg/errors"
)

func TestAppendNilToErrorStack(t *testing.T) {
	var stack ErrorStack
	stack.Append("Error", nil)

	if stack.HasErrors() {
		t.Log("Shouldn't have errors")
		t.Fail()
	}
}

func TestAppendErrorToErrorStack(t *testing.T) {
	var stack ErrorStack
	stack.Append("Error", errors.New("another error"))

	if !stack.HasErrors() {
		t.Log("Should have an error")
		t.Fail()
	}
}

func TestMakeNewErrorStack(t *testing.T) {
	stack := NewErrorStack("Error", errors.New("another error"))
	stack.Result("Location")
	if !stack.HasErrors() {
		t.Log("Should have an error")
		t.Fail()
	}
}

func TestAppendErrFieldInvalid(t *testing.T) {
	var stack ErrorStack
	errFieldInvalid := ErrFieldInvalid{"Invalid country"}
	stack.Append("Location", errFieldInvalid)
	err := errFieldInvalid.Error()
	errFieldInvalid.Result("Location")

	if err != "Invalid country" {
		t.Log("Should have a Location error")
		t.Fail()
	}
}
