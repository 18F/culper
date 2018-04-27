package main

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/cmd"
)

func main() {
	// Create a web client to interface with the RESTful API.
	webclient := &cmd.WebClient{
		Client: &http.Client{},
	}

	js := webclient.Form()
	webclient.Logout()
	fmt.Println(string(js))
}
