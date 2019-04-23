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

// Save will create or update the database.
func (entity *Benefit) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.PayloadBegin.Type != "" {
		beginID, err := entity.Begin.Save(context, account)
		if err != nil {
			return beginID, err
		}
		entity.BeginID = beginID
	}

	if entity.PayloadEnd.Type != "" {
		endID, err := entity.End.Save(context, account)
		if err != nil {
			return endID, err
		}
		entity.EndID = endID
	}

	if entity.PayloadFrequency.Type != "" {
		frequencyID, err := entity.Frequency.Save(context, account)
		if err != nil {
			return frequencyID, err
		}
		entity.FrequencyID = frequencyID
	}

	if entity.PayloadOtherFrequency.Type != "" {
		otherFrequencyID, err := entity.OtherFrequency.Save(context, account)
		if err != nil {
			return otherFrequencyID, err
		}
		entity.OtherFrequencyID = otherFrequencyID
	}

	if entity.PayloadOtherFrequencyTypeExplanation.Type != "" {
		otherFrequencyTypeExplanationID, err := entity.OtherFrequencyTypeExplanation.Save(context, account)
		if err != nil {
			return otherFrequencyTypeExplanationID, err
		}
		entity.OtherFrequencyTypeExplanationID = otherFrequencyTypeExplanationID
	}

	if entity.PayloadReceived.Type != "" {
		receivedID, err := entity.Received.Save(context, account)
		if err != nil {
			return receivedID, err
		}
		entity.ReceivedID = receivedID
	}

	countryID, err := entity.Country.Save(context, account)
	if err != nil {
		return countryID, err
	}
	entity.CountryID = countryID

	valueID, err := entity.Value.Save(context, account)
	if err != nil {
		return valueID, err
	}
	entity.ValueID = valueID

	valueEstimatedID, err := entity.ValueEstimated.Save(context, account)
	if err != nil {
		return valueEstimatedID, err
	}
	entity.ValueEstimatedID = valueEstimatedID

	reasonID, err := entity.Reason.Save(context, account)
	if err != nil {
		return reasonID, err
	}
	entity.ReasonID = reasonID

	obligatedID, err := entity.Obligated.Save(context, account)
	if err != nil {
		return obligatedID, err
	}
	entity.ObligatedID = obligatedID

	obligatedExplanationID, err := entity.ObligatedExplanation.Save(context, account)
	if err != nil {
		return obligatedExplanationID, err
	}
	entity.ObligatedExplanationID = obligatedExplanationID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *Benefit) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.BeginID != 0 {
		if _, err := entity.Begin.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EndID != 0 {
		if _, err := entity.End.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.FrequencyID != 0 {
		if _, err := entity.Frequency.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.OtherFrequencyID != 0 {
		if _, err := entity.OtherFrequency.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.OtherFrequencyTypeExplanationID != 0 {
		if _, err := entity.OtherFrequencyTypeExplanation.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ReceivedID != 0 {
		if _, err := entity.Received.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Country.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Value.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ValueEstimated.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Reason.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Obligated.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ObligatedExplanation.Delete(context, account); err != nil {
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
func (entity *Benefit) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.BeginID != 0 {
		if _, err := entity.Begin.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EndID != 0 {
		if _, err := entity.End.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.FrequencyID != 0 {
		if _, err := entity.Frequency.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.OtherFrequencyID != 0 {
		if _, err := entity.OtherFrequency.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.OtherFrequencyTypeExplanationID != 0 {
		if _, err := entity.OtherFrequencyTypeExplanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ReceivedID != 0 {
		if _, err := entity.Received.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CountryID != 0 {
		if _, err := entity.Country.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ValueID != 0 {
		if _, err := entity.Value.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ValueEstimatedID != 0 {
		if _, err := entity.ValueEstimated.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ReasonID != 0 {
		if _, err := entity.Reason.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ObligatedID != 0 {
		if _, err := entity.Obligated.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ObligatedExplanationID != 0 {
		if _, err := entity.ObligatedExplanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Benefit) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Benefit) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *Benefit) Find(context DatabaseService) error {
	context.Find(&Benefit{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*Benefit)
		if entity.Begin == nil {
			entity.Begin = &DateControl{}
		}
		entity.Begin.ID = previous.BeginID
		entity.BeginID = previous.BeginID
		if entity.End == nil {
			entity.End = &DateControl{}
		}
		entity.End.ID = previous.EndID
		entity.EndID = previous.EndID
		if entity.Frequency == nil {
			entity.Frequency = &Radio{}
		}
		entity.Frequency.ID = previous.FrequencyID
		entity.FrequencyID = previous.FrequencyID
		if entity.OtherFrequency == nil {
			entity.OtherFrequency = &Textarea{}
		}
		entity.OtherFrequency.ID = previous.OtherFrequencyID
		entity.OtherFrequencyID = previous.OtherFrequencyID
		if entity.OtherFrequencyTypeExplanation == nil {
			entity.OtherFrequencyTypeExplanation = &Textarea{}
		}
		entity.OtherFrequencyTypeExplanation.ID = previous.OtherFrequencyTypeExplanationID
		entity.OtherFrequencyTypeExplanationID = previous.OtherFrequencyTypeExplanationID
		if entity.Received == nil {
			entity.Received = &DateControl{}
		}
		entity.Received.ID = previous.ReceivedID
		entity.ReceivedID = previous.ReceivedID
		if entity.Country == nil {
			entity.Country = &Country{}
		}
		entity.Country.ID = previous.CountryID
		entity.CountryID = previous.CountryID
		if entity.Value == nil {
			entity.Value = &Number{}
		}
		entity.Value.ID = previous.ValueID
		entity.ValueID = previous.ValueID
		if entity.ValueEstimated == nil {
			entity.ValueEstimated = &Checkbox{}
		}
		entity.ValueEstimated.ID = previous.ValueEstimatedID
		entity.ValueEstimatedID = previous.ValueEstimatedID
		if entity.Reason == nil {
			entity.Reason = &Textarea{}
		}
		entity.Reason.ID = previous.ReasonID
		entity.ReasonID = previous.ReasonID
		if entity.Obligated == nil {
			entity.Obligated = &Branch{}
		}
		entity.Obligated.ID = previous.ObligatedID
		entity.ObligatedID = previous.ObligatedID
		if entity.ObligatedExplanation == nil {
			entity.ObligatedExplanation = &Textarea{}
		}
		entity.ObligatedExplanation.ID = previous.ObligatedExplanationID
		entity.ObligatedExplanationID = previous.ObligatedExplanationID
	})

	return nil
}
