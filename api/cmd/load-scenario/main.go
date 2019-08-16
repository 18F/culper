package main

import (
	"encoding/json"
	"flag"
	"log"
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
	wccFlags := cmd.SetupWebClientFlags("load-scenario", "test-case.json")

	flag.Parse()
	webclient := wccFlags.Parse()

	if len(flag.Args()) != 1 {
		flag.Usage()
		// Mimick flag.ExitOnError
		os.Exit(2)
	}

	form, err := cmd.ReadSectionData(flag.Arg(0))
	if err != nil {
		log.Fatalln("error reading from file:", err)
	}

	webclient.WithAuth(func() {
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
	})
}
