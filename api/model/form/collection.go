package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// Collection represents a structure composed of items in a structured
// format.
type Collection struct {
	PayloadBranch Payload `json:"branch,omitempty" sql:"-"`

	// Validator specific fields
	Branch *Branch           `json:"-"`
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

func (entity *Collection) Save(context *db.DatabaseContext, account int) (int, error) {
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

	// Custom errors
	if entity.PayloadBranch.Type != "" {
		entity.Branch = &Branch{ID: entity.BranchID}
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
	for _, item := range entity.Items {
		if _, err := item.Save(context, account, entity.ID); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *Collection) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.PayloadBranch.Type != "" {
		if _, err := entity.Branch.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	for _, item := range entity.Items {
		if _, err := item.Delete(context, account, entity.ID); err != nil {
			return entity.ID, err
		}
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *Collection) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.BranchID != 0 {
		entity.Branch = &Branch{ID: entity.BranchID}
		if _, err := entity.Branch.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	for _, item := range entity.Items {
		if _, err := item.Get(context, account, entity.ID); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}
