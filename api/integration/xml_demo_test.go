package integration

import (
	"encoding/xml"
	"fmt"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
)

type GamblingIncident struct {
	// XMLName xml.Name `xml:"Incident"`
	ID      int `xml:",attr"`
	Actions string
	Amount  int64
	Comment string
}

type ProblemsDueToGambling struct {
	Answer    string
	Comment   string
	Incidents []GamblingIncident `xml:"Incidents>Incident"`
}

func TestImplicitGeneration(t *testing.T) {

	// to do things implicitly, explicitly, we have to make a go struct that matches the xml output.
	// Think about how this might work for leaving stuff out? maybe just omitempty?

	implicitExample := ProblemsDueToGambling{
		Answer: "Yes",
		Incidents: []GamblingIncident{
			GamblingIncident{
				ID:      1,
				Actions: "Well I told you about it at least",
				Amount:  2334434,
			},
		},
	}

	writtenXML, marshalErr := xml.MarshalIndent(implicitExample, "", "  ")
	if marshalErr != nil {
		t.Fatal(marshalErr)
	}

	fmt.Println(string(writtenXML))

	// Read from a file
	gamblingxml := readTestData(t, "testdata/gambling.xml")

	var loadExample ProblemsDueToGambling
	loadErr := xml.Unmarshal(gamblingxml, &loadExample)
	if loadErr != nil {
		t.Fatal(loadErr)
	}

	fmt.Printf("Loaded: %+v\n", loadExample)

	t.Fatal("Nope")
}

func TestExplicitGeneration(t *testing.T) {

	var loadedGambling api.FinancialGambling

	gamblingxml := readTestData(t, "testdata/gambling.xml")
	loadErr := xml.Unmarshal(gamblingxml, &loadedGambling)
	if loadErr != nil {
		t.Fatal(loadErr)
	}

	fmt.Printf("Loaded: %+v\n", loadedGambling)

	for _, item := range loadedGambling.List.Items {
		eachErr := item.Each(func(key string, entityType string, itemEntity api.Entity, err error) error {
			fmt.Printf("    %s: %+v\n", key, itemEntity)
			return nil
		})
		if eachErr != nil {
			t.Fatal(eachErr)
		}
	}
	t.Fatal("Nope")
}
