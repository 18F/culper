package api

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

type CitizenshipPassports struct {
	PayloadPassports Payload `json:"Passports" sql:"-"`

	// Validator specific fields
	Passports *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	PassportsID int `json:"-" pg:", fk:Passports"`
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
