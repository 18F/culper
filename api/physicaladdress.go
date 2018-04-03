package api

// PhysicalAddress is a basic input.
type PhysicalAddress struct {
	PayloadHasDifferentAddress Payload `json:"HasDifferentAddress" sql:"-"`
	PayloadAddress             Payload `json:"Address" sql:"-"`
	PayloadTelephone           Payload `json:"Telephone" sql:"-"`

	// Validator specific fields
	HasDifferentAddress *Branch    `json:"-"`
	Address             *Location  `json:"-"`
	Telephone           *Telephone `json:"-"`

	// Persister specific fields
	ID                    int `json:"-"`
	AccountID             int `json:"-"`
	HasDifferentAddressID int `json:"-" pg:", fk:HasDifferentAddress`
	AddressID             int `json:"-" pg:", fk:Address"`
	TelephoneID           int `json:"-" pg:", fk:Telephone"`
}
