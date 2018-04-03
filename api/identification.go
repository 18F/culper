package api

// IdentificationName subsection of identification section.
type IdentificationName struct {
	PayloadName Payload `json:"Name" sql:"-"`

	// Validator specific fields
	Name *Name `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	NameID int `json:"-" pg:", fk:Name"`
}

// IdentificationBirthPlace subsection of identification section.
type IdentificationBirthPlace struct {
	Payload Payload `json:"Location" sql:"-"`

	// Validator specific fields
	Location *Location `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	LocationID int `json:"-" pg:", fk:Location"`
}

// IdentificationBirthDate subsection of identification section.
type IdentificationBirthDate struct {
	PayloadDate      Payload `json:"Date" sql:"-"`
	PayloadConfirmed Payload `json:"Confirmed" sql:"-"`

	// Validator specific fields
	Date      *DateControl `json:"-"`
	Confirmed *Checkbox    `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	DateID      int `json:"-" pg:", fk:Date"`
	ConfirmedID int `json:"-"`
}

// IdentificationSSN subsection of identification section.
type IdentificationSSN struct {
	Payload Payload `json:"ssn" sql:"-"`

	// Validator specific fields
	Verified bool `json:"verified"`
	SSN      *SSN `json:"-" sql:"-"`

	// Persister specific fields
	ID    int `json:"-"`
	SSNID int `json:"-" pg:", fk:SSN"`
}

// IdentificationContacts subsection of identification section.
type IdentificationContacts struct {
	PayloadEmails       Payload `json:"Emails" sql:"-"`
	PayloadPhoneNumbers Payload `json:"PhoneNumbers" sql:"-"`

	// Validator specific fields
	Emails       *Collection `json:"-"`
	PhoneNumbers *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	EmailsID       int `json:"-" pg:", fk:Emails"`
	PhoneNumbersID int `json:"-" pg:", fk:PhoneNumbers"`
}

// IdentificationOtherNames subsection of identification section.
type IdentificationOtherNames struct {
	PayloadHasOtherNames Payload `json:"HasOtherNames" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOtherNames *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasOtherNamesID int `json:"-" pg:", fk:HasOtherNames"`
	ListID          int `json:"-" pg:", fk:List"`
}

// IdentificationPhysical subsection of identification section.
type IdentificationPhysical struct {
	PayloadComments  Payload `json:"Comments" sql:"-"`
	PayloadEyeColor  Payload `json:"EyeColor" sql:"-"`
	PayloadHairColor Payload `json:"HairColor" sql:"-"`
	PayloadHeight    Payload `json:"Height" sql:"-"`
	PayloadSex       Payload `json:"Sex" sql:"-"`
	PayloadWeight    Payload `json:"Weight" sql:"-"`

	// Validator specific fields
	Comments  *Textarea `json:"-"`
	EyeColor  *Text     `json:"-"`
	HairColor *Text     `json:"-"`
	Sex       *Text     `json:"-"`
	Height    *Height   `json:"-"`
	Weight    *Number   `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	CommentsID  int `json:"-" pg:", fk:Comments"`
	EyeColorID  int `json:"-" pg:", fk:EyeColor"`
	HairColorID int `json:"-" pg:", fk:HairColor"`
	SexID       int `json:"-" pg:", fk:Sex"`
	HeightID    int `json:"-" pg:", fk:Height"`
	WeightID    int `json:"-" pg:", fk:Weight"`
}

// IdentificationComments subsection of identification section.
type IdentificationComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
