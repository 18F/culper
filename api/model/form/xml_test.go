package form

import (
	"encoding/json"
	"fmt"
	"log"
	"testing"
)

func TestPackage(t *testing.T) {
	tests := []struct {
		Schema string
		Data   string
	}{
		//{Schema: "financial-bankruptcy.xml", Data: "testdata/financial-bankruptcy.json"},
		{Schema: "identification.xml", Data: "testdata/identification.json"},
	}

	for _, test := range tests {
		// Get the test data as a byte array
		raw, err := readBinaryData(test.Data)
		if err != nil {
			t.Fatal(err)
		}
		fmt.Println(string(raw))
		var js map[string]interface{}
		if err := json.Unmarshal(raw, &js); err != nil {
			t.Fatalf("Failed to unmarshal XML schema %s", test.Data)
		}

		tmpl := xmlTemplateWithFuncs(test.Schema, js)
		if tmpl == "" {
			t.Fatalf("XML template should not be empty")
		}
		log.Println("XML template: ", tmpl)
	}
}
