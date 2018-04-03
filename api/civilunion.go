package api

// CivilUnion is an item of named payloads.
type CivilUnion struct {
	PayloadAddress                       Payload `json:"Address" sql:"-"`
	PayloadAddressSeparated              Payload `json:"AddressSeparated" sql:"-"`
	PayloadAddressSeparatedNotApplicable Payload `json:"AddressSeparatedNotApplicable" sql:"-"`
	PayloadBirthPlace                    Payload `json:"BirthPlace" sql:"-"`
	PayloadBirthdate                     Payload `json:"Birthdate" sql:"-"`
	PayloadCitizenship                   Payload `json:"Citizenship" sql:"-"`
	PayloadDateSeparated                 Payload `json:"DateSeparated" sql:"-"`
	PayloadDivorced                      Payload `json:"Divorced" sql:"-"`
	PayloadEmail                         Payload `json:"Email" sql:"-"`
	PayloadEnteredCivilUnion             Payload `json:"EnteredCivilUnion" sql:"-"`
	PayloadForeignBornDocument           Payload `json:"ForeignBornDocument" sql:"-"`
	PayloadName                          Payload `json:"Name" sql:"-"`
	PayloadOtherNames                    Payload `json:"OtherNames" sql:"-"`
	PayloadSSN                           Payload `json:"SSN" sql:"-"`
	PayloadSeparated                     Payload `json:"Separated" sql:"-"`
	PayloadTelephone                     Payload `json:"Telephone" sql:"-"`
	PayloadUseCurrentAddress             Payload `json:"UseCurrentAddress" sql:"-"`

	// Validator specific fields
	Address                       *Location            `json:"-"`
	AddressSeparated              *Location            `json:"-"`
	AddressSeparatedNotApplicable *NotApplicable       `json:"-"`
	BirthPlace                    *Location            `json:"-"`
	Birthdate                     *DateControl         `json:"-"`
	Citizenship                   *Country             `json:"-"`
	DateSeparated                 *DateControl         `json:"-"`
	Divorced                      *Branch              `json:"-"`
	Email                         *Email               `json:"-"`
	EnteredCivilUnion             *DateControl         `json:"-"`
	ForeignBornDocument           *ForeignBornDocument `json:"-"`
	Name                          *Name                `json:"-"`
	OtherNames                    *Collection          `json:"-"`
	SSN                           *SSN                 `json:"-" sql:"-"`
	Separated                     *Branch              `json:"-"`
	Telephone                     *Telephone           `json:"-"`
	UseCurrentAddress             *NotApplicable       `json:"-"`

	// Persister specific fields
	ID                              int `json:"-" sql:",pk"`
	AccountID                       int `json:"-" sql:",pk"`
	AddressID                       int `json:"-"`
	AddressSeparatedID              int `json:"-"`
	AddressSeparatedNotApplicableID int `json:"-"`
	BirthPlaceID                    int `json:"-"`
	BirthdateID                     int `json:"-"`
	CitizenshipID                   int `json:"-"`
	DateSeparatedID                 int `json:"-"`
	DivorcedID                      int `json:"-"`
	EmailID                         int `json:"-"`
	EnteredCivilUnionID             int `json:"-"`
	ForeignBornDocumentID           int `json:"-"`
	NameID                          int `json:"-"`
	OtherNamesID                    int `json:"-"`
	SSNID                           int `json:"-"`
	SeparatedID                     int `json:"-"`
	TelephoneID                     int `json:"-"`
	UseCurrentAddressID             int `json:"-"`
}
