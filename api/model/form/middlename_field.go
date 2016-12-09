package form

import "fmt"

// MiddlenameField stores and validates a persons Middle Name
type MiddlenameField struct {
	Name string
	// Initial Only || No Middle Name
	Type string
}

func (m MiddlenameField) Valid() (bool, error) {
	var stack ErrorStack

	if m.Type == "" && m.Name == "" {
		stack.Append("Name", ErrFieldRequired{"Middlename is required"})
	}

	if m.Type != "Initial Only" || m.Type != "No Middle Name" {
		stack.Append("Type", ErrFieldInvalid{fmt.Sprintf("%v is not a valid Middlename Type", m.Type)})
	}
	return !stack.HasErrors(), stack
}
