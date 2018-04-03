package api

// Textarea is a basic input.
type Textarea struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}
