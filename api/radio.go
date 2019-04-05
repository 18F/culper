package api

import "encoding/json"

// Radio is a basic input.
type Radio struct {
	ID      int    `json:"-"`
	Value   string `json:"value"`
	Checked bool   `json:"checked,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Radio) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Radio) Marshal() Payload {
	return MarshalPayloadEntity("radio", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Radio) Valid() (bool, error) {
	return true, nil
}

// Save the radio to data storage.
func (entity *Radio) Save(context DatabaseService, account int) (int, error) {
	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the radio from data storage.
func (entity *Radio) Delete(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the radio from data storage.
func (entity *Radio) Get(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Radio) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Radio) SetID(id int) {
	entity.ID = id
}

// Find is not used for radios. Please use the `Get` method.
func (entity *Radio) Find(context DatabaseService) error {
	return nil
}
