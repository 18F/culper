package cmd

import (
	"encoding/json"
	"io/ioutil"
)

// ReadSectionData reads in a sub-section of test data, returning a partial form.
func ReadSectionData(filepath string) (map[string]interface{}, error) {
	b, err := ioutil.ReadFile(filepath)
	if err != nil {
		return nil, err
	}

	var js map[string]interface{}
	if err := json.Unmarshal(b, &js); err != nil {
		return nil, err
	}
	return js, nil
}
