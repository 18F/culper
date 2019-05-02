package api

// Section interface represents a top level section in the form
// Right now that's just an entity, but it would be nice if we could separate Sections
// from things like text fields in the future.
type Section interface {
	Entity
}

// Rejector interface allows an entity to have nos cleared when the application is kicked back
type Rejector interface {
	ClearNos() error
}
