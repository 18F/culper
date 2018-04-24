package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

var (
	Piped bool = false
)

func main() {
	// Figure out if the input is coming from an argument or a pipe.
	stat, _ := os.Stdin.Stat()
	mode := stat.Mode()
	Piped = mode&os.ModeNamedPipe != 0

	var buffer []byte
	var err error

	if Piped {
		// Read the contents from standard input
		buffer, err = ioutil.ReadAll(os.Stdin)
		if err != nil {
			log.Println("error reading from standard input:", err)
			return
		}
	} else {
		for _, file := range os.Args[1:] {
			buffer, err = ioutil.ReadFile(file)
			if err != nil {
				log.Println("error reading from file:", err)
				return
			}
			break
		}
	}

	// Marshal standard input contents in to JSON
	var messages []json.RawMessage
	err = json.Unmarshal(buffer, &messages)
	if err != nil {
		log.Println("error marshalling from standard input:", err)
		return
	}

	webclient(messages)
}
