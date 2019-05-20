package api

import (
	"encoding/json"
)

// Submission represents the payload for the submission section.
type Submission struct {
	PayloadAdditionalComments Payload `json:"AdditionalComments" sql:"-"`
	PayloadGeneral            Payload `json:"General" sql:"-"`
	PayloadMedical            Payload `json:"Medical" sql:"-"`
	PayloadCredit             Payload `json:"Credit" sql:"-"`
	PayloadAttachments        Payload `json:"Attachments" sql:"-"`

	// Validator specific fields
	AdditionalComments *SubmissionAdditionalComments `json:"-" sql:"-"`
	General            *SubmissionGeneral            `json:"-" sql:"-"`
	Medical            *SubmissionMedical            `json:"-" sql:"-"`
	Credit             *SubmissionCredit             `json:"-" sql:"-"`
	Attachments        *SubmissionAttachments        `json:"-" sql:"-"`

	// Persister specific fields
	ID                   int    `json:"-"`
	AdditionalCommentsID int    `json:"-"`
	GeneralID            int    `json:"-"`
	MedicalID            int    `json:"-"`
	CreditID             int    `json:"-"`
	AttachmentsID        int    `json:"-"`
	Hash                 string `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Submission) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	additionalComments, err := entity.PayloadAdditionalComments.Entity()
	if err != nil {
		return err
	}
	entity.AdditionalComments = additionalComments.(*SubmissionAdditionalComments)

	general, err := entity.PayloadGeneral.Entity()
	if err != nil {
		return err
	}
	entity.General = general.(*SubmissionGeneral)

	medical, err := entity.PayloadMedical.Entity()
	if err != nil {
		return err
	}
	entity.Medical = medical.(*SubmissionMedical)

	credit, err := entity.PayloadCredit.Entity()
	if err != nil {
		return err
	}
	entity.Credit = credit.(*SubmissionCredit)

	attachments, err := entity.PayloadAttachments.Entity()
	if err != nil {
		return err
	}
	entity.Attachments = attachments.(*SubmissionAttachments)

	return err
}

// Marshal to payload structure
func (entity *Submission) Marshal() Payload {
	if entity.AdditionalComments != nil {
		entity.PayloadAdditionalComments = entity.AdditionalComments.Marshal()
	}
	if entity.General != nil {
		entity.PayloadGeneral = entity.General.Marshal()
	}
	if entity.Medical != nil {
		entity.PayloadMedical = entity.Medical.Marshal()
	}
	if entity.Credit != nil {
		entity.PayloadCredit = entity.Credit.Marshal()
	}
	if entity.Attachments != nil {
		entity.PayloadAttachments = entity.Attachments.Marshal()
	}
	return MarshalPayloadEntity("submission.releases", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Submission) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.AdditionalComments.Valid(); !ok {
		stack.Append("AdditionalComments", err)
	}
	if ok, err := entity.General.Valid(); !ok {
		stack.Append("General", err)
	}
	if ok, err := entity.Medical.Valid(); !ok {
		stack.Append("Medical", err)
	}
	if ok, err := entity.Credit.Valid(); !ok {
		stack.Append("Credit", err)
	}
	if ok, err := entity.Attachments.Valid(); !ok {
		stack.Append("Attachments", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *Submission) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account
	hash, err := Hash(context, account)
	if err != nil {
		return -1, err
	}
	entity.Hash = hash

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	additionalCommentsID, err := entity.AdditionalComments.Save(context, account)
	if err != nil {
		return additionalCommentsID, err
	}
	entity.AdditionalCommentsID = additionalCommentsID

	generalID, err := entity.General.Save(context, account)
	if err != nil {
		return generalID, err
	}
	entity.GeneralID = generalID

	medicalID, err := entity.Medical.Save(context, account)
	if err != nil {
		return medicalID, err
	}
	entity.MedicalID = medicalID

	creditID, err := entity.Credit.Save(context, account)
	if err != nil {
		return creditID, err
	}
	entity.CreditID = creditID

	attachmentsID, err := entity.Attachments.Save(context, account)
	if err != nil {
		return attachmentsID, err
	}
	entity.AttachmentsID = attachmentsID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *Submission) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.AdditionalComments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.General.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Medical.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Credit.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Attachments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *Submission) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.AdditionalCommentsID != 0 {
		entity.AdditionalComments = &SubmissionAdditionalComments{ID: entity.AdditionalCommentsID}
		if _, err := entity.AdditionalComments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.GeneralID != 0 {
		entity.General = &SubmissionGeneral{ID: entity.GeneralID}
		if _, err := entity.General.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.MedicalID != 0 {
		entity.Medical = &SubmissionMedical{ID: entity.MedicalID}
		if _, err := entity.Medical.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CreditID != 0 {
		entity.Credit = &SubmissionCredit{ID: entity.CreditID}
		if _, err := entity.Credit.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.AttachmentsID != 0 {
		entity.Attachments = &SubmissionAttachments{ID: entity.AttachmentsID}
		if _, err := entity.Attachments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Submission) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Submission) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *Submission) Find(context DatabaseService) error {
	context.Find(&Submission{ID: entity.ID}, func(result interface{}) {
		previous := result.(*Submission)
		if entity.AdditionalComments == nil {
			entity.AdditionalComments = &SubmissionAdditionalComments{}
		}
		entity.AdditionalCommentsID = previous.AdditionalCommentsID
		entity.AdditionalComments.ID = previous.AdditionalCommentsID
		if entity.General == nil {
			entity.General = &SubmissionGeneral{}
		}
		entity.GeneralID = previous.GeneralID
		entity.General.ID = previous.GeneralID
		if entity.Medical == nil {
			entity.Medical = &SubmissionMedical{}
		}
		entity.MedicalID = previous.MedicalID
		entity.Medical.ID = previous.MedicalID
		if entity.Credit == nil {
			entity.Credit = &SubmissionCredit{}
		}
		entity.CreditID = previous.CreditID
		entity.Credit.ID = previous.CreditID
		if entity.Attachments == nil {
			entity.Attachments = &SubmissionAttachments{}
		}
		entity.AttachmentsID = previous.AttachmentsID
		entity.Attachments.ID = previous.AttachmentsID
	})
	return nil
}

// SubmissionAdditionalComments represents the payload for the submission additional comments section.
type SubmissionAdditionalComments struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubmissionAdditionalComments) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	signature, err := entity.PayloadSignature.Entity()
	if err != nil {
		return err
	}
	entity.Signature = signature.(*Signature)

	return err
}

// Marshal to payload structure
func (entity *SubmissionAdditionalComments) Marshal() Payload {
	if entity.Signature != nil {
		entity.PayloadSignature = entity.Signature.Marshal()
	}
	return MarshalPayloadEntity("submission.additionalcomments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubmissionAdditionalComments) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Signature.Valid(); !ok {
		stack.Append("Signature", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubmissionAdditionalComments) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	signatureID, err := entity.Signature.Save(context, account)
	if err != nil {
		return signatureID, err
	}
	entity.SignatureID = signatureID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubmissionAdditionalComments) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Signature.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubmissionAdditionalComments) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.SignatureID != 0 {
		entity.Signature = &Signature{ID: entity.SignatureID}
		if _, err := entity.Signature.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *SubmissionAdditionalComments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubmissionAdditionalComments) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *SubmissionAdditionalComments) Find(context DatabaseService) error {
	context.Find(&SubmissionAdditionalComments{ID: entity.ID}, func(result interface{}) {
		previous := result.(*SubmissionAdditionalComments)
		if entity.Signature == nil {
			entity.Signature = &Signature{}
		}
		entity.SignatureID = previous.SignatureID
		entity.Signature.ID = previous.SignatureID
	})
	return nil
}

// SubmissionGeneral represents the payload for the submission general release section.
type SubmissionGeneral struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubmissionGeneral) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	signature, err := entity.PayloadSignature.Entity()
	if err != nil {
		return err
	}
	entity.Signature = signature.(*Signature)

	return err
}

// Marshal to payload structure
func (entity *SubmissionGeneral) Marshal() Payload {
	if entity.Signature != nil {
		entity.PayloadSignature = entity.Signature.Marshal()
	}
	return MarshalPayloadEntity("submission.general", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubmissionGeneral) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Signature.Valid(); !ok {
		stack.Append("Signature", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubmissionGeneral) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	signatureID, err := entity.Signature.Save(context, account)
	if err != nil {
		return signatureID, err
	}
	entity.SignatureID = signatureID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubmissionGeneral) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Signature.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubmissionGeneral) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.SignatureID != 0 {
		entity.Signature = &Signature{ID: entity.SignatureID}
		if _, err := entity.Signature.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *SubmissionGeneral) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubmissionGeneral) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *SubmissionGeneral) Find(context DatabaseService) error {
	context.Find(&SubmissionGeneral{ID: entity.ID}, func(result interface{}) {
		previous := result.(*SubmissionGeneral)
		if entity.Signature == nil {
			entity.Signature = &Signature{}
		}
		entity.SignatureID = previous.SignatureID
		entity.Signature.ID = previous.SignatureID
	})
	return nil
}

// SubmissionMedical represents the payload for the submission medical release section.
type SubmissionMedical struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubmissionMedical) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	signature, err := entity.PayloadSignature.Entity()
	if err != nil {
		return err
	}
	entity.Signature = signature.(*Signature)

	return err
}

// Marshal to payload structure
func (entity *SubmissionMedical) Marshal() Payload {
	if entity.Signature != nil {
		entity.PayloadSignature = entity.Signature.Marshal()
	}
	return MarshalPayloadEntity("submission.medical", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubmissionMedical) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Signature.Valid(); !ok {
		stack.Append("Signature", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubmissionMedical) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	signatureID, err := entity.Signature.Save(context, account)
	if err != nil {
		return signatureID, err
	}
	entity.SignatureID = signatureID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubmissionMedical) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Signature.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubmissionMedical) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.SignatureID != 0 {
		entity.Signature = &Signature{ID: entity.SignatureID}
		if _, err := entity.Signature.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *SubmissionMedical) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubmissionMedical) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *SubmissionMedical) Find(context DatabaseService) error {
	context.Find(&SubmissionMedical{ID: entity.ID}, func(result interface{}) {
		previous := result.(*SubmissionMedical)
		if entity.Signature == nil {
			entity.Signature = &Signature{}
		}
		entity.SignatureID = previous.SignatureID
		entity.Signature.ID = previous.SignatureID
	})
	return nil
}

// SubmissionCredit represents the payload for the submission credit release section.
type SubmissionCredit struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	// Validator specific fields
	Signature *Signature `json:"-" sql:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	SignatureID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubmissionCredit) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	signature, err := entity.PayloadSignature.Entity()
	if err != nil {
		return err
	}
	entity.Signature = signature.(*Signature)

	return err
}

// Marshal to payload structure
func (entity *SubmissionCredit) Marshal() Payload {
	if entity.Signature != nil {
		entity.PayloadSignature = entity.Signature.Marshal()
	}
	return MarshalPayloadEntity("submission.credit", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubmissionCredit) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Signature.Valid(); !ok {
		stack.Append("Signature", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubmissionCredit) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	signatureID, err := entity.Signature.Save(context, account)
	if err != nil {
		return signatureID, err
	}
	entity.SignatureID = signatureID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubmissionCredit) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Signature.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubmissionCredit) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.SignatureID != 0 {
		entity.Signature = &Signature{ID: entity.SignatureID}
		if _, err := entity.Signature.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *SubmissionCredit) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubmissionCredit) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *SubmissionCredit) Find(context DatabaseService) error {
	context.Find(&SubmissionCredit{ID: entity.ID}, func(result interface{}) {
		previous := result.(*SubmissionCredit)
		if entity.Signature == nil {
			entity.Signature = &Signature{}
		}
		entity.SignatureID = previous.SignatureID
		entity.Signature.ID = previous.SignatureID
	})
	return nil
}

// SubmissionAttachments represents the payload for the submission attachments section.
type SubmissionAttachments struct {
	PayloadMethod Payload `json:"Method" sql:"-"`

	// Validator specific fields
	Method *Text `json:"-" sql:"-"`

	// Persister specific fields
	ID       int `json:"-"`
	MethodID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubmissionAttachments) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	method, err := entity.PayloadMethod.Entity()
	if err != nil {
		return err
	}
	entity.Method = method.(*Text)

	return err
}

// Marshal to payload structure
func (entity *SubmissionAttachments) Marshal() Payload {
	if entity.Method != nil {
		entity.PayloadMethod = entity.Method.Marshal()
	}
	return MarshalPayloadEntity("submission.attachments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubmissionAttachments) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.Method.Valid(); !ok {
		stack.Append("Method", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubmissionAttachments) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	methodID, err := entity.Method.Save(context, account)
	if err != nil {
		return methodID, err
	}
	entity.MethodID = methodID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubmissionAttachments) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Method.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubmissionAttachments) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.MethodID != 0 {
		entity.Method = &Text{ID: entity.MethodID}
		if _, err := entity.Method.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *SubmissionAttachments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubmissionAttachments) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *SubmissionAttachments) Find(context DatabaseService) error {
	context.Find(&SubmissionAttachments{ID: entity.ID}, func(result interface{}) {
		previous := result.(*SubmissionAttachments)
		if entity.Method == nil {
			entity.Method = &Text{}
		}
		entity.MethodID = previous.MethodID
		entity.Method.ID = previous.MethodID
	})
	return nil
}
