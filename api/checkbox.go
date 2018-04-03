package api

// Checkbox is a basic input.
type Checkbox struct {
	ID      int    `json:"-"`
	Value   string `json:"value"`
	Checked bool   `json:"checked,omitempty"`
}
