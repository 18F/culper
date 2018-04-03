package api

type PsychologicalCompetence struct {
	PayloadIsIncompetent Payload `json:"IsIncompetent" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	IsIncompetent *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	IsIncompetentID int `json:"-" pg:", fk:IsIncompetent"`
	ListID          int `json:"-" pg:", fk:List"`
}

type PsychologicalConsultations struct {
	PayloadConsulted Payload `json:"Consulted" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	Consulted *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	ConsultedID int `json:"-" pg:", fk:Consulted"`
	ListID      int `json:"-" pg:", fk:List"`
}

type PsychologicalDiagnoses struct {
	PayloadDiagnosed     Payload `json:"Diagnosed" sql:"-"`
	PayloadDidNotConsult Payload `json:"DidNotConsult" sql:"-"`
	PayloadDiagnosisList Payload `json:"DiagnosisList" sql:"-"`
	PayloadInTreatment   Payload `json:"InTreatment" sql:"-"`
	PayloadTreatmentList Payload `json:"TreatmentList" sql:"-"`

	// Validator specific fields
	Diagnosed     *Branch     `json:"-"`
	DidNotConsult *Branch     `json:"-"`
	DiagnosisList *Collection `json:"-"`
	InTreatment   *Branch     `json:"-"`
	TreatmentList *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	DiagnosedID     int `json:"-" pg:", fk:Diagnosed"`
	DidNotConsultID int `json:"-" pg:", fk:DidNotConsult"`
	DiagnosisListID int `json:"-" pg:", fk:DiagnosisList"`
	InTreatmentID   int `json:"-" pg:", fk:InTreatment"`
	TreatmentListID int `json:"-" pg:", fk:TreatmentList"`
}

type PsychologicalHospitalizations struct {
	PayloadHospitalized Payload `json:"Hospitalized" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	Hospitalized *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HospitalizedID int `json:"-" pg:", fk:Hospitalized"`
	ListID         int `json:"-" pg:", fk:List"`
}

type PsychologicalExisting struct {
	PayloadHasCondition            Payload `json:"HasCondition" sql:"-"`
	PayloadReceivedTreatment       Payload `json:"ReceivedTreatment" sql:"-"`
	PayloadExplanation             Payload `json:"Explanation" sql:"-"`
	PayloadTreatmentList           Payload `json:"TreatmentList" sql:"-"`
	PayloadDidNotFollow            Payload `json:"DidNotFollow" sql:"-"`
	PayloadDidNotFollowExplanation Payload `json:"DidNotFollowExplanation" sql:"-"`

	// Validator specific fields
	HasCondition            *Branch     `json:"-"`
	ReceivedTreatment       *Radio      `json:"-"`
	Explanation             *Textarea   `json:"-"`
	TreatmentList           *Collection `json:"-"`
	DidNotFollow            *Branch     `json:"-"`
	DidNotFollowExplanation *Textarea   `json:"-"`

	// Persister specific fields
	ID                        int `json:"-"`
	HasConditionID            int `json:"-" pg:", fk:HasCondition"`
	ReceivedTreatmentID       int `json:"-" pg:", fk:ReceivedTreatment"`
	ExplanationID             int `json:"-" pg:", fk:Explanation"`
	TreatmentListID           int `json:"-" pg:", fk:TreatmentList"`
	DidNotFollowID            int `json:"-" pg:", fk:DidNotFollow"`
	DidNotFollowExplanationID int `json:"-" pg:", fk:DidNotFollowExplanation"`
}

// PsychologicalComments subsection of identification section.
type PsychologicalComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
