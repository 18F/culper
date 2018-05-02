package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"time"
)

func main() {
	rand.Seed(time.Now().Unix())
	var err error
	var schema []byte

	fuzzies := []json.RawMessage{}
	fuzzer := NewFuzzer()
	for _, file := range os.Args[1:] {
		// Read our JSON from provided schema file
		schema, err = ioutil.ReadFile(file)
		if err != nil {
			continue
		}
		fuzzies = append(fuzzies, fuzzer.WalkJSON(schema))
	}

	// Go through the JSON structure and apply fuzzing logic
	pretty, _ := json.MarshalIndent(fuzzies, "", "  ")
	fmt.Println(string(pretty))
}
