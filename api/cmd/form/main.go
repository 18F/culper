package main

import (
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

	webclient.WithAuth(func() {
		js := webclient.Form()
		webclient.Logout()

		f, err := os.Create(flag.Args()[0])
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()

		_, err = f.WriteString(string(js))
		if err != nil {
			log.Fatal(err)
		}
	})

}
