package api

// Supervisor is a basic input.
type Supervisor struct {
	PayloadSupervisorName     Payload `json:"SupervisorName" sql:"-"`
	PayloadTitle              Payload `json:"Title" sql:"-"`
	PayloadEmail              Payload `json:"Email" sql:"-"`
	PayloadEmailNotApplicable Payload `json:"EmailNotApplicable" sql:"-"`
	PayloadAddress            Payload `json:"Address" sql:"-"`
	PayloadTelephone          Payload `json:"Telephone" sql:"-"`

	// Validator specific fields
	SupervisorName     *Text          `json:"-"`
	Title              *Text          `json:"-"`
	Email              *Email         `json:"-"`
	EmailNotApplicable *NotApplicable `json:"-"`
	Address            *Location      `json:"-"`
	Telephone          *Telephone     `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	AccountID            int `json:"-"`
	SupervisorNameID     int `json:"-"`
	TitleID              int `json:"-"`
	EmailID              int `json:"-"`
	EmailNotApplicableID int `json:"-"`
	AddressID            int `json:"-"`
	TelephoneID          int `json:"-"`
}
