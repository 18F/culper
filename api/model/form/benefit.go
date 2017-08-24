package form

import "encoding/json"

type Benefit struct {
	Begin                Payload `json:"Begin,omitempty"`
	End                  Payload `json:"End,omitempty"`
	Frequency            Payload `json:"Frequency,omitempty"`
	OtherFrequency       Payload `json:"OtherFrequency,omitempty"`
	Received             Payload `json:"Received,omitempty"`
	Country              Payload
	Value                Payload
	ValueEstimated       Payload
	Reason               Payload
	Obligated            Payload
	ObligatedExplanation Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *Benefit) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
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

	o, err := entity.Obligated.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := o.Valid(); !ok {
		return false, err
	}

	if o.(*Branch).Value == "Yes" {
		if ok, err := entity.ObligatedExplanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}
