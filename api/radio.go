package api

// Radio is a basic input.
type Radio struct {
	ID      int    `json:"-"`
	Value   string `json:"value"`
	Checked bool   `json:"checked,omitempty"`
}
