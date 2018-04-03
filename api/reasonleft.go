package api

// ReasonLeft is a basic input.
type ReasonLeft struct {
	PayloadComments          Payload `json:"Comments" sql:"-"`
	PayloadReasons           Payload `json:"Reasons" sql:"-"`
	PayloadReasonDescription Payload `json:"ReasonDescription" sql:"-"`

	// Validator specific fields
	Comments          *Textarea   `json:"-"`
	Reasons           *Collection `json:"-"`
	ReasonDescription *Textarea   `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	AccountID           int `json:"-"`
	CommentsID          int `json:"-"`
	ReasonsID           int `json:"-"`
	ReasonDescriptionID int `json:"-"`
}
