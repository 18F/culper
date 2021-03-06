package api

import "encoding/json"

// CivilUnion is an item of named payloads.
type CivilUnion struct {
	PayloadAddress                       Payload `json:"Address" sql:"-"`
	PayloadAddressSeparated              Payload `json:"AddressSeparated" sql:"-"`
	PayloadAddressSeparatedNotApplicable Payload `json:"AddressSeparatedNotApplicable" sql:"-"`
	PayloadAlternateAddress              Payload `json:"AlternateAddress" sql:"-"`
	PayloadBirthPlace                    Payload `json:"BirthPlace" sql:"-"`
	PayloadBirthdate                     Payload `json:"Birthdate" sql:"-"`
	PayloadCitizenship                   Payload `json:"Citizenship" sql:"-"`
	PayloadDateSeparated                 Payload `json:"DateSeparated" sql:"-"`
	PayloadDivorced                      Payload `json:"Divorced" sql:"-"`
	PayloadEmail                         Payload `json:"Email" sql:"-"`
	PayloadEmailNotApplicable            Payload `json:"EmailNotApplicable" sql:"-"`
	PayloadEnteredCivilUnion             Payload `json:"EnteredCivilUnion" sql:"-"`
	PayloadForeignBornDocument           Payload `json:"ForeignBornDocument" sql:"-"`
	PayloadLocation                      Payload `json:"Location" sql:"-"`
	PayloadName                          Payload `json:"Name" sql:"-"`
	PayloadOtherNames                    Payload `json:"OtherNames" sql:"-"`
	PayloadSSN                           Payload `json:"SSN" sql:"-"`
	PayloadSeparated                     Payload `json:"Separated" sql:"-"`
	PayloadTelephone                     Payload `json:"Telephone" sql:"-"`
	PayloadUseCurrentAddress             Payload `json:"UseCurrentAddress" sql:"-"`

	Address                       *Location            `json:"-"`
	AddressSeparated              *Location            `json:"-"`
	AddressSeparatedNotApplicable *NotApplicable       `json:"-"`
	AlternateAddress              *PhysicalAddress     `json:"-"`
	BirthPlace                    *Location            `json:"-"`
	Birthdate                     *DateControl         `json:"-"`
	Citizenship                   *Country             `json:"-"`
	DateSeparated                 *DateControl         `json:"-"`
	Divorced                      *Branch              `json:"-"`
	Email                         *Email               `json:"-"`
	EmailNotApplicable            *NotApplicable       `json:"-"`
	EnteredCivilUnion             *DateControl         `json:"-"`
	ForeignBornDocument           *ForeignBornDocument `json:"-"`
	Location                      *Location            `json:"-"`
	Name                          *Name                `json:"-"`
	OtherNames                    *Collection          `json:"-"`
	SSN                           *SSN                 `json:"-" sql:"-"`
	Separated                     *Branch              `json:"-"`
	Telephone                     *Telephone           `json:"-"`
	UseCurrentAddress             *NotApplicable       `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CivilUnion) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	address, err := entity.PayloadAddress.Entity()
	if err != nil {
		return err
	}
	entity.Address = address.(*Location)

	addressSeparated, err := entity.PayloadAddressSeparated.Entity()
	if err != nil {
		return err
	}
	entity.AddressSeparated = addressSeparated.(*Location)

	addressSeparatedNotApplicable, err := entity.PayloadAddressSeparatedNotApplicable.Entity()
	if err != nil {
		return err
	}
	entity.AddressSeparatedNotApplicable = addressSeparatedNotApplicable.(*NotApplicable)

	alternateAddress, err := entity.PayloadAlternateAddress.Entity()
	if err != nil {
		return err
	}
	entity.AlternateAddress = alternateAddress.(*PhysicalAddress)

	birthPlace, err := entity.PayloadBirthPlace.Entity()
	if err != nil {
		return err
	}
	entity.BirthPlace = birthPlace.(*Location)

	birthdate, err := entity.PayloadBirthdate.Entity()
	if err != nil {
		return err
	}
	entity.Birthdate = birthdate.(*DateControl)

	citizenship, err := entity.PayloadCitizenship.Entity()
	if err != nil {
		return err
	}
	entity.Citizenship = citizenship.(*Country)

	dateSeparated, err := entity.PayloadDateSeparated.Entity()
	if err != nil {
		return err
	}
	entity.DateSeparated = dateSeparated.(*DateControl)

	divorced, err := entity.PayloadDivorced.Entity()
	if err != nil {
		return err
	}
	entity.Divorced = divorced.(*Branch)

	email, err := entity.PayloadEmail.Entity()
	if err != nil {
		return err
	}
	entity.Email = email.(*Email)

	emailNotApplicable, err := entity.PayloadEmailNotApplicable.Entity()
	if err != nil {
		return err
	}
	entity.EmailNotApplicable = emailNotApplicable.(*NotApplicable)

	enteredCivilUnion, err := entity.PayloadEnteredCivilUnion.Entity()
	if err != nil {
		return err
	}
	entity.EnteredCivilUnion = enteredCivilUnion.(*DateControl)

	foreignBornDocument, err := entity.PayloadForeignBornDocument.Entity()
	if err != nil {
		return err
	}
	entity.ForeignBornDocument = foreignBornDocument.(*ForeignBornDocument)

	location, err := entity.PayloadLocation.Entity()
	if err != nil {
		return err
	}
	entity.Location = location.(*Location)

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Name)

	otherNames, err := entity.PayloadOtherNames.Entity()
	if err != nil {
		return err
	}
	entity.OtherNames = otherNames.(*Collection)

	sSN, err := entity.PayloadSSN.Entity()
	if err != nil {
		return err
	}
	entity.SSN = sSN.(*SSN)

	separated, err := entity.PayloadSeparated.Entity()
	if err != nil {
		return err
	}
	entity.Separated = separated.(*Branch)

	telephone, err := entity.PayloadTelephone.Entity()
	if err != nil {
		return err
	}
	entity.Telephone = telephone.(*Telephone)

	useCurrentAddress, err := entity.PayloadUseCurrentAddress.Entity()
	if err != nil {
		return err
	}
	entity.UseCurrentAddress = useCurrentAddress.(*NotApplicable)

	return err
}

// Marshal to payload structure
func (entity *CivilUnion) Marshal() Payload {
	if entity.Address != nil {
		entity.PayloadAddress = entity.Address.Marshal()
	}
	if entity.AddressSeparated != nil {
		entity.PayloadAddressSeparated = entity.AddressSeparated.Marshal()
	}
	if entity.AddressSeparatedNotApplicable != nil {
		entity.PayloadAddressSeparatedNotApplicable = entity.AddressSeparatedNotApplicable.Marshal()
	}
	if entity.AlternateAddress != nil {
		entity.PayloadAlternateAddress = entity.AlternateAddress.Marshal()
	}
	if entity.BirthPlace != nil {
		entity.PayloadBirthPlace = entity.BirthPlace.Marshal()
	}
	if entity.Birthdate != nil {
		entity.PayloadBirthdate = entity.Birthdate.Marshal()
	}
	if entity.Citizenship != nil {
		entity.PayloadCitizenship = entity.Citizenship.Marshal()
	}
	if entity.DateSeparated != nil {
		entity.PayloadDateSeparated = entity.DateSeparated.Marshal()
	}
	if entity.Divorced != nil {
		entity.PayloadDivorced = entity.Divorced.Marshal()
	}
	if entity.Email != nil {
		entity.PayloadEmail = entity.Email.Marshal()
	}
	if entity.EmailNotApplicable != nil {
		entity.PayloadEmailNotApplicable = entity.EmailNotApplicable.Marshal()
	}
	if entity.EnteredCivilUnion != nil {
		entity.PayloadEnteredCivilUnion = entity.EnteredCivilUnion.Marshal()
	}
	if entity.ForeignBornDocument != nil {
		entity.PayloadForeignBornDocument = entity.ForeignBornDocument.Marshal()
	}
	if entity.Location != nil {
		entity.PayloadLocation = entity.Location.Marshal()
	}
	if entity.Name != nil {
		entity.PayloadName = entity.Name.Marshal()
	}
	if entity.OtherNames != nil {
		entity.PayloadOtherNames = entity.OtherNames.Marshal()
	}
	if entity.SSN != nil {
		entity.PayloadSSN = entity.SSN.Marshal()
	}
	if entity.Separated != nil {
		entity.PayloadSeparated = entity.Separated.Marshal()
	}
	if entity.Telephone != nil {
		entity.PayloadTelephone = entity.Telephone.Marshal()
	}
	if entity.UseCurrentAddress != nil {
		entity.PayloadUseCurrentAddress = entity.UseCurrentAddress.Marshal()
	}
	return MarshalPayloadEntity("civilunion", entity)
}
