package api

// Country is a basic input.
type Country struct {
	ID       int      `json:"-"`
	Value    []string `json:"value" pg:",array"`
	Comments string   `json:"comments,omitempty"`
}
