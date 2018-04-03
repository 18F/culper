package api

type Treatment struct {
	PayloadName    Payload `json:"Name" sql:"-"`
	PayloadPhone   Payload `json:"Phone" sql:"-"`
	PayloadAddress Payload `json:"Address" sql:"-"`

	// Validator specific fields
	Name    *Text      `json:"-"`
	Phone   *Telephone `json:"-"`
	Address *Location  `json:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	NameID    int `json:"-" pg:", fk:Name"`
	PhoneID   int `json:"-" pg:", fk:Phone"`
	AddressID int `json:"-" pg:", fk:Address"`
}
