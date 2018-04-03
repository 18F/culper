package api

// NotApplicable is a basic input.
type NotApplicable struct {
	ID         int  `json:"-"`
	Applicable bool `json:"applicable"`
}
