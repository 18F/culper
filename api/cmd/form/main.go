package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"

	"github.com/18F/e-QIP-prototype/api/cmd"
)

// Exports a complete eApp application form in its native JSON format,
// using the backend API to retrieve the application from a specified
// user account.
//
// See api/testdata/complete-scenarios/*.json for examples.
func main() {
	wccFlags := cmd.SetupWebClientFlags("form", "output.json")
	flag.Parse()

	if len(flag.Args()) != 1 {
		flag.Usage()
		// Mimick flag.ExitOnError
		os.Exit(2)
	}

	webclient := wccFlags.ConfiguredClient()

	var formJS json.RawMessage
	webclient.WithAuth(func() {
		formJS = webclient.Form()
	})

	f, err := os.Create(flag.Args()[0])
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	_, err = f.WriteString(string(formJS))
	if err != nil {
		log.Fatal(err)
	}

}
