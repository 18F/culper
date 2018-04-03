package api

// Branch is a basic yes/no input.
type Branch struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}
