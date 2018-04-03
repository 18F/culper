package api

import (
	"fmt"

	"github.com/18F/e-QIP-prototype/api/geo"
)

// ValidationResult is an interface to be used by errors that return a properly formatted struct
// to be used to send for client-side validation requests
type ValidationResult interface {
	Result(fieldname string) interface{}
}

// ErrorStackResults is an interface to be used to represent a collection of interfaces.
// This currently has no additional methods
type ErrorStackResults interface{}

// ErrorStack contains a list of ErrorStackResults that have been captured
type ErrorStack []ErrorStackResults

// HasErrors checks if any errors exist
func (stack ErrorStack) HasErrors() bool {
	return len(stack) > 0
}

// Error is string representation of an ErrorStack and displays
// the total number of errors. This is to implement the error type
func (stack ErrorStack) Error() string {
	var pretty string
	for _, e := range stack {
		pretty += fmt.Sprintf("%v\n", e)
	}
	return fmt.Sprintf("%d Errors: %s", len(stack), pretty)
}

// Result creates a struct that is properly formatted for the client-validation
func (stack ErrorStack) Result(fieldname string) interface{} {
	return struct {
		Fieldname string
		Errors    ErrorStack
	}{
		fieldname, stack,
	}
}

// Append adds an error to the list of errors. For those that implement the ValidationResult interface,
// the return value for Result(fieldname) will be used to populate the stack. This is to  properly format
// error/validation information that is to be returned to the client-side
func (stack *ErrorStack) Append(fieldname string, err error) {
	if err == nil {
		return
	}
	switch t := err.(type) {
	case ValidationResult:
		*stack = append(*stack, t.Result(fieldname))

	default:
		fmt.Printf("Error [%v] has no Result(string) field implemented\n", err)
		*stack = append(*stack, err)
	}
}

// NewErrorStack creates a new stack of errors for a particular field
func NewErrorStack(fieldname string, err error) ErrorStack {
	var stack ErrorStack
	stack.Append(fieldname, err)
	return stack
}

// ErrFieldInvalid represents an error for a field with an invalid value
type ErrFieldInvalid struct {
	Message string
}

// Error returns the string representation of a Field Invalid error
func (e ErrFieldInvalid) Error() string {
	return e.Message
}

// Result creates a struct that is properly formatted for the client-side validation
func (e ErrFieldInvalid) Result(fieldname string) interface{} {
	return struct {
		Fieldname string
		Error     string
	}{
		fieldname,
		e.Error(),
	}
}

// ErrFieldRequired represents an error for a field that requires data
type ErrFieldRequired struct {
	Message string
}

// Error is a basic represenation of a Require Field error
func (e ErrFieldRequired) Error() string {
	return e.Message
}

// Result creates a struct that is properly formatted for the client-side validation
func (e ErrFieldRequired) Result(fieldname string) interface{} {
	return struct {
		Fieldname string
		Error     string
	}{
		fieldname,
		e.Error(),
	}
}

// ErrInvalidLocation represents an error for location information with additional options
type ErrInvalidLocation struct {
	Message     string
	Suggestions []geo.Result
}

// Error returns the error message.
func (e ErrInvalidLocation) Error() string {
	return e.Message
}

// Result creates a struct that is properly formatted for the client-side validation
func (e ErrInvalidLocation) Result(fieldname string) interface{} {
	return struct {
		Fieldname   string
		Error       string
		Suggestions []geo.Result
	}{
		fieldname,
		e.Error(),
		e.Suggestions,
	}
}
