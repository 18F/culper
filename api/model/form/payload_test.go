package form

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api/geo"
)

// readTestData pulls in test data as a string
func readTestData(filepath string) (string, error) {
	b, err := ioutil.ReadFile(filepath)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

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
		{Data: "testdata/height.json"},
		{Data: "testdata/location.json"},
		{Data: "testdata/name.json"},
		{Data: "testdata/notapplicable.json"},
		{Data: "testdata/number.json"},
		{Data: "testdata/radio.json"},
		{Data: "testdata/ssn.json"},
		{Data: "testdata/telephone.json"},
		{Data: "testdata/text.json"},
		{Data: "testdata/textarea.json"},
		{Data: "testdata/identification-birthdate.json"},
		{Data: "testdata/identification-birthplace.json"},
		// {Data: "testdata/identification-contacts.json"},
		{Data: "testdata/identification-name.json"},
		// {Data: "testdata/identification-othernames.json"},
		{Data: "testdata/identification-physical.json"},
		{Data: "testdata/identification-ssn.json"},
	}

	// HTTP test server to field any third party requests
	xml, _ := readTestData("../../geo/testdata/valid_address.xml")
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/xml")
		fmt.Fprintln(w, xml)
	}))
	defer server.Close()

	// Setup the geocoder to use our mock endpoint
	geo.Geocode = geo.NewTestUSPSGeocoder("test", server.URL)

	for _, test := range tests {
		// Get the test data as a byte array
		raw, err := readBinaryData(test.Data)
		if err != nil {
			t.Fatal(err)
		}

		// Deserialize the initial payload from a JSON structure
		payload := &Payload{}
		if err := payload.Unmarshal(raw); err != nil {
			t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", string(raw), err)
		}

		// Extract the entity interface of the payload and validate it
		entity, err := payload.Entity()
		if err != nil {
			t.Fatalf("Failed to unpackage the payload for [%s]: %v", test.Data, err)
		}
		if ok, err := entity.Valid(); !ok {
			t.Fatalf("Error with [%s]: %v\n\nEntity: %v", test.Data, err, entity)
		}
	}
}
