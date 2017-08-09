package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

type CitizenshipStatus struct {
	CitizenshipStatus           Payload
	AbroadDocumentation         Payload
	Explanation                 Payload
	DocumentNumber              Payload
	DocumentIssued              Payload
	DocumentName                Payload
	DocumentExpiration          Payload
	DocumentType                Payload
	PlaceIssued                 Payload
	CertificateNumber           Payload
	CertificateIssued           Payload
	CertificateName             Payload
	CertificateCourtName        Payload
	CertificateCourtAddress     Payload
	BornOnMilitaryInstallation  Payload
	MilitaryBase                Payload
	EntryDate                   Payload
	EntryLocation               Payload
	PriorCitizenship            Payload
	HasAlienRegistration        Payload
	AlienRegistrationNumber     Payload
	AlienRegistrationExpiration Payload
	Basis                       Payload
	PermanentResidentCardNumber Payload
	ResidenceStatus             Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipStatus) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipStatus) Valid() (bool, error) {
	var stack model.ErrorStack

	status, err := entity.CitizenshipStatus.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := status.Valid(); !ok {
		stack.Append("CitizenshipStatus", err)
	}

	switch status.(*Radio).Value {
	case "Citizen":
	case "ForeignBorn":
		if ok, err := entity.DocumentNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.DocumentIssued.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.PlaceIssued.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.DocumentName.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateIssued.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateName.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
	case "Naturalized":
		if ok, err := entity.EntryDate.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.EntryLocation.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.PriorCitizenship.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateCourtName.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateCourtAddress.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateIssued.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateName.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
	case "Derived":
		if ok, err := entity.AlienRegistrationNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.PermanentResidentCardNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateName.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.CertificateIssued.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
	case "NotCitizen":
		if ok, err := entity.ResidenceStatus.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.EntryDate.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.EntryLocation.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.PriorCitizenship.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.AlienRegistrationNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.AlienRegistrationExpiration.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.DocumentNumber.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.DocumentName.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.DocumentIssued.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
		if ok, err := entity.DocumentExpiration.Valid(); !ok {
			stack.Append("CitizenshipStatus", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *CitizenshipStatus) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipStatus) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipStatus) Get(account int64) error {
	return nil
}

type CitizenshipMultiple struct {
	HasMultiple Payload
	List        Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipMultiple) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipMultiple) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasMultiple.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("CitizenshipMultiple", err)
	}

	if b.(*Branch).Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("CitizenshipMultiple", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *CitizenshipMultiple) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipMultiple) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipMultiple) Get(account int64) error {
	return nil
}

type CitizenshipPassports struct {
	Passports Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipPassports) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipPassports) Valid() (bool, error) {
	return entity.Passports.Valid()
}

// Save will create or update the database.
func (entity *CitizenshipPassports) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipPassports) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipPassports) Get(account int64) error {
	return nil
}
