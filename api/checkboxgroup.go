package api

// CheckboxGroup is a basic input.
type CheckboxGroup struct {
	ID     int      `json:"-"`
	Values []string `json:"values"`
}
