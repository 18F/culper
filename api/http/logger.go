package http

import (
	"net/http"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

// LoggingHandler is the handler for logging.
type LoggingHandler struct {
	Log api.LogService
}

// Middleware for standard logging.
func (service LoggingHandler) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		service.Log.AddField("ip", ipAddress(r))
		service.Log.Info(api.WebRequest, api.LogFields{
			"method": r.Method,
			"url":    r.URL.String(),
			"remote": r.RemoteAddr,
		})
		next.ServeHTTP(w, r)
	})
}

func ipAddress(r *http.Request) string {
	ip := r.RemoteAddr
	proxies := r.Header.Get(http.CanonicalHeaderKey("x-forwarded-for"))
	if proxies != "" {
		for _, proxy := range strings.Split(proxies, ", ") {
			ip = proxy
		}
	}
	return ip
}
