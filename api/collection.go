package api

import "encoding/json"

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

// CollectionItem is an item of named payloads.
type CollectionItem struct {
	Item map[string]json.RawMessage `json:"Item" sql:"-"`

	ID     int    `json:"-" sql:",pk"`
	Index  int    `json:"-" sql:",pk"`
	Name   string `json:"-" sql:",pk"`
	Type   string `json:"-"`
	ItemID int    `json:"-"`
}
