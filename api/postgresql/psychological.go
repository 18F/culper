package postgresql

import "encoding/json"

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
		if entity.IsIncompetent == nil {
			entity.IsIncompetent = &Branch{}
		}
		entity.IsIncompetentID = previous.IsIncompetentID
		entity.IsIncompetent.ID = previous.IsIncompetentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
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
		if entity.IsIncompetent == nil {
			entity.IsIncompetent = &Branch{}
		}
		entity.IsIncompetentID = previous.IsIncompetentID
		entity.IsIncompetent.ID = previous.IsIncompetentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
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
		if entity.Consulted == nil {
			entity.Consulted = &Branch{}
		}
		entity.ConsultedID = previous.ConsultedID
		entity.Consulted.ID = previous.ConsultedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
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
		if entity.Consulted == nil {
			entity.Consulted = &Branch{}
		}
		entity.ConsultedID = previous.ConsultedID
		entity.Consulted.ID = previous.ConsultedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
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
		if entity.Diagnosed == nil {
			entity.Diagnosed = &Branch{}
		}
		entity.DiagnosedID = previous.DiagnosedID
		entity.Diagnosed.ID = previous.DiagnosedID
		if entity.DidNotConsult == nil {
			entity.DidNotConsult = &Branch{}
		}
		entity.DidNotConsultID = previous.DidNotConsultID
		entity.DidNotConsult.ID = previous.DidNotConsultID
		if entity.DiagnosisList == nil {
			entity.DiagnosisList = &Collection{}
		}
		entity.DiagnosisListID = previous.DiagnosisListID
		entity.DiagnosisList.ID = previous.DiagnosisListID
		if entity.InTreatment == nil {
			entity.InTreatment = &Branch{}
		}
		entity.InTreatmentID = previous.InTreatmentID
		entity.InTreatment.ID = previous.InTreatmentID
		if entity.TreatmentList == nil {
			entity.TreatmentList = &Collection{}
		}
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
		if entity.Diagnosed == nil {
			entity.Diagnosed = &Branch{}
		}
		entity.DiagnosedID = previous.DiagnosedID
		entity.Diagnosed.ID = previous.DiagnosedID
		if entity.DidNotConsult == nil {
			entity.DidNotConsult = &Branch{}
		}
		entity.DidNotConsultID = previous.DidNotConsultID
		entity.DidNotConsult.ID = previous.DidNotConsultID
		if entity.DiagnosisList == nil {
			entity.DiagnosisList = &Collection{}
		}
		entity.DiagnosisListID = previous.DiagnosisListID
		entity.DiagnosisList.ID = previous.DiagnosisListID
		if entity.InTreatment == nil {
			entity.InTreatment = &Branch{}
		}
		entity.InTreatmentID = previous.InTreatmentID
		entity.InTreatment.ID = previous.InTreatmentID
		if entity.TreatmentList == nil {
			entity.TreatmentList = &Collection{}
		}
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
		if entity.Hospitalized == nil {
			entity.Hospitalized = &Branch{}
		}
		entity.HospitalizedID = previous.HospitalizedID
		entity.Hospitalized.ID = previous.HospitalizedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
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
		if entity.Hospitalized == nil {
			entity.Hospitalized = &Branch{}
		}
		entity.HospitalizedID = previous.HospitalizedID
		entity.Hospitalized.ID = previous.HospitalizedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
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
		if entity.HasCondition == nil {
			entity.HasCondition = &Branch{}
		}
		entity.HasConditionID = previous.HasConditionID
		entity.HasCondition.ID = previous.HasConditionID
		if entity.ReceivedTreatment == nil {
			entity.ReceivedTreatment = &Radio{}
		}
		entity.ReceivedTreatmentID = previous.ReceivedTreatmentID
		entity.ReceivedTreatment.ID = previous.ReceivedTreatmentID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
		if entity.TreatmentList == nil {
			entity.TreatmentList = &Collection{}
		}
		entity.TreatmentListID = previous.TreatmentListID
		entity.TreatmentList.ID = previous.TreatmentListID
		if entity.DidNotFollow == nil {
			entity.DidNotFollow = &Branch{}
		}
		entity.DidNotFollowID = previous.DidNotFollowID
		entity.DidNotFollow.ID = previous.DidNotFollowID
		if entity.DidNotFollowExplanation == nil {
			entity.DidNotFollowExplanation = &Textarea{}
		}
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
		if entity.HasCondition == nil {
			entity.HasCondition = &Branch{}
		}
		entity.HasConditionID = previous.HasConditionID
		entity.HasCondition.ID = previous.HasConditionID
		if entity.ReceivedTreatment == nil {
			entity.ReceivedTreatment = &Radio{}
		}
		entity.ReceivedTreatmentID = previous.ReceivedTreatmentID
		entity.ReceivedTreatment.ID = previous.ReceivedTreatmentID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
		if entity.TreatmentList == nil {
			entity.TreatmentList = &Collection{}
		}
		entity.TreatmentListID = previous.TreatmentListID
		entity.TreatmentList.ID = previous.TreatmentListID
		if entity.DidNotFollow == nil {
			entity.DidNotFollow = &Branch{}
		}
		entity.DidNotFollowID = previous.DidNotFollowID
		entity.DidNotFollow.ID = previous.DidNotFollowID
		if entity.DidNotFollowExplanation == nil {
			entity.DidNotFollowExplanation = &Textarea{}
		}
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

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalComments) Unmarshal(raw []byte) error {
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
func (entity *PsychologicalComments) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("identification.comments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalComments) Valid() (bool, error) {
	return entity.Comments.Valid()
}

// Save will create or update the database.
func (entity *PsychologicalComments) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalComments{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.Comments.ID = previous.CommentsID
	})

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
func (entity *PsychologicalComments) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&PsychologicalComments{ID: account}, func(result interface{}) {
		previous := result.(*PsychologicalComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.CommentsID = previous.CommentsID
	})

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
func (entity *PsychologicalComments) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *PsychologicalComments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *PsychologicalComments) SetID(id int) {
	entity.ID = id
}
