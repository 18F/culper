package api

import (
	"encoding/json"
)

// CitizenshipStatus represents the payload for the citizenship status section.
type CitizenshipStatus struct {
	PayloadCitizenshipStatus           Payload `json:"CitizenshipStatus" sql:"-"`
	PayloadAbroadDocumentation         Payload `json:"AbroadDocumentation" sql:"-"`
	PayloadExplanation                 Payload `json:"Explanation" sql:"-"`
	PayloadDocumentNumber              Payload `json:"DocumentNumber" sql:"-"`
	PayloadDocumentIssued              Payload `json:"DocumentIssued" sql:"-"`
	PayloadDocumentName                Payload `json:"DocumentName" sql:"-"`
	PayloadDocumentExpiration          Payload `json:"DocumentExpiration" sql:"-"`
	PayloadDocumentType                Payload `json:"DocumentType" sql:"-"`
	PayloadPlaceIssued                 Payload `json:"PlaceIssued" sql:"-"`
	PayloadCertificateNumber           Payload `json:"CertificateNumber" sql:"-"`
	PayloadCertificateIssued           Payload `json:"CertificateIssued" sql:"-"`
	PayloadCertificateName             Payload `json:"CertificateName" sql:"-"`
	PayloadCertificateCourtName        Payload `json:"CertificateCourtName" sql:"-"`
	PayloadCertificateCourtAddress     Payload `json:"CertificateCourtAddress" sql:"-"`
	PayloadBornOnMilitaryInstallation  Payload `json:"BornOnMilitaryInstallation" sql:"-"`
	PayloadMilitaryBase                Payload `json:"MilitaryBase" sql:"-"`
	PayloadEntryDate                   Payload `json:"EntryDate" sql:"-"`
	PayloadEntryLocation               Payload `json:"EntryLocation" sql:"-"`
	PayloadPriorCitizenship            Payload `json:"PriorCitizenship" sql:"-"`
	PayloadHasAlienRegistration        Payload `json:"HasAlienRegistration" sql:"-"`
	PayloadAlienRegistrationNumber     Payload `json:"AlienRegistrationNumber" sql:"-"`
	PayloadAlienRegistrationExpiration Payload `json:"AlienRegistrationExpiration" sql:"-"`
	PayloadBasis                       Payload `json:"Basis" sql:"-"`
	PayloadPermanentResidentCardNumber Payload `json:"PermanentResidentCardNumber" sql:"-"`
	PayloadResidenceStatus             Payload `json:"ResidenceStatus" sql:"-"`

	// Validator specific fields
	CitizenshipStatus           *Radio       `json:"-"`
	AbroadDocumentation         *Radio       `json:"-"`
	Explanation                 *Textarea    `json:"-"`
	DocumentNumber              *Text        `json:"-"`
	DocumentIssued              *DateControl `json:"-"`
	DocumentName                *Name        `json:"-"`
	DocumentExpiration          *DateControl `json:"-"`
	DocumentType                *Radio       `json:"-"`
	PlaceIssued                 *Location    `json:"-"`
	CertificateNumber           *Text        `json:"-"`
	CertificateIssued           *DateControl `json:"-"`
	CertificateName             *Name        `json:"-"`
	CertificateCourtName        *Text        `json:"-"`
	CertificateCourtAddress     *Location    `json:"-"`
	BornOnMilitaryInstallation  *Branch      `json:"-"`
	MilitaryBase                *Text        `json:"-"`
	EntryDate                   *DateControl `json:"-"`
	EntryLocation               *Location    `json:"-"`
	PriorCitizenship            *Country     `json:"-"`
	HasAlienRegistration        *Branch      `json:"-"`
	AlienRegistrationNumber     *Text        `json:"-"`
	AlienRegistrationExpiration *DateControl `json:"-"`
	Basis                       *Radio       `json:"-"`
	PermanentResidentCardNumber *Text        `json:"-"`
	ResidenceStatus             *Text        `json:"-"`

	// Persister specific fields
	ID                            int `json:"-"`
	CitizenshipStatusID           int `json:"-" pg:", fk:CitizenshipStatus"`
	AbroadDocumentationID         int `json:"-" pg:", fk:AbroadDocumentation"`
	ExplanationID                 int `json:"-" pg:", fk:Explanation"`
	DocumentNumberID              int `json:"-" pg:", fk:DocumentNumber"`
	DocumentIssuedID              int `json:"-" pg:", fk:DocumentIssued"`
	DocumentNameID                int `json:"-" pg:", fk:DocumentName"`
	DocumentExpirationID          int `json:"-" pg:", fk:DocumentExpiration"`
	DocumentTypeID                int `json:"-" pg:", fk:DocumentType"`
	PlaceIssuedID                 int `json:"-" pg:", fk:PlaceIssued"`
	CertificateNumberID           int `json:"-" pg:", fk:CertificateNumber"`
	CertificateIssuedID           int `json:"-" pg:", fk:CertificateIssued"`
	CertificateNameID             int `json:"-" pg:", fk:CertificateName"`
	CertificateCourtNameID        int `json:"-" pg:", fk:CertificateCourtName"`
	CertificateCourtAddressID     int `json:"-" pg:", fk:CertificateCourtAddress"`
	BornOnMilitaryInstallationID  int `json:"-" pg:", fk:BornOnMilitaryInstallation"`
	MilitaryBaseID                int `json:"-" pg:", fk:MilitaryBase"`
	EntryDateID                   int `json:"-" pg:", fk:EntryDate"`
	EntryLocationID               int `json:"-" pg:", fk:EntryLocation"`
	PriorCitizenshipID            int `json:"-" pg:", fk:PriorCitizenship"`
	HasAlienRegistrationID        int `json:"-" pg:", fk:HasAlienRegistration"`
	AlienRegistrationNumberID     int `json:"-" pg:", fk:AlienRegistrationNumber"`
	AlienRegistrationExpirationID int `json:"-" pg:", fk:AlienRegistrationExpiration"`
	BasisID                       int `json:"-" pg:", fk:Basis"`
	PermanentResidentCardNumberID int `json:"-" pg:", fk:PermanentResidentCardNumber"`
	ResidenceStatusID             int `json:"-" pg:", fk:ResidenceStatus"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipStatus) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	citizenshipStatus, err := entity.PayloadCitizenshipStatus.Entity()
	if err != nil {
		return err
	}
	entity.CitizenshipStatus = citizenshipStatus.(*Radio)

	abroadDocumentation, err := entity.PayloadAbroadDocumentation.Entity()
	if err != nil {
		return err
	}
	entity.AbroadDocumentation = abroadDocumentation.(*Radio)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	documentNumber, err := entity.PayloadDocumentNumber.Entity()
	if err != nil {
		return err
	}
	entity.DocumentNumber = documentNumber.(*Text)

	documentIssued, err := entity.PayloadDocumentIssued.Entity()
	if err != nil {
		return err
	}
	entity.DocumentIssued = documentIssued.(*DateControl)

	documentName, err := entity.PayloadDocumentName.Entity()
	if err != nil {
		return err
	}
	entity.DocumentName = documentName.(*Name)

	documentExpiration, err := entity.PayloadDocumentExpiration.Entity()
	if err != nil {
		return err
	}
	entity.DocumentExpiration = documentExpiration.(*DateControl)

	documentType, err := entity.PayloadDocumentType.Entity()
	if err != nil {
		return err
	}
	entity.DocumentType = documentType.(*Radio)

	placeIssued, err := entity.PayloadPlaceIssued.Entity()
	if err != nil {
		return err
	}
	entity.PlaceIssued = placeIssued.(*Location)

	certificateNumber, err := entity.PayloadCertificateNumber.Entity()
	if err != nil {
		return err
	}
	entity.CertificateNumber = certificateNumber.(*Text)

	certificateIssued, err := entity.PayloadCertificateIssued.Entity()
	if err != nil {
		return err
	}
	entity.CertificateIssued = certificateIssued.(*DateControl)

	certificateName, err := entity.PayloadCertificateName.Entity()
	if err != nil {
		return err
	}
	entity.CertificateName = certificateName.(*Name)

	certificateCourtName, err := entity.PayloadCertificateCourtName.Entity()
	if err != nil {
		return err
	}
	entity.CertificateCourtName = certificateCourtName.(*Text)

	certificateCourtAddress, err := entity.PayloadCertificateCourtAddress.Entity()
	if err != nil {
		return err
	}
	entity.CertificateCourtAddress = certificateCourtAddress.(*Location)

	bornOnMilitaryInstallation, err := entity.PayloadBornOnMilitaryInstallation.Entity()
	if err != nil {
		return err
	}
	entity.BornOnMilitaryInstallation = bornOnMilitaryInstallation.(*Branch)

	militaryBase, err := entity.PayloadMilitaryBase.Entity()
	if err != nil {
		return err
	}
	entity.MilitaryBase = militaryBase.(*Text)

	entryDate, err := entity.PayloadEntryDate.Entity()
	if err != nil {
		return err
	}
	entity.EntryDate = entryDate.(*DateControl)

	entryLocation, err := entity.PayloadEntryLocation.Entity()
	if err != nil {
		return err
	}
	entity.EntryLocation = entryLocation.(*Location)

	priorCitizenship, err := entity.PayloadPriorCitizenship.Entity()
	if err != nil {
		return err
	}
	entity.PriorCitizenship = priorCitizenship.(*Country)

	hasAlienRegistration, err := entity.PayloadHasAlienRegistration.Entity()
	if err != nil {
		return err
	}
	entity.HasAlienRegistration = hasAlienRegistration.(*Branch)

	alienRegistrationNumber, err := entity.PayloadAlienRegistrationNumber.Entity()
	if err != nil {
		return err
	}
	entity.AlienRegistrationNumber = alienRegistrationNumber.(*Text)

	alienRegistrationExpiration, err := entity.PayloadAlienRegistrationExpiration.Entity()
	if err != nil {
		return err
	}
	entity.AlienRegistrationExpiration = alienRegistrationExpiration.(*DateControl)

	basis, err := entity.PayloadBasis.Entity()
	if err != nil {
		return err
	}
	entity.Basis = basis.(*Radio)

	permanentResidentCardNumber, err := entity.PayloadPermanentResidentCardNumber.Entity()
	if err != nil {
		return err
	}
	entity.PermanentResidentCardNumber = permanentResidentCardNumber.(*Text)

	residenceStatus, err := entity.PayloadResidenceStatus.Entity()
	if err != nil {
		return err
	}
	entity.ResidenceStatus = residenceStatus.(*Text)

	return err
}

// Marshal to payload structure
func (entity *CitizenshipStatus) Marshal() Payload {
	if entity.CitizenshipStatus != nil {
		entity.PayloadCitizenshipStatus = entity.CitizenshipStatus.Marshal()
	}
	if entity.AbroadDocumentation != nil {
		entity.PayloadAbroadDocumentation = entity.AbroadDocumentation.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	if entity.DocumentNumber != nil {
		entity.PayloadDocumentNumber = entity.DocumentNumber.Marshal()
	}
	if entity.DocumentIssued != nil {
		entity.PayloadDocumentIssued = entity.DocumentIssued.Marshal()
	}
	if entity.DocumentName != nil {
		entity.PayloadDocumentName = entity.DocumentName.Marshal()
	}
	if entity.DocumentExpiration != nil {
		entity.PayloadDocumentExpiration = entity.DocumentExpiration.Marshal()
	}
	if entity.DocumentType != nil {
		entity.PayloadDocumentType = entity.DocumentType.Marshal()
	}
	if entity.PlaceIssued != nil {
		entity.PayloadPlaceIssued = entity.PlaceIssued.Marshal()
	}
	if entity.CertificateNumber != nil {
		entity.PayloadCertificateNumber = entity.CertificateNumber.Marshal()
	}
	if entity.CertificateIssued != nil {
		entity.PayloadCertificateIssued = entity.CertificateIssued.Marshal()
	}
	if entity.CertificateName != nil {
		entity.PayloadCertificateName = entity.CertificateName.Marshal()
	}
	if entity.CertificateCourtName != nil {
		entity.PayloadCertificateCourtName = entity.CertificateCourtName.Marshal()
	}
	if entity.CertificateCourtAddress != nil {
		entity.PayloadCertificateCourtAddress = entity.CertificateCourtAddress.Marshal()
	}
	if entity.BornOnMilitaryInstallation != nil {
		entity.PayloadBornOnMilitaryInstallation = entity.BornOnMilitaryInstallation.Marshal()
	}
	if entity.MilitaryBase != nil {
		entity.PayloadMilitaryBase = entity.MilitaryBase.Marshal()
	}
	if entity.EntryDate != nil {
		entity.PayloadEntryDate = entity.EntryDate.Marshal()
	}
	if entity.EntryLocation != nil {
		entity.PayloadEntryLocation = entity.EntryLocation.Marshal()
	}
	if entity.PriorCitizenship != nil {
		entity.PayloadPriorCitizenship = entity.PriorCitizenship.Marshal()
	}
	if entity.HasAlienRegistration != nil {
		entity.PayloadHasAlienRegistration = entity.HasAlienRegistration.Marshal()
	}
	if entity.AlienRegistrationNumber != nil {
		entity.PayloadAlienRegistrationNumber = entity.AlienRegistrationNumber.Marshal()
	}
	if entity.AlienRegistrationExpiration != nil {
		entity.PayloadAlienRegistrationExpiration = entity.AlienRegistrationExpiration.Marshal()
	}
	if entity.Basis != nil {
		entity.PayloadBasis = entity.Basis.Marshal()
	}
	if entity.PermanentResidentCardNumber != nil {
		entity.PayloadPermanentResidentCardNumber = entity.PermanentResidentCardNumber.Marshal()
	}
	if entity.ResidenceStatus != nil {
		entity.PayloadResidenceStatus = entity.ResidenceStatus.Marshal()
	}
	return MarshalPayloadEntity("citizenship.status", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipStatus) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.CitizenshipStatus.Valid(); !ok {
		stack.Append("CitizenshipStatus", err)
	}

	switch entity.CitizenshipStatus.Value {
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

// CitizenshipMultiple represents the payload for the citizenship multiple section.
type CitizenshipMultiple struct {
	PayloadHasMultiple Payload `json:"HasMultiple" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasMultiple *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasMultipleID int `json:"-" pg:", fk:HasMultiple"`
	ListID        int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipMultiple) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasMultiple, err := entity.PayloadHasMultiple.Entity()
	if err != nil {
		return err
	}
	entity.HasMultiple = hasMultiple.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *CitizenshipMultiple) Marshal() Payload {
	if entity.HasMultiple != nil {
		entity.PayloadHasMultiple = entity.HasMultiple.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("citizenship.multiple", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipMultiple) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.HasMultiple.Valid(); !ok {
		stack.Append("CitizenshipMultiple", err)
	}

	if entity.HasMultiple.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("CitizenshipMultiple", err)
		}
	}

	return !stack.HasErrors(), stack
}

// CitizenshipPassports represents the payload for the citizenship passports section.
type CitizenshipPassports struct {
	PayloadPassports Payload `json:"Passports" sql:"-"`

	// Validator specific fields
	Passports *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	PassportsID int `json:"-" pg:", fk:Passports"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipPassports) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	passports, err := entity.PayloadPassports.Entity()
	if err != nil {
		entity.Passports = &Collection{ID: entity.PassportsID}
		return err
	}
	entity.Passports = passports.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *CitizenshipPassports) Marshal() Payload {
	if entity.Passports != nil {
		entity.PayloadPassports = entity.Passports.Marshal()
	}
	return MarshalPayloadEntity("citizenship.passports", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipPassports) Valid() (bool, error) {
	return entity.Passports.Valid()
}
