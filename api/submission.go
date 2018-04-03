package api

type Submission struct {
	PayloadAdditionalComments Payload `json:"AdditionalComments" sql:"-"`
	PayloadGeneral            Payload `json:"General" sql:"-"`
	PayloadMedical            Payload `json:"Medical" sql:"-"`
	PayloadCredit             Payload `json:"Credit" sql:"-"`

	// Validator specific fields
	AdditionalComments *SubmissionAdditionalComments `json:"-" sql:"-"`
	General            *SubmissionGeneral            `json:"-" sql:"-"`
	Medical            *SubmissionMedical            `json:"-" sql:"-"`
	Credit             *SubmissionCredit             `json:"-" sql:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	AdditionalCommentsID int `json:"-"`
	GeneralID            int `json:"-"`
	MedicalID            int `json:"-"`
	CreditID             int `json:"-"`
}

type SubmissionAdditionalComments struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}

type SubmissionGeneral struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}

type SubmissionMedical struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}

type SubmissionCredit struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}
