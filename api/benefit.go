package api

import (
	"encoding/json"
)

// Benefit payload type.
type Benefit struct {
	PayloadBegin                         Payload `json:"Began,omitempty" sql:"-"`
	PayloadEnd                           Payload `json:"End,omitempty" sql:"-"`
	PayloadFrequency                     Payload `json:"Frequency,omitempty" sql:"-"`
	PayloadOtherFrequency                Payload `json:"OtherFrequency,omitempty" sql:"-"`
	PayloadOtherFrequencyTypeExplanation Payload `json:"OtherFrequencyTypeExplanation,omitempty" sql:"-"`
	PayloadReceived                      Payload `json:"Received,omitempty" sql:"-"`
	PayloadCountry                       Payload `json:"Country" sql:"-"`
	PayloadValue                         Payload `json:"Value" sql:"-"`
	PayloadValueEstimated                Payload `json:"ValueEstimated" sql:"-"`
	PayloadReason                        Payload `json:"Reason" sql:"-"`
	PayloadObligated                     Payload `json:"Obligated" sql:"-"`
	PayloadObligatedExplanation          Payload `json:"ObligatedExplanation" sql:"-"`

	// Validator specific fields
	Begin                         *DateControl `json:"-"`
	End                           *DateControl `json:"-"`
	Frequency                     *Radio       `json:"-"`
	OtherFrequency                *Textarea    `json:"-"`
	OtherFrequencyTypeExplanation *Textarea    `json:"-"`
	Received                      *DateControl `json:"-"`
	Country                       *Country     `json:"-"`
	Value                         *Number      `json:"-"`
	ValueEstimated                *Checkbox    `json:"-"`
	Reason                        *Textarea    `json:"-"`
	Obligated                     *Branch      `json:"-"`
	ObligatedExplanation          *Textarea    `json:"-"`

	// Persister specific fields
	ID                              int `json:"-"`
	AccountID                       int `json:"-"`
	BeginID                         int `json:"-" pg:",fk:Begin"`
	EndID                           int `json:"-" pg:",fk:End"`
	FrequencyID                     int `json:"-" pg:",fk:Frequency"`
	OtherFrequencyID                int `json:"-" pg:",fk:OtherFrequency"`
	OtherFrequencyTypeExplanationID int `json:"-" pg:",fk:OtherFrequencyTypeExplanation"`
	ReceivedID                      int `json:"-" pg:",fk:Received"`
	CountryID                       int `json:"-" pg:",fk:Country"`
	ValueID                         int `json:"-" pg:",fk:Value"`
	ValueEstimatedID                int `json:"-" pg:",fk:ValueEstimated"`
	ReasonID                        int `json:"-" pg:",fk:Reason"`
	ObligatedID                     int `json:"-" pg:",fk:Obligated"`
	ObligatedExplanationID          int `json:"-" pg:",fk:ObligatedExplanation"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Benefit) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	if entity.PayloadBegin.Type != "" {
		begin, err := entity.PayloadBegin.Entity()
		if err != nil {
			return err
		}
		entity.Begin = begin.(*DateControl)
	}

	if entity.PayloadEnd.Type != "" {
		end, err := entity.PayloadEnd.Entity()
		if err != nil {
			return err
		}
		entity.End = end.(*DateControl)
	}

	if entity.PayloadFrequency.Type != "" {
		frequency, err := entity.PayloadFrequency.Entity()
		if err != nil {
			return err
		}
		entity.Frequency = frequency.(*Radio)
	}

	if entity.PayloadOtherFrequency.Type != "" {
		otherFrequency, err := entity.PayloadOtherFrequency.Entity()
		if err != nil {
			return err
		}
		entity.OtherFrequency = otherFrequency.(*Textarea)
	}

	if entity.PayloadOtherFrequencyTypeExplanation.Type != "" {
		otherFrequencyTypeExplanation, err := entity.PayloadOtherFrequencyTypeExplanation.Entity()
		if err != nil {
			return err
		}
		entity.OtherFrequencyTypeExplanation = otherFrequencyTypeExplanation.(*Textarea)
	}

	if entity.PayloadReceived.Type != "" {
		received, err := entity.PayloadReceived.Entity()
		if err != nil {
			return err
		}
		entity.Received = received.(*DateControl)
	}

	country, err := entity.PayloadCountry.Entity()
	if err != nil {
		return err
	}
	entity.Country = country.(*Country)

	value, err := entity.PayloadValue.Entity()
	if err != nil {
		return err
	}
	entity.Value = value.(*Number)

	valueEstimated, err := entity.PayloadValueEstimated.Entity()
	if err != nil {
		return err
	}
	entity.ValueEstimated = valueEstimated.(*Checkbox)

	reason, err := entity.PayloadReason.Entity()
	if err != nil {
		return err
	}
	entity.Reason = reason.(*Textarea)

	obligated, err := entity.PayloadObligated.Entity()
	if err != nil {
		return err
	}
	entity.Obligated = obligated.(*Branch)

	obligatedExplanation, err := entity.PayloadObligatedExplanation.Entity()
	if err != nil {
		return err
	}
	entity.ObligatedExplanation = obligatedExplanation.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *Benefit) Marshal() Payload {
	if entity.Begin != nil {
		entity.PayloadBegin = entity.Begin.Marshal()
	}
	if entity.End != nil {
		entity.PayloadEnd = entity.End.Marshal()
	}
	if entity.Frequency != nil {
		entity.PayloadFrequency = entity.Frequency.Marshal()
	}
	if entity.OtherFrequency != nil {
		entity.PayloadOtherFrequency = entity.OtherFrequency.Marshal()
	}
	if entity.OtherFrequencyTypeExplanation != nil {
		entity.PayloadOtherFrequencyTypeExplanation = entity.OtherFrequencyTypeExplanation.Marshal()
	}
	if entity.Received != nil {
		entity.PayloadReceived = entity.Received.Marshal()
	}
	if entity.Country != nil {
		entity.PayloadCountry = entity.Country.Marshal()
	}
	if entity.Value != nil {
		entity.PayloadValue = entity.Value.Marshal()
	}
	if entity.ValueEstimated != nil {
		entity.PayloadValueEstimated = entity.ValueEstimated.Marshal()
	}
	if entity.Reason != nil {
		entity.PayloadReason = entity.Reason.Marshal()
	}
	if entity.Obligated != nil {
		entity.PayloadObligated = entity.Obligated.Marshal()
	}
	if entity.ObligatedExplanation != nil {
		entity.PayloadObligatedExplanation = entity.ObligatedExplanation.Marshal()
	}
	return MarshalPayloadEntity("benefit", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Benefit) Valid() (bool, error) {
	if ok, err := entity.Country.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Value.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Reason.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Obligated.Valid(); !ok {
		return false, err
	}

	if entity.Obligated.Value == "Yes" {
		if ok, err := entity.ObligatedExplanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}
