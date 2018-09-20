package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
)

// Loads a complete eApp application form from its native JSON format,
// using the backend API to load each section of the application into
// a specified user account.
//
// See api/testdata/complete-scenarios/*.json for examples.
func main() {
	if len(os.Args) < 2 {
		log.Fatalf("usage: load test-case.json")
	}

	form, err := cmd.ReadSectionData(os.Args[1])
	if err != nil {
		log.Fatalln("error reading from file:", err)
	}

	// Create a web client to interface with the RESTful API.
	webclient := &cmd.WebClient{
		Client: &http.Client{},
	}

	for _, v := range api.Catalogue() {
		// If the source data represents a scenario that has been submitted
		// to e-QIP, etc. already, do not re-load that meta-data
		if v.Payload == "submission.releases" {
			log.Printf("Skipping `%s:%s`\n", v.Name, v.Subsection)
			continue
		}

		val, ok := form[v.Name].(map[string]interface{})
		if !ok {
			log.Fatalf("`%s` is not found\n", v.Name)
		}

		js, ok := val[v.Subsection].(map[string]interface{})
		if !ok {
			log.Fatalf("`%s:%s` is not found\n", v.Name, v.Subsection)
		}

		jsonString, err := json.Marshal(js)
		if err != nil {
			log.Fatalf("Could not marshal json for `%s:%s`\n", v.Name, v.Subsection)
		}
		log.Printf("Saving `%s:%s`\n", v.Name, v.Subsection)
		webclient.Save(jsonString)
	}
	webclient.Logout()
}
