package main

import (
	"log"
	"net/http"
)

func LoggerHandler(w http.ResponseWriter, r *http.Request) error {
	log.Println("Log handler middleware")
	return nil
}
