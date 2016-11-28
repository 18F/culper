package main

import (
	"log"
	"net/http"
	"strings"
)

func LoggerHandler(w http.ResponseWriter, r *http.Request) error {
	log.Println()
	log.Printf("Request [%s] %s from %s\n", r.Method, r.URL.String(), r.RemoteAddr)
	log.Printf("%s\n", strings.Repeat("-", 79))

	log.Printf("Header\n")
	log.Printf("%s\n", strings.Repeat("-", 79))
	for k, v := range r.Header {
		log.Printf("%s: %s\n", k, v)
	}
	log.Println()

	log.Printf("Form\n")
	log.Printf("%s\n", strings.Repeat("-", 79))
	for k, v := range r.Form {
		log.Printf("%s: %s\n", k, v)
	}

	return nil
}
