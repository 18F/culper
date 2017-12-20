package form

import (
	"encoding/json"
	"log"
	"testing"
)

func TestPackage(t *testing.T) {
	tests := []struct {
		Schema string
		Data   string
	}{
		{Schema: "identification-name.xml", Data: "testdata/identification-name.json"},
		{Schema: "identification-birth.xml", Data: "testdata/identification-birth.json"},
		{Schema: "identification-eyecolor.xml", Data: "testdata/identification-eyecolor.json"},
		{Schema: "identification-height.xml", Data: "testdata/identification-height.json"},
		{Schema: "identification-othernames.xml", Data: "testdata/identification-othernames.json"},
		{Schema: "identification-ssn.xml", Data: "testdata/identification-ssn.json"},
		{Schema: "identification-sex.xml", Data: "testdata/identification-sex.json"},
		{Schema: "identification-weight.xml", Data: "testdata/identification-weight.json"},
		{Schema: "financial-bankruptcy.xml", Data: "testdata/financial-bankruptcy.json"},
		{Schema: "financial-card.xml", Data: "testdata/financial-card.json"},
		{Schema: "financial-credit.xml", Data: "testdata/financial-credit.json"},
		{Schema: "financial-delinquent.xml", Data: "testdata/financial-delinquent.json"},
		{Schema: "financial-gambling.xml", Data: "testdata/financial-gambling.json"},
		{Schema: "financial-nonpayment.xml", Data: "testdata/financial-nonpayment.json"},
		{Schema: "financial-taxes.xml", Data: "testdata/financial-taxes.json"},
	}

	for _, test := range tests {
		// Get the test data as a byte array
		raw, err := readBinaryData(test.Data)
		if err != nil {
			t.Fatal(err)
		}
		var js map[string]interface{}
		if err := json.Unmarshal(raw, &js); err != nil {
			t.Fatalf("Failed to unmarshal XML schema %s", test.Data)
		}

		tmpl := xmlTemplateWithFuncs(test.Schema, js, DefaultFuncMap)
		if tmpl == "" {
			t.Fatalf("XML template should not be empty")
		}
		log.Println("XML template: ", tmpl)
	}
}
