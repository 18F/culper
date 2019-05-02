package api

// Section interface represents a top level section in the form
type Section interface {
	Entity
	Rejector
}

// Rejector interface allows an entity to have nos cleared when the application is kicked back
type Rejector interface {
	ClearNos() error
}
