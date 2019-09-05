package main

import (
	"flag"

	"github.com/18F/e-QIP-prototype/api/cmd"
)

func main() {
	// Create a web client to interface with the RESTful API.
	wccFlags := cmd.SetupWebClientFlags("transmit", "")
	flag.Parse()
	webclient := wccFlags.ConfiguredClient()

	webclient.WithAuth(func() {
		webclient.Submit()
	})
}
