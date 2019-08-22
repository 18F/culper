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

	AdditionalComments *SubmissionAdditionalComments `json:"-" sql:"-"`
	General            *SubmissionGeneral            `json:"-" sql:"-"`
	Medical            *SubmissionMedical            `json:"-" sql:"-"`
	Credit             *SubmissionCredit             `json:"-" sql:"-"`
	Attachments        *SubmissionAttachments        `json:"-" sql:"-"`
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

// SubmissionAdditionalComments represents the payload for the submission additional comments section.
type SubmissionAdditionalComments struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	Signature *Signature `json:"-" sql:"-"`
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

// SubmissionGeneral represents the payload for the submission general release section.
type SubmissionGeneral struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	Signature *Signature `json:"-" sql:"-"`
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

// SubmissionMedical represents the payload for the submission medical release section.
type SubmissionMedical struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	Signature *Signature `json:"-" sql:"-"`
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

// SubmissionCredit represents the payload for the submission credit release section.
type SubmissionCredit struct {
	PayloadSignature Payload `json:"Signature" sql:"-"`

	Signature *Signature `json:"-" sql:"-"`
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

// SubmissionAttachments represents the payload for the submission attachments section.
type SubmissionAttachments struct {
	PayloadMethod Payload `json:"Method" sql:"-"`

	Method *Text `json:"-" sql:"-"`
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
