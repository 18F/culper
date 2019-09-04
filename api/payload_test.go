package api

import (
	"io/ioutil"
	"testing"
)

func TestPayloadEntity(t *testing.T) {
	sectionFilename := "testdata/identification/identification-name.json"

	rawSection, err := ioutil.ReadFile(sectionFilename)
	if err != nil {
		t.Fatal(err)
	}

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	if err := payload.Unmarshal(rawSection); err != nil {
		t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", string(rawSection), err)
	}
	// Set Type to nothing to suggest empty payload
	payload.Type = ""

	// Extract the entity interface of the payload and validate it
	_, err = payload.Entity()
	if err == nil {
		t.Fatal("Should have received an Empty Payload error.")
	}
}

func TestPayloadEntityInvalidType(t *testing.T) {

	sectionFilename := "testdata/identification/identification-name.json"

	rawSection, err := ioutil.ReadFile(sectionFilename)
	if err != nil {
		t.Fatal(err)
	}

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}

	if err := payload.Unmarshal(rawSection); err != nil {
		t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", string(rawSection), err)
	}
	// Set bogus type
	payload.Type = "Nino"
	// Extract the entity interface of the payload and validate it
	_, err = payload.Entity()
	if err == nil {
		t.Fatal("Should have received Could not determine a suitable type error")
	}
}

func TestPayloadSafeEntity(t *testing.T) {
	sectionFilename := "testdata/identification/identification-name.json"

	rawSection, err := ioutil.ReadFile(sectionFilename)
	if err != nil {
		t.Fatal(err)
	}

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	if err := payload.Unmarshal(rawSection); err != nil {
		t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", string(rawSection), err)
	}
	// Set Type to nothing to suggest empty payload
	payload.Type = ""

	// Extract the entity interface of the payload and validate it
	_, err = payload.SafeEntity()
	if err == nil {
		t.Fatal("Should have received an Empty Payload error.")
	}
}

// func TestPayloadSafeEntityInvalidType(t *testing.T) {

// 	sectionFilename := "testdata/identification/identification-name.json"

// 	rawSection, err := ioutil.ReadFile(sectionFilename)
// 	if err != nil {
// 		t.Fatal(err)
// 	}

// 	// Deserialize the initial payload from a JSON structure
// 	payload := &Payload{}

// 	if err := payload.Unmarshal(rawSection); err != nil {
// 		t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", string(rawSection), err)
// 	}
// 	// Set bogus type
// 	payload.Type = "Nino"
// 	// Extract the entity interface of the payload and validate it
// 	_, err = payload.SafeEntity()
// 	if err == nil {
// 		t.Fatal("Should have received Could not determine a suitable type error")
// 	}
// }
