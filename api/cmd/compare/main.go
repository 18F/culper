package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
)

func main() {
	var payloads []json.RawMessage
	if cmd.IsPiped() {
		// Read the contents from standard input
		buffer, err := ioutil.ReadAll(os.Stdin)
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
		// If there are files to test against then loop
		// through each.
		for _, file := range os.Args[1:] {
			// Read the file contents
			buffer, err := ioutil.ReadFile(file)
			if err != nil {
				log.Println("error reading from file:", err)
				return
			}
			payloads = append(payloads, buffer)
		}
	}

	// Create a web client to interface with the RESTful API.
	webclient := &cmd.WebClient{
		Client: &http.Client{},
	}
	form := webclient.Form()
	webclient.Logout()

	// Loop through all sections received
	for _, payload := range payloads {
		sig := signature(payload)
		fmt.Printf("Payload \"%s\": ", sig)
		if compare(walkJSON(form, sig), payload) {
			fmt.Println("found in response")
		} else {
			fmt.Println("not found in response")
		}
	}
}

func signature(raw json.RawMessage) string {
	payload := &api.Payload{}
	if err := payload.Unmarshal(raw); err != nil {
		return ""
	}
	return payload.Type
}

type Map map[string]json.RawMessage
type Array []json.RawMessage

func walkJSON(raw json.RawMessage, signature string) json.RawMessage {
	if raw[0] == 123 {
		var content Map
		json.Unmarshal(raw, &content)
		for _, v := range content {
			if match(v, signature) {
				return v
			} else {
				v2 := walkJSON(v, signature)
				if len(v2) > 0 {
					return v2
				}
			}
		}
	} else if raw[0] == 91 {
		var content Array
		json.Unmarshal(raw, &content)
		for _, v := range content {
			if match(v, signature) {
				return v
			} else {
				v2 := walkJSON(v, signature)
				if len(v2) > 0 {
					return v2
				}
			}
		}
	}
	return json.RawMessage{}
}

func match(raw json.RawMessage, signature string) bool {
	payload := &api.Payload{}
	if err := payload.Unmarshal(raw); err != nil {
		return false
	}
	return strings.EqualFold(payload.Type, signature)
}

func compare(first, second json.RawMessage) bool {
	if len(first) == 0 || len(second) == 0 {
		return false
	}

	if first[0] == 123 && second[0] == 123 {
		var content1 Map
		var content2 Map

		json.Unmarshal(first, &content1)
		json.Unmarshal(second, &content2)

		if !compareMap(content1, content2) {
			return false
		}
	} else if first[0] == 91 && second[0] == 91 {
		var content1 Array
		var content2 Array

		json.Unmarshal(first, &content1)
		json.Unmarshal(second, &content2)

		if !compareArray(content1, content2) {
			return false
		}
	} else {
		var val1 interface{}
		var val2 interface{}

		json.Unmarshal(first, &val1)
		json.Unmarshal(first, &val2)

		switch v := val1.(type) {
		case float64:
			return v == val2.(float64)
		case string:
			return v == val2.(string)
		case bool:
			return v == val2.(bool)
		case nil:
		default:
		}
	}
	return true
}

func compareMap(first, second Map) bool {
	// First compare keys
	for k, v := range first {
		v2, ok := second[k]

		// Check to make sure the key exists in both sets
		if !ok {
			return false
		}

		// Do a more in-depth comparison
		if !compare(v, v2) {
			return false
		}
	}

	return true
}

func compareArray(first, second Array) bool {
	// First lengths
	if len(first) != len(second) {
		return false
	}

	// Next do more in-depth comparisons
	for i, v := range first {
		if !compare(v, second[i]) {
			return false
		}
	}

	return true
}
