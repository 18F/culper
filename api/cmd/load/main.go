package main

import (
	"encoding/json"
	"flag"
	"io/ioutil"
	"log"
	"os"

	"github.com/18F/e-QIP-prototype/api/cmd"
)

func main() {
	var payloads []json.RawMessage
	var buffer []byte
	var err error

	wccFlags := cmd.SetupWebClientFlags("load", "test-case.json [test-case.json]")

	flag.Parse()
	webclient := wccFlags.ConfiguredClient()

	// Figure out if the input is coming from an argument or a pipe.
	if cmd.IsPiped() {
		// Read the contents from standard input
		buffer, err = ioutil.ReadAll(os.Stdin)
		if err != nil {
			log.Println("error reading from standard input:", err)
			return
		}

		// Marshal standard input contents in to JSON
		err = json.Unmarshal(buffer, &payloads)
		if err != nil {
			log.Println("error marshalling from standard input:", err)
			return
		}
	} else {
		for _, file := range flag.Args() {
			buffer, err = ioutil.ReadFile(file)
			if err != nil {
				log.Println("error reading from file:", err)
				return
			}
			payloads = append(payloads, buffer)
		}
	}

	webclient.WithAuth(func() {
		// Loop through all sections received
		for _, payload := range payloads {
			// POST a save request for section
			webclient.Save(payload)
		}
	})
}
