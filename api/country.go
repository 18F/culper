package api

import "encoding/json"

// Country is a basic input.
type Country struct {
	ID       int      `json:"-"`
	Value    []string `json:"value" pg:",array"`
	Comments string   `json:"comments,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Country) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Country) Marshal() Payload {
	return MarshalPayloadEntity("country", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Country) Valid() (bool, error) {
	var stack ErrorStack

	if len(entity.Value) == 0 {
		stack.Append("Country", ErrFieldRequired{"Country is required"})
	}

	return !stack.HasErrors(), stack
}

// Save the country to data storage.
func (entity *Country) Save(context DatabaseService, account int) (int, error) {
	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the country from data storage.
func (entity *Country) Delete(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the country from data storage.
func (entity *Country) Get(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Country) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Country) SetID(id int) {
	entity.ID = id
}

// Find is not used for countries. Please use the `Get` method.
func (entity *Country) Find(context DatabaseService) error {
	return nil
}
