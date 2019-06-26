package api

import (
	"encoding/json"
)

// PsychologicalCompetence represents the payload for the psychological competence section.
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

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalCompetence) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	isIncompetent, err := entity.PayloadIsIncompetent.Entity()
	if err != nil {
		return err
	}
	entity.IsIncompetent = isIncompetent.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *PsychologicalCompetence) Marshal() Payload {
	if entity.IsIncompetent != nil {
		entity.PayloadIsIncompetent = entity.IsIncompetent.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("psychological.competence", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalCompetence) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.IsIncompetent.Valid(); !ok {
		stack.Append("PsychologicalCompetence", err)
	}

	if entity.IsIncompetent.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("PsychologicalCompetence", err)
		}
	}

	return !stack.HasErrors(), stack
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *PsychologicalCompetence) ClearNoBranches() error {
	entity.IsIncompetent.ClearNo()

	nestedErr := entity.List.ClearNestedHasNo("Appeals")
	if nestedErr != nil {
		return nestedErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// PsychologicalConsultations represents the payload for the psychological consultations section.
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

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalConsultations) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	consulted, err := entity.PayloadConsulted.Entity()
	if err != nil {
		return err
	}
	entity.Consulted = consulted.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *PsychologicalConsultations) Marshal() Payload {
	if entity.Consulted != nil {
		entity.PayloadConsulted = entity.Consulted.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("psychological.consultations", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalConsultations) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Consulted.Valid(); !ok {
		stack.Append("PsychologicalConsultations", err)
	}

	if entity.Consulted.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("PsychologicalConsultations", err)
		}
	}

	return !stack.HasErrors(), stack
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *PsychologicalConsultations) ClearNoBranches() error {
	entity.Consulted.ClearNo()

	nestedErr := entity.List.ClearNestedHasNo("Appeals")
	if nestedErr != nil {
		return nestedErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// PsychologicalDiagnoses represents the payload for the psychological diagnosis section.
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

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalDiagnoses) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	diagnosed, err := entity.PayloadDiagnosed.Entity()
	if err != nil {
		return err
	}
	entity.Diagnosed = diagnosed.(*Branch)

	didNotConsult, err := entity.PayloadDidNotConsult.Entity()
	if err != nil {
		return err
	}
	entity.DidNotConsult = didNotConsult.(*Branch)

	diagnosisList, err := entity.PayloadDiagnosisList.Entity()
	if err != nil {
		return err
	}
	entity.DiagnosisList = diagnosisList.(*Collection)

	inTreatment, err := entity.PayloadInTreatment.Entity()
	if err != nil {
		return err
	}
	entity.InTreatment = inTreatment.(*Branch)

	treatmentList, err := entity.PayloadTreatmentList.Entity()
	if err != nil {
		return err
	}
	entity.TreatmentList = treatmentList.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *PsychologicalDiagnoses) Marshal() Payload {
	if entity.Diagnosed != nil {
		entity.PayloadDiagnosed = entity.Diagnosed.Marshal()
	}
	if entity.DidNotConsult != nil {
		entity.PayloadDidNotConsult = entity.DidNotConsult.Marshal()
	}
	if entity.DiagnosisList != nil {
		entity.PayloadDiagnosisList = entity.DiagnosisList.Marshal()
	}
	if entity.InTreatment != nil {
		entity.PayloadInTreatment = entity.InTreatment.Marshal()
	}
	if entity.TreatmentList != nil {
		entity.PayloadTreatmentList = entity.TreatmentList.Marshal()
	}
	return MarshalPayloadEntity("psychological.diagnoses", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalDiagnoses) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Diagnosed.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if entity.Diagnosed.Value == "Yes" {
		if ok, err := entity.DiagnosisList.Valid(); !ok {
			stack.Append("PsychologicalDiagnoses", err)
		}
	}

	if ok, err := entity.DidNotConsult.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if ok, err := entity.InTreatment.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if entity.InTreatment.Value == "Yes" {
		if ok, err := entity.TreatmentList.Valid(); !ok {
			stack.Append("PsychologicalDiagnoses", err)
		}
	}

	return !stack.HasErrors(), stack
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *PsychologicalDiagnoses) ClearNoBranches() error {
	entity.Diagnosed.ClearNo()
	entity.DiagnosisList.ClearBranchNo()
	entity.DidNotConsult.ClearNo()
	entity.InTreatment.ClearNo()
	entity.TreatmentList.ClearBranchNo()
	return nil
}

// PsychologicalHospitalizations represents the payload for the psychological hospitalizations section.
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

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalHospitalizations) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hospitalized, err := entity.PayloadHospitalized.Entity()
	if err != nil {
		return err
	}
	entity.Hospitalized = hospitalized.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *PsychologicalHospitalizations) Marshal() Payload {
	if entity.Hospitalized != nil {
		entity.PayloadHospitalized = entity.Hospitalized.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("psychological.hospitalizations", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalHospitalizations) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Hospitalized.Valid(); !ok {
		stack.Append("PsychologicalHospitalizations", err)
	}

	if entity.Hospitalized.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("PsychologicalHospitalizations", err)
		}
	}

	return !stack.HasErrors(), stack
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *PsychologicalHospitalizations) ClearNoBranches() error {
	entity.Hospitalized.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// PsychologicalExisting represents the payload for the psychological existing conditions section.
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

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalExisting) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasCondition, err := entity.PayloadHasCondition.Entity()
	if err != nil {
		return err
	}
	entity.HasCondition = hasCondition.(*Branch)

	receivedTreatment, err := entity.PayloadReceivedTreatment.Entity()
	if err != nil {
		return err
	}
	entity.ReceivedTreatment = receivedTreatment.(*Radio)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	treatmentList, err := entity.PayloadTreatmentList.Entity()
	if err != nil {
		return err
	}
	entity.TreatmentList = treatmentList.(*Collection)

	didNotFollow, err := entity.PayloadDidNotFollow.Entity()
	if err != nil {
		return err
	}
	entity.DidNotFollow = didNotFollow.(*Branch)

	didNotFollowExplanation, err := entity.PayloadDidNotFollowExplanation.Entity()
	if err != nil {
		return err
	}
	entity.DidNotFollowExplanation = didNotFollowExplanation.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *PsychologicalExisting) Marshal() Payload {
	if entity.HasCondition != nil {
		entity.PayloadHasCondition = entity.HasCondition.Marshal()
	}
	if entity.ReceivedTreatment != nil {
		entity.PayloadReceivedTreatment = entity.ReceivedTreatment.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	if entity.TreatmentList != nil {
		entity.PayloadTreatmentList = entity.TreatmentList.Marshal()
	}
	if entity.DidNotFollow != nil {
		entity.PayloadDidNotFollow = entity.DidNotFollow.Marshal()
	}
	if entity.DidNotFollowExplanation != nil {
		entity.PayloadDidNotFollowExplanation = entity.DidNotFollowExplanation.Marshal()
	}
	return MarshalPayloadEntity("psychological.conditions", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalExisting) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.HasCondition.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if entity.HasCondition.Value == "No" {
		return !stack.HasErrors(), stack
	}

	if ok, err := entity.ReceivedTreatment.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if entity.ReceivedTreatment.Value == "Yes" {
		if ok, err := entity.TreatmentList.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	} else if entity.ReceivedTreatment.Value == "No" {
		if ok, err := entity.Explanation.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	}

	if ok, err := entity.DidNotFollow.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if entity.DidNotFollow.Value == "Yes" {
		if ok, err := entity.DidNotFollowExplanation.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	}

	return !stack.HasErrors(), stack
}
