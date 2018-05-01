package api

import (
	"encoding/json"
)

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

// Save will create or update the database.
func (entity *CitizenshipStatus) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	citizenshipStatusID, err := entity.CitizenshipStatus.Save(context, account)
	if err != nil {
		return citizenshipStatusID, err
	}
	entity.CitizenshipStatusID = citizenshipStatusID

	abroadDocumentationID, err := entity.AbroadDocumentation.Save(context, account)
	if err != nil {
		return abroadDocumentationID, err
	}
	entity.AbroadDocumentationID = abroadDocumentationID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	documentNumberID, err := entity.DocumentNumber.Save(context, account)
	if err != nil {
		return documentNumberID, err
	}
	entity.DocumentNumberID = documentNumberID

	documentIssuedID, err := entity.DocumentIssued.Save(context, account)
	if err != nil {
		return documentIssuedID, err
	}
	entity.DocumentIssuedID = documentIssuedID

	documentNameID, err := entity.DocumentName.Save(context, account)
	if err != nil {
		return documentNameID, err
	}
	entity.DocumentNameID = documentNameID

	documentExpirationID, err := entity.DocumentExpiration.Save(context, account)
	if err != nil {
		return documentExpirationID, err
	}
	entity.DocumentExpirationID = documentExpirationID

	documentTypeID, err := entity.DocumentType.Save(context, account)
	if err != nil {
		return documentTypeID, err
	}
	entity.DocumentTypeID = documentTypeID

	placeIssuedID, err := entity.PlaceIssued.Save(context, account)
	if err != nil {
		return placeIssuedID, err
	}
	entity.PlaceIssuedID = placeIssuedID

	certificateNumberID, err := entity.CertificateNumber.Save(context, account)
	if err != nil {
		return certificateNumberID, err
	}
	entity.CertificateNumberID = certificateNumberID

	certificateIssuedID, err := entity.CertificateIssued.Save(context, account)
	if err != nil {
		return certificateIssuedID, err
	}
	entity.CertificateIssuedID = certificateIssuedID

	certificateNameID, err := entity.CertificateName.Save(context, account)
	if err != nil {
		return certificateNameID, err
	}
	entity.CertificateNameID = certificateNameID

	certificateCourtNameID, err := entity.CertificateCourtName.Save(context, account)
	if err != nil {
		return certificateCourtNameID, err
	}
	entity.CertificateCourtNameID = certificateCourtNameID

	certificateCourtAddressID, err := entity.CertificateCourtAddress.Save(context, account)
	if err != nil {
		return certificateCourtAddressID, err
	}
	entity.CertificateCourtAddressID = certificateCourtAddressID

	bornOnMilitaryInstallationID, err := entity.BornOnMilitaryInstallation.Save(context, account)
	if err != nil {
		return bornOnMilitaryInstallationID, err
	}
	entity.BornOnMilitaryInstallationID = bornOnMilitaryInstallationID

	militaryBaseID, err := entity.MilitaryBase.Save(context, account)
	if err != nil {
		return militaryBaseID, err
	}
	entity.MilitaryBaseID = militaryBaseID

	entryDateID, err := entity.EntryDate.Save(context, account)
	if err != nil {
		return entryDateID, err
	}
	entity.EntryDateID = entryDateID

	entryLocationID, err := entity.EntryLocation.Save(context, account)
	if err != nil {
		return entryLocationID, err
	}
	entity.EntryLocationID = entryLocationID

	priorCitizenshipID, err := entity.PriorCitizenship.Save(context, account)
	if err != nil {
		return priorCitizenshipID, err
	}
	entity.PriorCitizenshipID = priorCitizenshipID

	hasAlienRegistrationID, err := entity.HasAlienRegistration.Save(context, account)
	if err != nil {
		return hasAlienRegistrationID, err
	}
	entity.HasAlienRegistrationID = hasAlienRegistrationID

	alienRegistrationNumberID, err := entity.AlienRegistrationNumber.Save(context, account)
	if err != nil {
		return alienRegistrationNumberID, err
	}
	entity.AlienRegistrationNumberID = alienRegistrationNumberID

	alienRegistrationExpirationID, err := entity.AlienRegistrationExpiration.Save(context, account)
	if err != nil {
		return alienRegistrationExpirationID, err
	}
	entity.AlienRegistrationExpirationID = alienRegistrationExpirationID

	basisID, err := entity.Basis.Save(context, account)
	if err != nil {
		return basisID, err
	}
	entity.BasisID = basisID

	permanentResidentCardNumberID, err := entity.PermanentResidentCardNumber.Save(context, account)
	if err != nil {
		return permanentResidentCardNumberID, err
	}
	entity.PermanentResidentCardNumberID = permanentResidentCardNumberID

	residenceStatusID, err := entity.ResidenceStatus.Save(context, account)
	if err != nil {
		return residenceStatusID, err
	}
	entity.ResidenceStatusID = residenceStatusID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipStatus) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.CitizenshipStatus.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.AbroadDocumentation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentIssued.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentName.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentExpiration.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentType.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.PlaceIssued.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CertificateNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CertificateIssued.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CertificateName.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CertificateCourtName.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CertificateCourtAddress.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.BornOnMilitaryInstallation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.MilitaryBase.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.EntryDate.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.EntryLocation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.PriorCitizenship.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasAlienRegistration.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.AlienRegistrationNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.AlienRegistrationExpiration.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Basis.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.PermanentResidentCardNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ResidenceStatus.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipStatus) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.CitizenshipStatusID != 0 {
		entity.CitizenshipStatus = &Radio{ID: entity.CitizenshipStatusID}
		if _, err := entity.CitizenshipStatus.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.AbroadDocumentationID != 0 {
		entity.AbroadDocumentation = &Radio{ID: entity.AbroadDocumentationID}
		if _, err := entity.AbroadDocumentation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExplanationID != 0 {
		entity.Explanation = &Textarea{ID: entity.ExplanationID}
		if _, err := entity.Explanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentNumberID != 0 {
		entity.DocumentNumber = &Text{ID: entity.DocumentNumberID}
		if _, err := entity.DocumentNumber.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentIssuedID != 0 {
		entity.DocumentIssued = &DateControl{ID: entity.DocumentIssuedID}
		if _, err := entity.DocumentIssued.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentNameID != 0 {
		entity.DocumentName = &Name{ID: entity.DocumentNameID}
		if _, err := entity.DocumentName.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentExpirationID != 0 {
		entity.DocumentExpiration = &DateControl{ID: entity.DocumentExpirationID}
		if _, err := entity.DocumentExpiration.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentTypeID != 0 {
		entity.DocumentType = &Radio{ID: entity.DocumentTypeID}
		if _, err := entity.DocumentType.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.PlaceIssuedID != 0 {
		entity.PlaceIssued = &Location{ID: entity.PlaceIssuedID}
		if _, err := entity.PlaceIssued.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CertificateNumberID != 0 {
		entity.CertificateNumber = &Text{ID: entity.CertificateNumberID}
		if _, err := entity.CertificateNumber.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CertificateIssuedID != 0 {
		entity.CertificateIssued = &DateControl{ID: entity.CertificateIssuedID}
		if _, err := entity.CertificateIssued.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CertificateNameID != 0 {
		entity.CertificateName = &Name{ID: entity.CertificateNameID}
		if _, err := entity.CertificateName.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CertificateCourtNameID != 0 {
		entity.CertificateCourtName = &Text{ID: entity.CertificateCourtNameID}
		if _, err := entity.CertificateCourtName.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CertificateCourtAddressID != 0 {
		entity.CertificateCourtAddress = &Location{ID: entity.CertificateCourtAddressID}
		if _, err := entity.CertificateCourtAddress.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.BornOnMilitaryInstallationID != 0 {
		entity.BornOnMilitaryInstallation = &Branch{ID: entity.BornOnMilitaryInstallationID}
		if _, err := entity.BornOnMilitaryInstallation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.MilitaryBaseID != 0 {
		entity.MilitaryBase = &Text{ID: entity.MilitaryBaseID}
		if _, err := entity.MilitaryBase.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EntryDateID != 0 {
		entity.EntryDate = &DateControl{ID: entity.EntryDateID}
		if _, err := entity.EntryDate.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EntryLocationID != 0 {
		entity.EntryLocation = &Location{ID: entity.EntryLocationID}
		if _, err := entity.EntryLocation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.PriorCitizenshipID != 0 {
		entity.PriorCitizenship = &Country{ID: entity.PriorCitizenshipID}
		if _, err := entity.PriorCitizenship.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasAlienRegistrationID != 0 {
		entity.HasAlienRegistration = &Branch{ID: entity.HasAlienRegistrationID}
		if _, err := entity.HasAlienRegistration.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.AlienRegistrationNumberID != 0 {
		entity.AlienRegistrationNumber = &Text{ID: entity.AlienRegistrationNumberID}
		if _, err := entity.AlienRegistrationNumber.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.AlienRegistrationExpirationID != 0 {
		entity.AlienRegistrationExpiration = &DateControl{ID: entity.AlienRegistrationExpirationID}
		if _, err := entity.AlienRegistrationExpiration.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.BasisID != 0 {
		entity.Basis = &Radio{ID: entity.BasisID}
		if _, err := entity.Basis.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.PermanentResidentCardNumberID != 0 {
		entity.PermanentResidentCardNumber = &Text{ID: entity.PermanentResidentCardNumberID}
		if _, err := entity.PermanentResidentCardNumber.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ResidenceStatusID != 0 {
		entity.ResidenceStatus = &Text{ID: entity.ResidenceStatusID}
		if _, err := entity.ResidenceStatus.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// ID returns the entity identifier.
func (entity *CitizenshipStatus) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *CitizenshipStatus) SetID(id int) {
	entity.ID = id
}

func (entity *CitizenshipStatus) Find(context DatabaseService) error {
	context.Find(&CitizenshipStatus{ID: entity.ID}, func(result interface{}) {
		previous := result.(*CitizenshipStatus)
		if entity.CitizenshipStatus == nil {
			entity.CitizenshipStatus = &Radio{}
		}
		entity.CitizenshipStatusID = previous.CitizenshipStatusID
		entity.CitizenshipStatus.ID = previous.CitizenshipStatusID
		if entity.AbroadDocumentation == nil {
			entity.AbroadDocumentation = &Radio{}
		}
		entity.AbroadDocumentationID = previous.AbroadDocumentationID
		entity.AbroadDocumentation.ID = previous.AbroadDocumentationID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
		if entity.DocumentNumber == nil {
			entity.DocumentNumber = &Text{}
		}
		entity.DocumentNumberID = previous.DocumentNumberID
		entity.DocumentNumber.ID = previous.DocumentNumberID
		if entity.DocumentIssued == nil {
			entity.DocumentIssued = &DateControl{}
		}
		entity.DocumentIssuedID = previous.DocumentIssuedID
		entity.DocumentIssued.ID = previous.DocumentIssuedID
		if entity.DocumentName == nil {
			entity.DocumentName = &Name{}
		}
		entity.DocumentNameID = previous.DocumentNameID
		entity.DocumentName.ID = previous.DocumentNameID
		if entity.DocumentExpiration == nil {
			entity.DocumentExpiration = &DateControl{}
		}
		entity.DocumentExpirationID = previous.DocumentExpirationID
		entity.DocumentExpiration.ID = previous.DocumentExpirationID
		if entity.DocumentType == nil {
			entity.DocumentType = &Radio{}
		}
		entity.DocumentTypeID = previous.DocumentTypeID
		entity.DocumentType.ID = previous.DocumentTypeID
		if entity.PlaceIssued == nil {
			entity.PlaceIssued = &Location{}
		}
		entity.PlaceIssuedID = previous.PlaceIssuedID
		entity.PlaceIssued.ID = previous.PlaceIssuedID
		if entity.CertificateNumber == nil {
			entity.CertificateNumber = &Text{}
		}
		entity.CertificateNumberID = previous.CertificateNumberID
		entity.CertificateNumber.ID = previous.CertificateNumberID
		if entity.CertificateIssued == nil {
			entity.CertificateIssued = &DateControl{}
		}
		entity.CertificateIssuedID = previous.CertificateIssuedID
		entity.CertificateIssued.ID = previous.CertificateIssuedID
		if entity.CertificateName == nil {
			entity.CertificateName = &Name{}
		}
		entity.CertificateNameID = previous.CertificateNameID
		entity.CertificateName.ID = previous.CertificateNameID
		if entity.CertificateCourtName == nil {
			entity.CertificateCourtName = &Text{}
		}
		entity.CertificateCourtNameID = previous.CertificateCourtNameID
		entity.CertificateCourtName.ID = previous.CertificateCourtNameID
		if entity.CertificateCourtAddress == nil {
			entity.CertificateCourtAddress = &Location{}
		}
		entity.CertificateCourtAddressID = previous.CertificateCourtAddressID
		entity.CertificateCourtAddress.ID = previous.CertificateCourtAddressID
		if entity.BornOnMilitaryInstallation == nil {
			entity.BornOnMilitaryInstallation = &Branch{}
		}
		entity.BornOnMilitaryInstallationID = previous.BornOnMilitaryInstallationID
		entity.BornOnMilitaryInstallation.ID = previous.BornOnMilitaryInstallationID
		if entity.MilitaryBase == nil {
			entity.MilitaryBase = &Text{}
		}
		entity.MilitaryBaseID = previous.MilitaryBaseID
		entity.MilitaryBase.ID = previous.MilitaryBaseID
		if entity.EntryDate == nil {
			entity.EntryDate = &DateControl{}
		}
		entity.EntryDateID = previous.EntryDateID
		entity.EntryDate.ID = previous.EntryDateID
		if entity.EntryLocation == nil {
			entity.EntryLocation = &Location{}
		}
		entity.EntryLocationID = previous.EntryLocationID
		entity.EntryLocation.ID = previous.EntryLocationID
		if entity.PriorCitizenship == nil {
			entity.PriorCitizenship = &Country{}
		}
		entity.PriorCitizenshipID = previous.PriorCitizenshipID
		entity.PriorCitizenship.ID = previous.PriorCitizenshipID
		if entity.HasAlienRegistration == nil {
			entity.HasAlienRegistration = &Branch{}
		}
		entity.HasAlienRegistrationID = previous.HasAlienRegistrationID
		entity.HasAlienRegistration.ID = previous.HasAlienRegistrationID
		if entity.AlienRegistrationNumber == nil {
			entity.AlienRegistrationNumber = &Text{}
		}
		entity.AlienRegistrationNumberID = previous.AlienRegistrationNumberID
		entity.AlienRegistrationNumber.ID = previous.AlienRegistrationNumberID
		if entity.AlienRegistrationExpiration == nil {
			entity.AlienRegistrationExpiration = &DateControl{}
		}
		entity.AlienRegistrationExpirationID = previous.AlienRegistrationExpirationID
		entity.AlienRegistrationExpiration.ID = previous.AlienRegistrationExpirationID
		if entity.Basis == nil {
			entity.Basis = &Radio{}
		}
		entity.BasisID = previous.BasisID
		entity.Basis.ID = previous.BasisID
		if entity.PermanentResidentCardNumber == nil {
			entity.PermanentResidentCardNumber = &Text{}
		}
		entity.PermanentResidentCardNumberID = previous.PermanentResidentCardNumberID
		entity.PermanentResidentCardNumber.ID = previous.PermanentResidentCardNumberID
		if entity.ResidenceStatus == nil {
			entity.ResidenceStatus = &Text{}
		}
		entity.ResidenceStatusID = previous.ResidenceStatusID
		entity.ResidenceStatus.ID = previous.ResidenceStatusID
	})
	return nil
}

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

// Save will create or update the database.
func (entity *CitizenshipMultiple) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasMultipleID, err := entity.HasMultiple.Save(context, account)
	if err != nil {
		return hasMultipleID, err
	}
	entity.HasMultipleID = hasMultipleID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipMultiple) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasMultiple.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipMultiple) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasMultipleID != 0 {
		entity.HasMultiple = &Branch{ID: entity.HasMultipleID}
		if _, err := entity.HasMultiple.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// ID returns the entity identifier.
func (entity *CitizenshipMultiple) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *CitizenshipMultiple) SetID(id int) {
	entity.ID = id
}

func (entity *CitizenshipMultiple) Find(context DatabaseService) error {
	context.Find(&CitizenshipMultiple{ID: entity.ID}, func(result interface{}) {
		previous := result.(*CitizenshipMultiple)
		if entity.HasMultiple == nil {
			entity.HasMultiple = &Branch{}
		}
		entity.HasMultipleID = previous.HasMultipleID
		entity.HasMultiple.ID = previous.HasMultipleID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}

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

// Save will create or update the database.
func (entity *CitizenshipPassports) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	passportsID, err := entity.Passports.Save(context, account)
	if err != nil {
		return passportsID, err
	}
	entity.PassportsID = passportsID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipPassports) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipPassports) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.PassportsID != 0 {
		entity.Passports = &Collection{ID: entity.PassportsID}
		if _, err := entity.Passports.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// ID returns the entity identifier.
func (entity *CitizenshipPassports) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *CitizenshipPassports) SetID(id int) {
	entity.ID = id
}

func (entity *CitizenshipPassports) Find(context DatabaseService) error {
	context.Find(&CitizenshipPassports{ID: entity.ID}, func(result interface{}) {
		previous := result.(*CitizenshipPassports)
		if entity.Passports == nil {
			entity.Passports = &Collection{}
		}
		entity.PassportsID = previous.PassportsID
		entity.Passports.ID = previous.PassportsID
	})
	return nil
}

// CitizenshipComments subsection of identification section.
type CitizenshipComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipComments) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Text)

	return err
}

// Marshal to payload structure
func (entity *CitizenshipComments) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("citizenship.comments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipComments) Valid() (bool, error) {
	return entity.Comments.Valid()
}

// Save will create or update the database.
func (entity *CitizenshipComments) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	commentsID, err := entity.Comments.Save(context, account)
	if err != nil {
		return commentsID, err
	}
	entity.CommentsID = commentsID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipComments) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipComments) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		entity.Comments = &Text{ID: entity.CommentsID}
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *CitizenshipComments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *CitizenshipComments) SetID(id int) {
	entity.ID = id
}

func (entity *CitizenshipComments) Find(context DatabaseService) error {
	context.Find(&CitizenshipComments{ID: entity.ID}, func(result interface{}) {
		previous := result.(*CitizenshipComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.Comments.ID = previous.CommentsID
	})
	return nil
}
