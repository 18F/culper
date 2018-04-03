package postgresql

import "encoding/json"

// Unmarshal bytes in to the entity properties.
func (entity *ClearanceLevel) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	level, err := entity.PayloadLevel.Entity()
	if err != nil {
		return err
	}
	entity.Level = level.(*Radio)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *ClearanceLevel) Marshal() Payload {
	if entity.Level != nil {
		entity.PayloadLevel = entity.Level.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	return MarshalPayloadEntity("clearancelevel", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ClearanceLevel) Valid() (bool, error) {
	if ok, err := entity.Level.Valid(); !ok {
		return false, err
	}

	if entity.Level.Value == "Other" {
		if ok, err := entity.Explanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}

// Save the ClearanceLevel entity.
func (entity *ClearanceLevel) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&ClearanceLevel{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*ClearanceLevel)
		if entity.Level == nil {
			entity.Level = &Radio{}
		}
		entity.Level.ID = previous.LevelID
		entity.LevelID = previous.LevelID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.Explanation.ID = previous.ExplanationID
		entity.ExplanationID = previous.ExplanationID
	})

	levelID, err := entity.Level.Save(context, account)
	if err != nil {
		return levelID, err
	}
	entity.LevelID = levelID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the ClearanceLevel entity.
func (entity *ClearanceLevel) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&ClearanceLevel{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*ClearanceLevel)
		if entity.Level == nil {
			entity.Level = &Radio{}
		}
		entity.Level.ID = previous.LevelID
		entity.LevelID = previous.LevelID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.Explanation.ID = previous.ExplanationID
		entity.ExplanationID = previous.ExplanationID
	})

	if _, err := entity.Level.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the ClearanceLevel entity.
func (entity *ClearanceLevel) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&ClearanceLevel{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*ClearanceLevel)
		if entity.Level == nil {
			entity.Level = &Radio{}
		}
		entity.Level.ID = previous.LevelID
		entity.LevelID = previous.LevelID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.Explanation.ID = previous.ExplanationID
		entity.ExplanationID = previous.ExplanationID
	})

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.LevelID != 0 {
		if _, err := entity.Level.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExplanationID != 0 {
		if _, err := entity.Explanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *ClearanceLevel) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ClearanceLevel) SetID(id int) {
	entity.ID = id
}
