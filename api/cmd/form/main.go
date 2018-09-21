package main

import (
	"log"
	"net/http"
	"os"

	"github.com/18F/e-QIP-prototype/api/cmd"
)

// Exports a complete eApp application form in its native JSON format,
// using the backend API to retrieve the application from a specified
// user account.
//
// See api/testdata/complete-scenarios/*.json for examples.
func main() {
	if len(os.Args) != 2 {
		log.Fatal("usage: form output.json")
	}

	// Create a web client to interface with the RESTful API.
	webclient := &cmd.WebClient{
		Client: &http.Client{},
	}

	js := webclient.Form()
	webclient.Logout()

	f, err := os.Create(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	_, err = f.WriteString(string(js))
	if err != nil {
		log.Fatal(err)
	}
}
