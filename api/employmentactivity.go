package api

// EmploymentActivity is a basic input.
type EmploymentActivity struct {
	ID               int    `json:"-"`
	Value            string `json:"value"`
	OtherExplanation string `json:"otherExplanation,omitempty"`
}
