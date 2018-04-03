package api

// Height is a basic input.
type Height struct {
	ID     int `json:"-"`
	Feet   int `json:"feet"`
	Inches int `json:"inches"`
}
