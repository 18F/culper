package form

import "strings"

// TextField is a generic container for required text
type TextField string

// Valid validates a TextField
func (t TextField) Valid() (bool, error) {
	if strings.TrimSpace(string(t)) == "" {
		return false, ErrFieldRequired{"TextField is required"}
	}
	return true, nil
}
