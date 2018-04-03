package api

// Signature is a basic input.
type Signature struct {
	PayloadName Payload `json:"Name" sql:"-"`
	PayloadDate Payload `json:"Date" sql:"-"`

	// Validator specific fields
	Name *Text        `json:"-" sql:"-"`
	Date *DateControl `json:"-" sql:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	AccountID int `json:"-"`
	NameID    int `json:"-"`
	DateID    int `json:"-"`
}
