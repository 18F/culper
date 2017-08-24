package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
)

// EmploymentActivity is a basic input.
type EmploymentActivity struct {
	Value            string `json:"value"`
	OtherExplanation string `json:"otherExplanation,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *EmploymentActivity) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
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
