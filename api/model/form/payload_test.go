package form

import (
	"io/ioutil"
	"testing"
)

// readBinaryData pulls test data and returns it as a byte array.
func readBinaryData(filepath string) ([]byte, error) {
	b, err := ioutil.ReadFile(filepath)
	if err != nil {
		return nil, err
	}
	return b, nil
}

func TestPayload(t *testing.T) {
	tests := []struct {
		Data string
	}{
		{Data: "testdata/checkbox.json"},
		{Data: "testdata/datecontrol.json"},
		{Data: "testdata/daterange.json"},
		{Data: "testdata/email.json"},
		{Data: "testdata/name.json"},
		{Data: "testdata/notapplicable.json"},
		{Data: "testdata/number.json"},
		{Data: "testdata/radio.json"},
		{Data: "testdata/ssn.json"},
		{Data: "testdata/telephone.json"},
		{Data: "testdata/text.json"},
		{Data: "testdata/textarea.json"},
	}

	for _, test := range tests {
		// Get the test data as a byte array
		raw, err := readBinaryData(test.Data)
		if err != nil {
			t.Fatal(err)
		}

		// Deserialize the initial payload from a JSON structure
		payload := &Payload{}
		if err := payload.Unmarshal(raw); err != nil {
			t.Fatal(err)
		}

		// Extract the entity interface of the payload and validate it
		entity, err := payload.Entity()
		if err != nil {
			t.Fatal(err)
		}
		if ok, _ := entity.Valid(); !ok {
			t.Fatal("Not valid")
		}
	}
}
