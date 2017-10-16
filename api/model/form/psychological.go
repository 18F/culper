package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

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
	entity.PayloadIsIncompetent = entity.IsIncompetent.Marshal()
	entity.PayloadList = entity.List.Marshal()
	return MarshalPayloadEntity("psychological.competence", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalCompetence) Valid() (bool, error) {
	var stack model.ErrorStack

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

// Save will create or update the database.
func (entity *PsychologicalCompetence) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalCompetence{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalCompetence)
		entity.IsIncompetentID = previous.IsIncompetentID
		entity.IsIncompetent.ID = previous.IsIncompetentID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	isIncompetentID, err := entity.IsIncompetent.Save(context, account)
	if err != nil {
		return isIncompetentID, err
	}
	entity.IsIncompetentID = isIncompetentID

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
func (entity *PsychologicalCompetence) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalCompetence{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalCompetence)
		entity.IsIncompetentID = previous.IsIncompetentID
		entity.IsIncompetent.ID = previous.IsIncompetentID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.IsIncompetent.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalCompetence) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.IsIncompetentID != 0 {
		entity.IsIncompetent = &Branch{ID: entity.IsIncompetentID}
		if _, err := entity.IsIncompetent.Get(context, account); err != nil {
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

// GetID returns the entity identifier.
func (entity *PsychologicalCompetence) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *PsychologicalCompetence) SetID(id int) {
	entity.ID = id
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
	entity.PayloadConsulted = entity.Consulted.Marshal()
	entity.PayloadList = entity.List.Marshal()
	return MarshalPayloadEntity("psychological.consultations", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalConsultations) Valid() (bool, error) {
	var stack model.ErrorStack

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

// Save will create or update the database.
func (entity *PsychologicalConsultations) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalConsultations{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalConsultations)
		entity.ConsultedID = previous.ConsultedID
		entity.Consulted.ID = previous.ConsultedID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	consultedID, err := entity.Consulted.Save(context, account)
	if err != nil {
		return consultedID, err
	}
	entity.ConsultedID = consultedID

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
func (entity *PsychologicalConsultations) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalConsultations{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalConsultations)
		entity.ConsultedID = previous.ConsultedID
		entity.Consulted.ID = previous.ConsultedID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Consulted.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalConsultations) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.ConsultedID != 0 {
		entity.Consulted = &Branch{ID: entity.ConsultedID}
		if _, err := entity.Consulted.Get(context, account); err != nil {
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

// GetID returns the entity identifier.
func (entity *PsychologicalConsultations) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *PsychologicalConsultations) SetID(id int) {
	entity.ID = id
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
	entity.PayloadDiagnosed = entity.Diagnosed.Marshal()
	entity.PayloadDidNotConsult = entity.DidNotConsult.Marshal()
	entity.PayloadDiagnosisList = entity.DiagnosisList.Marshal()
	entity.PayloadInTreatment = entity.InTreatment.Marshal()
	entity.PayloadTreatmentList = entity.TreatmentList.Marshal()
	return MarshalPayloadEntity("psychological.diagnoses", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalDiagnoses) Valid() (bool, error) {
	var stack model.ErrorStack

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

// Save will create or update the database.
func (entity *PsychologicalDiagnoses) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalDiagnoses{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalDiagnoses)
		entity.DiagnosedID = previous.DiagnosedID
		entity.Diagnosed.ID = previous.DiagnosedID
		entity.DidNotConsultID = previous.DidNotConsultID
		entity.DidNotConsult.ID = previous.DidNotConsultID
		entity.DiagnosisListID = previous.DiagnosisListID
		entity.DiagnosisList.ID = previous.DiagnosisListID
		entity.InTreatmentID = previous.InTreatmentID
		entity.InTreatment.ID = previous.InTreatmentID
		entity.TreatmentListID = previous.TreatmentListID
		entity.TreatmentList.ID = previous.TreatmentListID
	})

	diagnosedID, err := entity.Diagnosed.Save(context, account)
	if err != nil {
		return diagnosedID, err
	}
	entity.DiagnosedID = diagnosedID

	didNotConsultID, err := entity.DidNotConsult.Save(context, account)
	if err != nil {
		return didNotConsultID, err
	}
	entity.DidNotConsultID = didNotConsultID

	diagnosisListID, err := entity.DiagnosisList.Save(context, account)
	if err != nil {
		return diagnosisListID, err
	}
	entity.DiagnosisListID = diagnosisListID

	inTreatmentID, err := entity.InTreatment.Save(context, account)
	if err != nil {
		return inTreatmentID, err
	}
	entity.InTreatmentID = inTreatmentID

	treatmentListID, err := entity.TreatmentList.Save(context, account)
	if err != nil {
		return treatmentListID, err
	}
	entity.TreatmentListID = treatmentListID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *PsychologicalDiagnoses) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalDiagnoses{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalDiagnoses)
		entity.DiagnosedID = previous.DiagnosedID
		entity.Diagnosed.ID = previous.DiagnosedID
		entity.DidNotConsultID = previous.DidNotConsultID
		entity.DidNotConsult.ID = previous.DidNotConsultID
		entity.DiagnosisListID = previous.DiagnosisListID
		entity.DiagnosisList.ID = previous.DiagnosisListID
		entity.InTreatmentID = previous.InTreatmentID
		entity.InTreatment.ID = previous.InTreatmentID
		entity.TreatmentListID = previous.TreatmentListID
		entity.TreatmentList.ID = previous.TreatmentListID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Diagnosed.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DidNotConsult.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DiagnosisList.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.InTreatment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.TreatmentList.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalDiagnoses) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.DiagnosedID != 0 {
		entity.Diagnosed = &Branch{ID: entity.DiagnosedID}
		if _, err := entity.Diagnosed.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DidNotConsultID != 0 {
		entity.DidNotConsult = &Branch{ID: entity.DidNotConsultID}
		if _, err := entity.DidNotConsult.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DiagnosisListID != 0 {
		entity.DiagnosisList = &Collection{ID: entity.DiagnosisListID}
		if _, err := entity.DiagnosisList.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.InTreatmentID != 0 {
		entity.InTreatment = &Branch{ID: entity.InTreatmentID}
		if _, err := entity.InTreatment.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.TreatmentListID != 0 {
		entity.TreatmentList = &Collection{ID: entity.TreatmentListID}
		if _, err := entity.TreatmentList.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *PsychologicalDiagnoses) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *PsychologicalDiagnoses) SetID(id int) {
	entity.ID = id
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
	entity.PayloadHospitalized = entity.Hospitalized.Marshal()
	entity.PayloadList = entity.List.Marshal()
	return MarshalPayloadEntity("psychological.hospitalizations", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalHospitalizations) Valid() (bool, error) {
	var stack model.ErrorStack

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

// Save will create or update the database.
func (entity *PsychologicalHospitalizations) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalHospitalizations{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalHospitalizations)
		entity.HospitalizedID = previous.HospitalizedID
		entity.Hospitalized.ID = previous.HospitalizedID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hospitalizedID, err := entity.Hospitalized.Save(context, account)
	if err != nil {
		return hospitalizedID, err
	}
	entity.HospitalizedID = hospitalizedID

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
func (entity *PsychologicalHospitalizations) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalHospitalizations{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalHospitalizations)
		entity.HospitalizedID = previous.HospitalizedID
		entity.Hospitalized.ID = previous.HospitalizedID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Hospitalized.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalHospitalizations) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HospitalizedID != 0 {
		entity.Hospitalized = &Branch{ID: entity.HospitalizedID}
		if _, err := entity.Hospitalized.Get(context, account); err != nil {
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

// GetID returns the entity identifier.
func (entity *PsychologicalHospitalizations) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *PsychologicalHospitalizations) SetID(id int) {
	entity.ID = id
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
	entity.PayloadHasCondition = entity.HasCondition.Marshal()
	entity.PayloadReceivedTreatment = entity.ReceivedTreatment.Marshal()
	entity.PayloadExplanation = entity.Explanation.Marshal()
	entity.PayloadTreatmentList = entity.TreatmentList.Marshal()
	entity.PayloadDidNotFollow = entity.DidNotFollow.Marshal()
	entity.PayloadDidNotFollowExplanation = entity.DidNotFollowExplanation.Marshal()
	return MarshalPayloadEntity("psychological.conditions", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalExisting) Valid() (bool, error) {
	var stack model.ErrorStack

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

// Save will create or update the database.
func (entity *PsychologicalExisting) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalExisting{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalExisting)
		entity.HasConditionID = previous.HasConditionID
		entity.HasCondition.ID = previous.HasConditionID
		entity.ReceivedTreatmentID = previous.ReceivedTreatmentID
		entity.ReceivedTreatment.ID = previous.ReceivedTreatmentID
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
		entity.TreatmentListID = previous.TreatmentListID
		entity.TreatmentList.ID = previous.TreatmentListID
		entity.DidNotFollowID = previous.DidNotFollowID
		entity.DidNotFollow.ID = previous.DidNotFollowID
		entity.DidNotFollowExplanationID = previous.DidNotFollowExplanationID
		entity.DidNotFollowExplanation.ID = previous.DidNotFollowExplanationID
	})

	hasConditionID, err := entity.HasCondition.Save(context, account)
	if err != nil {
		return hasConditionID, err
	}
	entity.HasConditionID = hasConditionID

	receivedTreatmentID, err := entity.ReceivedTreatment.Save(context, account)
	if err != nil {
		return receivedTreatmentID, err
	}
	entity.ReceivedTreatmentID = receivedTreatmentID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	treatmentListID, err := entity.TreatmentList.Save(context, account)
	if err != nil {
		return treatmentListID, err
	}
	entity.TreatmentListID = treatmentListID

	didNotFollowID, err := entity.DidNotFollow.Save(context, account)
	if err != nil {
		return didNotFollowID, err
	}
	entity.DidNotFollowID = didNotFollowID

	didNotFollowExplanationID, err := entity.DidNotFollowExplanation.Save(context, account)
	if err != nil {
		return didNotFollowExplanationID, err
	}
	entity.DidNotFollowExplanationID = didNotFollowExplanationID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *PsychologicalExisting) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalExisting{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalExisting)
		entity.HasConditionID = previous.HasConditionID
		entity.HasCondition.ID = previous.HasConditionID
		entity.ReceivedTreatmentID = previous.ReceivedTreatmentID
		entity.ReceivedTreatment.ID = previous.ReceivedTreatmentID
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
		entity.TreatmentListID = previous.TreatmentListID
		entity.TreatmentList.ID = previous.TreatmentListID
		entity.DidNotFollowID = previous.DidNotFollowID
		entity.DidNotFollow.ID = previous.DidNotFollowID
		entity.DidNotFollowExplanationID = previous.DidNotFollowExplanationID
		entity.DidNotFollowExplanation.ID = previous.DidNotFollowExplanationID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasCondition.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ReceivedTreatment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.TreatmentList.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DidNotFollow.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DidNotFollowExplanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalExisting) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasConditionID != 0 {
		entity.HasCondition = &Branch{ID: entity.HasConditionID}
		if _, err := entity.HasCondition.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ReceivedTreatmentID != 0 {
		entity.ReceivedTreatment = &Radio{ID: entity.ReceivedTreatmentID}
		if _, err := entity.ReceivedTreatment.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExplanationID != 0 {
		entity.Explanation = &Textarea{ID: entity.ExplanationID}
		if _, err := entity.Explanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.TreatmentListID != 0 {
		entity.TreatmentList = &Collection{ID: entity.TreatmentListID}
		if _, err := entity.TreatmentList.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DidNotFollowID != 0 {
		entity.DidNotFollow = &Branch{ID: entity.DidNotFollowID}
		if _, err := entity.DidNotFollow.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DidNotFollowExplanationID != 0 {
		entity.DidNotFollowExplanation = &Textarea{ID: entity.DidNotFollowExplanationID}
		if _, err := entity.DidNotFollowExplanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *PsychologicalExisting) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *PsychologicalExisting) SetID(id int) {
	entity.ID = id
}
