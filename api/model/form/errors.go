package form

import "fmt"

// Validator is an interface to be used by components that require validation
type Validator interface {
	Valid() (bool, error)
}

// ValidationError stores error information for a particular field name
type ValidationError struct {
	Name  string
	Error error
}

// ErrorStack contains a list of Validation errors that have been captured
type ErrorStack []ValidationError

// HasErrors checks if any errors exist
func (stack ErrorStack) HasErrors() bool {
	return len(stack) > 0
}

func (stack ErrorStack) Error() string {
	return fmt.Sprintf("%d Errors \n", len(stack))
}

// Append adds an error to the list of errors
func (stack *ErrorStack) Append(name string, err error) {
	*stack = append(*stack, ValidationError{name, err})
}

// ErrFieldInvalid represents an error for a field with an invalid value
type ErrFieldInvalid struct {
	Message string
}

func (e ErrFieldInvalid) Error() string {
	return e.Message
}

// ErrFieldRequired represents an error for a field that requires data
type ErrFieldRequired struct {
	Message string
}

func (e ErrFieldRequired) Error() string {
	return e.Message
}

// TODO Just for demonstration purposes
type ErrInvalidLocation struct {
	Message     string
	Suggestions []string
}

func (e ErrInvalidLocation) Error() string {
	return e.Message
}
