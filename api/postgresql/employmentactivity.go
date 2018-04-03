package postgresql

import (
	"encoding/json"
	"strings"
)

// Unmarshal bytes in to the entity properties.
func (entity *EmploymentActivity) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *EmploymentActivity) Marshal() Payload {
	return MarshalPayloadEntity("employmentactivity", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *EmploymentActivity) Valid() (bool, error) {
	var stack model.ErrorStack

	v := strings.TrimSpace(string(entity.Value))
	if v == "" {
		stack.Append("EmploymentActivity", model.ErrFieldRequired{"Value is required"})
	}

	if v == "Other" {
		if strings.TrimSpace(string(entity.OtherExplanation)) == "" {
			stack.Append("EmploymentActivity", model.ErrFieldRequired{"Other explanation is required"})
		}
	}

	return !stack.HasErrors(), stack
}

func (entity *EmploymentActivity) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *EmploymentActivity) Delete(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *EmploymentActivity) Get(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// ID returns the entity identifier.
func (entity *EmploymentActivity) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *EmploymentActivity) SetID(id int) {
	entity.ID = id
}
