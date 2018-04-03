package api

// DateRange is a basic input.
type DateRange struct {
	PayloadFrom Payload `json:"from" sql:"-"`
	PayloadTo   Payload `json:"to" sql:"-"`
	Present     bool    `json:"present"`

	// Validator specific fields
	From *DateControl `json:"-"`
	To   *DateControl `json:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	AccountID int `json:"-"`
	FromID    int `json:"-"`
	ToID      int `json:"-"`
}
