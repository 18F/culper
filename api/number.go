package api

// Number is a basic input.
type Number struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}
