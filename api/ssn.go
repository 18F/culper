package api

// SSN is a basic input.
type SSN struct {
	ID            int    `json:"-"`
	First         string `json:"first"`
	Middle        string `json:"middle"`
	Last          string `json:"last"`
	NotApplicable bool   `json:"notApplicable"`
}
