package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// Collection represents a structure composed of items in a structured
// format.
type Collection struct {
	PayloadBranch Payload `json:"branch,omitempty" sql:"-"`

	// Validator specific fields
	Branch *Branch           `json:"-"`
	Items  []*CollectionItem `json:"items" sql:"-"`

	// Persister specific fields
	ID        int
	AccountID int64
	BranchID  int
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

func (entity *Collection) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	// Custom errors
	var err error
	if entity.PayloadBranch.Type != "" {
		branchID, err := entity.Branch.Save(context, account)
		if err != nil {
			return 0, err
		}
		entity.BranchID = branchID
	}

	if err = context.CreateTable(&Collection{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	if err != nil {
		return entity.ID, err
	}

	// Iterate through each property in `Items` saving them as we go.
	for _, item := range entity.Items {
		if _, err := item.Save(context, account, entity.ID); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

func (entity *Collection) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Collection{}, options); err != nil {
		return entity.ID, err
	}

	if entity.PayloadBranch.Type != "" {
		if _, err = entity.Branch.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	for _, item := range entity.Items {
		if _, err = item.Delete(context, account, entity.ID); err != nil {
			return entity.ID, err
		}
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *Collection) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Collection{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.BranchID != 0 {
		if _, err := entity.Branch.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	for _, item := range entity.Items {
		if _, err = item.Get(context, account, entity.ID); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
