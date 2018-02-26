package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// Collection represents a structure composed of items in a structured
// format.
type Collection struct {
	PayloadBranch Payload `json:"branch" sql:"-"`

	// Validator specific fields
	Branch *Branch           `json:"-" sql:"-"`
	Items  []*CollectionItem `json:"items" sql:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	AccountID int `json:"-"`
	BranchID  int `json:"-" pg:",fk:Branch"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Collection) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}
	if entity.PayloadBranch.Type != "" {
		branch, err := entity.PayloadBranch.Entity()
		if err != nil {
			return err
		}
		entity.Branch = branch.(*Branch)
	}
	return err
}

// Marshal to payload structure
func (entity *Collection) Marshal() Payload {
	if entity.Branch != nil {
		entity.PayloadBranch = entity.Branch.Marshal()
	}
	return MarshalPayloadEntity("collection", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Collection) Valid() (bool, error) {
	var stack model.ErrorStack

	// Iterate through each property in `Items` validating them as we go.
	for _, item := range entity.Items {
		if ok, err := item.Valid(); !ok {
			stack.Append("Item", err)
		}
	}

	// Custom errors
	if entity.PayloadBranch.Type != "" {
		if ok, err := entity.Branch.Valid(); !ok {
			stack.Append("Item", err)
		} else {
			if entity.Branch.Value != "No" {
				stack.Append("Collection", model.ErrFieldInvalid{"Collection branch value is required"})
			}
		}
	}

	return !stack.HasErrors(), stack
}

// Save the Collection entity.
func (entity *Collection) Save(context *db.DatabaseContext, account int) (int, error) {
	// Flush the collection contents prior to saving them.
	// This ensures previously persisted data is not left around.
	copy := &Collection{}
	*copy = *entity
	copy.Delete(context, account)

	entity.AccountID = account

	// If there is a branch payload but the branch if non-existent
	// create one so it may be assigned to.
	if entity.PayloadBranch.Type != "" && entity.Branch == nil {
		entity.Branch = &Branch{}
	}

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Collection{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*Collection)
		// Handle if there is a branch
		if previous.BranchID != 0 {
			if entity.Branch == nil {
				entity.Branch = &Branch{}
			}
			entity.Branch.ID = previous.BranchID
			entity.BranchID = previous.BranchID
		}
	})

	// Custom errors
	if entity.PayloadBranch.Type != "" {
		branchID, err := entity.Branch.Save(context, account)
		if err != nil {
			return 0, err
		}
		entity.BranchID = branchID
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	// Iterate through each property in `Items` saving them as we go.
	for i, item := range entity.Items {
		if _, err := item.Save(context, account, entity.ID, i+1); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete the Collection entity.
func (entity *Collection) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Collection{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*Collection)
		// Handle if there is a branch
		if previous.BranchID != 0 {
			if entity.Branch == nil {
				entity.Branch = &Branch{}
			}
			entity.Branch.ID = previous.BranchID
			entity.BranchID = previous.BranchID
		}
	})

	entity.collectionItemIDs(context)
	for i, item := range entity.Items {
		if _, err := item.Delete(context, account, entity.ID, i+1); err != nil {
			return entity.ID, err
		}
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.PayloadBranch.Type != "" {
		if _, err := entity.Branch.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the Collection entity.
func (entity *Collection) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Collection{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*Collection)
		// Handle if there is a branch
		if previous.BranchID != 0 {
			if entity.Branch == nil {
				entity.Branch = &Branch{}
			}
			entity.Branch.ID = previous.BranchID
			entity.BranchID = previous.BranchID
		}
	})

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.BranchID != 0 {
		if _, err := entity.Branch.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	entity.collectionItemIDs(context)
	for i, item := range entity.Items {
		if _, err := item.Get(context, account, entity.ID, i+1); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Collection) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Collection) SetID(id int) {
	entity.ID = id
}

// collectionItemIDs the Collection item identifiers.
func (entity *Collection) collectionItemIDs(context *db.DatabaseContext) {
	var count int
	context.Database.
		Model(&CollectionItem{}).
		ColumnExpr("max(index) as max").
		Where("id = ?", entity.ID).
		Select(&count)
	entity.Items = []*CollectionItem{}
	for i := 0; i < count; i++ {
		entity.Items = append(entity.Items, &CollectionItem{ID: entity.ID, Index: i + 1})
	}
}
