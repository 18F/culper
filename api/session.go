package main

import (
	"errors"
	"log"
	"net/http"
)

func SessionHandler(w http.ResponseWriter, r *http.Request) error {
	log.Println("Session handler middleware")
	return errors.New("Not Implemented")
}
