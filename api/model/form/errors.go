package form

import "fmt"

// Validator is an interface to be used by components that require validation
type Validator interface {
	Valid() (bool, error)
}

// ErrorStackResults contains a collection of validation results
type ErrorStackResults interface{}

// ErrorStack contains a list of ErrorStackResults that have been captured
type ErrorStack []ErrorStackResults

// HasErrors checks if any errors exist
func (stack ErrorStack) HasErrors() bool {
	return len(stack) > 0
}

// Error is string representation of an ErrorStack and displays
// the total number of errors
func (stack ErrorStack) Error() string {
	return fmt.Sprintf("%d Errors \n", len(stack))
}

// Append adds an error to the list of errors. A different validation result
// type is used based on the number of errors contained within the results.
func (stack *ErrorStack) Append(name string, err error) {
	if err == nil {
		return
	}
	switch errType := err.(type) {
	// If we have an error that contains many errors, use ValidationResults (note plural s)
	case ErrorStack:
		*stack = append(*stack, ValidationResults{
			Fieldname: name,
			Errors:    errType,
		})
	// If we have an error dealing with locations, use the LocationValidationResult
	case ErrInvalidLocation:
		*stack = append(*stack, LocationValidationResult{
			Fieldname:   name,
			Error:       err.Error(),
			Suggestions: errType.Suggestions,
		})
	// For all other errors, simply grab string representation of the error
	default:
		*stack = append(*stack, ValidationResult{
			Fieldname: name,
			Error:     err.Error(),
		})
	}
}

// NewErrorStack creates a new stack of errors for a particular field
func NewErrorStack(fieldname string, err error) ErrorStack {
	var stack ErrorStack
	stack.Append(fieldname, err)
	return stack
}

// ValidationResult returns one error for a particular field
type ValidationResult struct {
	Fieldname string
	Error     string
}

// ValidationResults returns one or more errors for a particular field. This result
// contains a slice of additional errors
type ValidationResults struct {
	Fieldname string
	Errors    ErrorStack
}

// ValidationResults returns an error and possible suggestions for a particular field
type LocationValidationResult struct {
	Fieldname   string
	Error       string
	Suggestions []string
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

// Error is a basic represenation of a Require Field error
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
