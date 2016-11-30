package handlers

import (
	"net/http"

	"github.com/gorilla/handlers"
)

// CORS Wraps an http handler with the gorilla cors handler and
// specifies the allowed origins, methods and headers.
func CORS(r http.Handler) http.Handler {
	return handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"POST", "GET", "PUT"}),
		handlers.AllowedHeaders([]string{
			"Access-Control-Allow-Origin",
			"Accept",
			"Accept-Language",
			"Content-Language",
			"Content-Type",
			"Date",
			"Content-Length",
		}),
	)(r)
}
