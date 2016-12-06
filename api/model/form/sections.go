package form

// IdentifyingInfoSection stores personal identifying data for a person
type IdentifyingInfoSection struct {
	Person          PersonField
	Address         AddressField
	PlaceOfBirth    BirthAddressField
	DateOfBirth     DateField
	SSN             SSNField
	OptionalComment TextField
}

// Valid checks for invalid information and returns errors
func (s IdentifyingInfoSection) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := s.Person.Valid(); !ok {
		stack.Append("Person", err)
	}

	if ok, err := s.DateOfBirth.Valid(); !ok {
		stack.Append("DateOfBirth", err)
	}

	if ok, err := s.PlaceOfBirth.Valid(); !ok {
		stack.Append("PlaceOfBirth", err)
	}

	if ok, err := s.SSN.Valid(); !ok {
		stack.Append("SSN", err)
	}

	return !stack.HasErrors(), stack
}

// OtherNamesUsedSection stores information about a persons alternative names
type OtherNamesUsedSection struct {
	Person          PersonField
	DatesUsed       DateRangeField
	Reasons         TextField
	OptionalComment TextField
}

// Valid validates the information for Other names used section
func (s OtherNamesUsedSection) Valid() (bool, error) {
	var stack ErrorStack
	if ok, err := s.Person.Valid(); !ok {
		stack.Append("Person", err)
	}

	if ok, err := s.DatesUsed.Valid(); !ok {
		stack.Append("DateOfBirth", err)
	}

	if ok, err := s.Reasons.Valid(); !ok {
		stack.Append("Reasons", err)
	}

	return !stack.HasErrors(), stack
}

// YourIdentifyingInfoSection stores personal physical attributes
type YourIdentifyingInfoSection struct {
	Height    HeightField
	Weight    WeightField
	HairColor HairColorField
	EyeColor  EyeColorField
	Sex       SexField
}

// Valid validates and returns errors
func (s YourIdentifyingInfoSection) Valid() (bool, error) {
	var stack ErrorStack
	if ok, err := s.Height.Valid(); !ok {
		stack.Append("Height", err)
	}

	if ok, err := s.Weight.Valid(); !ok {
		stack.Append("Weight", err)
	}

	if ok, err := s.HairColor.Valid(); !ok {
		stack.Append("HairColor", err)
	}

	if ok, err := s.EyeColor.Valid(); !ok {
		stack.Append("EyeColor", err)
	}

	if ok, err := s.Sex.Valid(); !ok {
		stack.Append("Sex", err)
	}

	return !stack.HasErrors(), stack
}

// EmployerActivitiesSection stores a persons employement activity
type EmploymentActivitySection struct {
	Status       EmploymentStatusField
	EmployerName TextField
	Address      AddressField
	Phone        PhoneNumberField
	StartDate    DateField
	EndDate      DateField
}

func (e EmploymentActivitySection) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := e.Status.Valid(); !ok {
		stack.Append("Status", err)
	}

	if ok, err := e.EmployerName.Valid(); !ok {
		stack.Append("EmployerName", err)
	}

	if ok, err := e.Address.Valid(); !ok {
		stack.Append("Address", err)
	}

	if ok, err := e.Phone.Valid(); !ok {
		stack.Append("Phone", err)
	}

	if ok, err := e.StartDate.Valid(); !ok {
		stack.Append("StartDate", err)
	}

	if ok, err := e.EndDate.Valid(); !ok {
		stack.Append("EndDate", err)
	}

	return !stack.HasErrors(), stack
}
