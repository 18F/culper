package api

import "encoding/json"

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
	PayloadLocation                      Payload `json:"Location" sql:"-"`
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
	Location                      *Location            `json:"-"`
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
	LocationID                      int `json:"-"`
	NameID                          int `json:"-"`
	OtherNamesID                    int `json:"-"`
	SSNID                           int `json:"-"`
	SeparatedID                     int `json:"-"`
	TelephoneID                     int `json:"-"`
	UseCurrentAddressID             int `json:"-"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *CivilUnion) Valid() (bool, error) {
	if entity.Address != nil {
		if ok, err := entity.Address.Valid(); !ok {
			return false, err
		}
	}
	if entity.AddressSeparated != nil {
		if ok, err := entity.AddressSeparated.Valid(); !ok {
			return false, err
		}
	}
	if entity.AddressSeparatedNotApplicable != nil {
		if ok, err := entity.AddressSeparatedNotApplicable.Valid(); !ok {
			return false, err
		}
	}
	if entity.BirthPlace != nil {
		if ok, err := entity.BirthPlace.Valid(); !ok {
			return false, err
		}
	}
	if entity.Birthdate != nil {
		if ok, err := entity.Birthdate.Valid(); !ok {
			return false, err
		}
	}
	if entity.Citizenship != nil {
		if ok, err := entity.Citizenship.Valid(); !ok {
			return false, err
		}
	}
	if entity.DateSeparated != nil {
		if ok, err := entity.DateSeparated.Valid(); !ok {
			return false, err
		}
	}
	if entity.Divorced != nil {
		if ok, err := entity.Divorced.Valid(); !ok {
			return false, err
		}
	}
	if entity.Email != nil {
		if ok, err := entity.Email.Valid(); !ok {
			return false, err
		}
	}
	if entity.EnteredCivilUnion != nil {
		if ok, err := entity.EnteredCivilUnion.Valid(); !ok {
			return false, err
		}
	}
	if entity.ForeignBornDocument != nil {
		if ok, err := entity.ForeignBornDocument.Valid(); !ok {
			return false, err
		}
	}
	if entity.Location != nil {
		if ok, err := entity.Location.Valid(); !ok {
			return false, err
		}
	}
	if entity.Name != nil {
		if ok, err := entity.Name.Valid(); !ok {
			return false, err
		}
	}
	if entity.OtherNames != nil {
		if ok, err := entity.OtherNames.Valid(); !ok {
			return false, err
		}
	}
	if entity.SSN != nil {
		if ok, err := entity.SSN.Valid(); !ok {
			return false, err
		}
	}
	if entity.Separated != nil {
		if ok, err := entity.Separated.Valid(); !ok {
			return false, err
		}
	}
	if entity.Telephone != nil {
		if ok, err := entity.Telephone.Valid(); !ok {
			return false, err
		}
	}
	if entity.UseCurrentAddress != nil {
		if ok, err := entity.UseCurrentAddress.Valid(); !ok {
			return false, err
		}
	}
	return true, nil
}

// Save the CivilUnion entity.
func (entity *CivilUnion) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	addressID, err := entity.Address.Save(context, account)
	if err != nil {
		return addressID, err
	}
	entity.AddressID = addressID

	addressSeparatedID, err := entity.AddressSeparated.Save(context, account)
	if err != nil {
		return addressSeparatedID, err
	}
	entity.AddressSeparatedID = addressSeparatedID

	addressSeparatedNotApplicableID, err := entity.AddressSeparatedNotApplicable.Save(context, account)
	if err != nil {
		return addressSeparatedNotApplicableID, err
	}
	entity.AddressSeparatedNotApplicableID = addressSeparatedNotApplicableID

	birthPlaceID, err := entity.BirthPlace.Save(context, account)
	if err != nil {
		return birthPlaceID, err
	}
	entity.BirthPlaceID = birthPlaceID

	birthdateID, err := entity.Birthdate.Save(context, account)
	if err != nil {
		return birthdateID, err
	}
	entity.BirthdateID = birthdateID

	citizenshipID, err := entity.Citizenship.Save(context, account)
	if err != nil {
		return citizenshipID, err
	}
	entity.CitizenshipID = citizenshipID

	dateSeparatedID, err := entity.DateSeparated.Save(context, account)
	if err != nil {
		return dateSeparatedID, err
	}
	entity.DateSeparatedID = dateSeparatedID

	divorcedID, err := entity.Divorced.Save(context, account)
	if err != nil {
		return divorcedID, err
	}
	entity.DivorcedID = divorcedID

	emailID, err := entity.Email.Save(context, account)
	if err != nil {
		return emailID, err
	}
	entity.EmailID = emailID

	enteredCivilUnionID, err := entity.EnteredCivilUnion.Save(context, account)
	if err != nil {
		return enteredCivilUnionID, err
	}
	entity.EnteredCivilUnionID = enteredCivilUnionID

	foreignBornDocumentID, err := entity.ForeignBornDocument.Save(context, account)
	if err != nil {
		return foreignBornDocumentID, err
	}
	entity.ForeignBornDocumentID = foreignBornDocumentID

	locationID, err := entity.Location.Save(context, account)
	if err != nil {
		return locationID, err
	}
	entity.LocationID = locationID

	nameID, err := entity.Name.Save(context, account)
	if err != nil {
		return nameID, err
	}
	entity.NameID = nameID

	otherNamesID, err := entity.OtherNames.Save(context, account)
	if err != nil {
		return otherNamesID, err
	}
	entity.OtherNamesID = otherNamesID

	sSNID, err := entity.SSN.Save(context, account)
	if err != nil {
		return sSNID, err
	}
	entity.SSNID = sSNID

	separatedID, err := entity.Separated.Save(context, account)
	if err != nil {
		return separatedID, err
	}
	entity.SeparatedID = separatedID

	telephoneID, err := entity.Telephone.Save(context, account)
	if err != nil {
		return telephoneID, err
	}
	entity.TelephoneID = telephoneID

	useCurrentAddressID, err := entity.UseCurrentAddress.Save(context, account)
	if err != nil {
		return useCurrentAddressID, err
	}
	entity.UseCurrentAddressID = useCurrentAddressID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the CivilUnion entity.
func (entity *CivilUnion) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Address.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.AddressSeparated.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.AddressSeparatedNotApplicable.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.BirthPlace.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Birthdate.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Citizenship.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.DateSeparated.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Divorced.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Email.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.EnteredCivilUnion.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.ForeignBornDocument.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Location.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Name.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.OtherNames.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.SSN.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Separated.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.Telephone.Delete(context, account); err != nil {
		return entity.ID, err
	}
	if _, err := entity.UseCurrentAddress.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get the CivilUnion entity.
func (entity *CivilUnion) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.AddressID != 0 {
		if _, err := entity.Address.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.AddressSeparatedID != 0 {
		if _, err := entity.AddressSeparated.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.AddressSeparatedNotApplicableID != 0 {
		if _, err := entity.AddressSeparatedNotApplicable.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.BirthPlaceID != 0 {
		if _, err := entity.BirthPlace.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.BirthdateID != 0 {
		if _, err := entity.Birthdate.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.CitizenshipID != 0 {
		if _, err := entity.Citizenship.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.DateSeparatedID != 0 {
		if _, err := entity.DateSeparated.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.DivorcedID != 0 {
		if _, err := entity.Divorced.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.EmailID != 0 {
		if _, err := entity.Email.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.EnteredCivilUnionID != 0 {
		if _, err := entity.EnteredCivilUnion.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.ForeignBornDocumentID != 0 {
		if _, err := entity.ForeignBornDocument.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.LocationID != 0 {
		if _, err := entity.Location.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.NameID != 0 {
		if _, err := entity.Name.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.OtherNamesID != 0 {
		if _, err := entity.OtherNames.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.SSNID != 0 {
		if _, err := entity.SSN.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.SeparatedID != 0 {
		if _, err := entity.Separated.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.TelephoneID != 0 {
		if _, err := entity.Telephone.Get(context, account); err != nil {
			return entity.ID, err
		}
	}
	if entity.UseCurrentAddressID != 0 {
		if _, err := entity.UseCurrentAddress.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *CivilUnion) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *CivilUnion) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *CivilUnion) Find(context DatabaseService) error {
	context.Find(&CivilUnion{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*CivilUnion)
		if entity.Address == nil {
			entity.Address = &Location{}
		}
		entity.Address.ID = previous.AddressID
		entity.AddressID = previous.AddressID
		if entity.AddressSeparated == nil {
			entity.AddressSeparated = &Location{}
		}
		entity.AddressSeparated.ID = previous.AddressSeparatedID
		entity.AddressSeparatedID = previous.AddressSeparatedID
		if entity.AddressSeparatedNotApplicable == nil {
			entity.AddressSeparatedNotApplicable = &NotApplicable{}
		}
		entity.AddressSeparatedNotApplicable.ID = previous.AddressSeparatedNotApplicableID
		entity.AddressSeparatedNotApplicableID = previous.AddressSeparatedNotApplicableID
		if entity.BirthPlace == nil {
			entity.BirthPlace = &Location{}
		}
		entity.BirthPlace.ID = previous.BirthPlaceID
		entity.BirthPlaceID = previous.BirthPlaceID
		if entity.Birthdate == nil {
			entity.Birthdate = &DateControl{}
		}
		entity.Birthdate.ID = previous.BirthdateID
		entity.BirthdateID = previous.BirthdateID
		if entity.Citizenship == nil {
			entity.Citizenship = &Country{}
		}
		entity.Citizenship.ID = previous.CitizenshipID
		entity.CitizenshipID = previous.CitizenshipID
		if entity.DateSeparated == nil {
			entity.DateSeparated = &DateControl{}
		}
		entity.DateSeparated.ID = previous.DateSeparatedID
		entity.DateSeparatedID = previous.DateSeparatedID
		if entity.Divorced == nil {
			entity.Divorced = &Branch{}
		}
		entity.Divorced.ID = previous.DivorcedID
		entity.DivorcedID = previous.DivorcedID
		if entity.Email == nil {
			entity.Email = &Email{}
		}
		entity.Email.ID = previous.EmailID
		entity.EmailID = previous.EmailID
		if entity.EnteredCivilUnion == nil {
			entity.EnteredCivilUnion = &DateControl{}
		}
		entity.EnteredCivilUnion.ID = previous.EnteredCivilUnionID
		entity.EnteredCivilUnionID = previous.EnteredCivilUnionID
		if entity.ForeignBornDocument == nil {
			entity.ForeignBornDocument = &ForeignBornDocument{}
		}
		entity.ForeignBornDocument.ID = previous.ForeignBornDocumentID
		entity.ForeignBornDocumentID = previous.ForeignBornDocumentID
		if entity.Location == nil {
			entity.Location = &Location{}
		}
		entity.Location.ID = previous.LocationID
		entity.LocationID = previous.LocationID
		if entity.Name == nil {
			entity.Name = &Name{}
		}
		entity.Name.ID = previous.NameID
		entity.NameID = previous.NameID
		if entity.OtherNames == nil {
			entity.OtherNames = &Collection{}
		}
		entity.OtherNames.ID = previous.OtherNamesID
		entity.OtherNamesID = previous.OtherNamesID
		if entity.SSN == nil {
			entity.SSN = &SSN{}
		}
		entity.SSN.ID = previous.SSNID
		entity.SSNID = previous.SSNID
		if entity.Separated == nil {
			entity.Separated = &Branch{}
		}
		entity.Separated.ID = previous.SeparatedID
		entity.SeparatedID = previous.SeparatedID
		if entity.Telephone == nil {
			entity.Telephone = &Telephone{}
		}
		entity.Telephone.ID = previous.TelephoneID
		entity.TelephoneID = previous.TelephoneID
		if entity.UseCurrentAddress == nil {
			entity.UseCurrentAddress = &NotApplicable{}
		}
		entity.UseCurrentAddress.ID = previous.UseCurrentAddressID
		entity.UseCurrentAddressID = previous.UseCurrentAddressID
	})
	return nil
}
