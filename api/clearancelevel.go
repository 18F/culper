package api

// ClearanceLevel is a basic input.
type ClearanceLevel struct {
	PayloadLevel       Payload `json:"Level" sql:"-"`
	PayloadExplanation Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	Level       *Radio    `json:"-"`
	Explanation *Textarea `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	AccountID     int `json:"-"`
	LevelID       int `json:"-"`
	ExplanationID int `json:"-"`
}
