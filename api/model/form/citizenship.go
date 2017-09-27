package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
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
	CitizenshipStatusID           int `json:"-"`
	AbroadDocumentationID         int `json:"-"`
	ExplanationID                 int `json:"-"`
	DocumentNumberID              int `json:"-"`
	DocumentIssuedID              int `json:"-"`
	DocumentNameID                int `json:"-"`
	DocumentExpirationID          int `json:"-"`
	DocumentTypeID                int `json:"-"`
	PlaceIssuedID                 int `json:"-"`
	CertificateNumberID           int `json:"-"`
	CertificateIssuedID           int `json:"-"`
	CertificateNameID             int `json:"-"`
	CertificateCourtNameID        int `json:"-"`
	CertificateCourtAddressID     int `json:"-"`
	BornOnMilitaryInstallationID  int `json:"-"`
	MilitaryBaseID                int `json:"-"`
	EntryDateID                   int `json:"-"`
	EntryLocationID               int `json:"-"`
	PriorCitizenshipID            int `json:"-"`
	HasAlienRegistrationID        int `json:"-"`
	AlienRegistrationNumberID     int `json:"-"`
	AlienRegistrationExpirationID int `json:"-"`
	BasisID                       int `json:"-"`
	PermanentResidentCardNumberID int `json:"-"`
	ResidenceStatusID             int `json:"-"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipStatus) Valid() (bool, error) {
	var stack model.ErrorStack

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
func (entity *CitizenshipStatus) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

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

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipStatus) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
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

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *CitizenshipStatus) Get(context *db.DatabaseContext, account int) (int, error) {
	return 0, nil
}

type CitizenshipMultiple struct {
	PayloadHasMultiple Payload `json:"HasMultiple" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasMultiple *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasMultipleID int `json:"-"`
	ListID        int `json:"-"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipMultiple) Valid() (bool, error) {
	var stack model.ErrorStack

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
func (entity *CitizenshipMultiple) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
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

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipMultiple) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasMultiple.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
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
func (entity *CitizenshipMultiple) Get(context *db.DatabaseContext, account int) (int, error) {
	return 0, nil
}

type CitizenshipPassports struct {
	PayloadPassports Payload `json:"Passports" sql:"-"`

	// Validator specific fields
	Passports *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	PassportsID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CitizenshipPassports) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	passports, err := entity.PayloadPassports.Entity()
	if err != nil {
		return err
	}
	entity.Passports = passports.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *CitizenshipPassports) Valid() (bool, error) {
	return entity.Passports.Valid()
}

// Save will create or update the database.
func (entity *CitizenshipPassports) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	passportsID, err := entity.Passports.Save(context, account)
	if err != nil {
		return passportsID, err
	}
	entity.PassportsID = passportsID

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *CitizenshipPassports) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Passports.Delete(context, account); err != nil {
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
func (entity *CitizenshipPassports) Get(context *db.DatabaseContext, account int) (int, error) {
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
		if _, err := entity.Passports.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}
