package api

// Email is a basic input.
type Email struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}
