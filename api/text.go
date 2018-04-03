package api

// Text is a basic input.
type Text struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}
