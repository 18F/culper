package api

// ForeignBornDocument is a basic input.
type ForeignBornDocument struct {
	PayloadDocumentType                    Payload `json:"DocumentType" sql:"-"`
	PayloadOtherExplanation                Payload `json:"OtherExplanation" sql:"-"`
	PayloadDocumentNumber                  Payload `json:"DocumentNumber" sql:"-"`
	PayloadDocumentExpiration              Payload `json:"DocumentExpiration" sql:"-"`
	PayloadDocumentExpirationNotApplicable Payload `json:"DocumentExpirationNotApplicable" sql:"-"`

	// Validator specific fields
	DocumentType                    *Radio         `json:"-"`
	OtherExplanation                *Textarea      `json:"-"`
	DocumentNumber                  *Text          `json:"-"`
	DocumentExpiration              *DateControl   `json:"-"`
	DocumentExpirationNotApplicable *NotApplicable `json:"-"`

	// Persister specific fields
	ID                                int `json:"-"`
	AccountID                         int `json:"-"`
	DocumentTypeID                    int `json:"-"`
	OtherExplanationID                int `json:"-"`
	DocumentNumberID                  int `json:"-"`
	DocumentExpirationID              int `json:"-"`
	DocumentExpirationNotApplicableID int `json:"-"`
}
