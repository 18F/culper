package api

// DateControl is a basic input.
type DateControl struct {
	ID        int    `json:"-"`
	Month     string `json:"month"`
	Day       string `json:"day"`
	Year      string `json:"year"`
	Estimated bool   `json:"estimated"`
}
