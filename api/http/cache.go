package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// CacheHandler implements the cache settings on web responses.
type CacheHandler struct {
	Log api.LogService
}

// Middleware applies cache headers to the response.
func (service CacheHandler) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Even after the session has been closed, it might be possible to access the
		// private or sensitive data exchanged within the session through the web
		// browser cache. Therefore, web applications must use restrictive cache
		// directives for all the web traffic exchanged through HTTP and HTTPS, such
		// as the `Cache-Control: no-cache,no-store` and `Pragma: no-cache` HTTP
		// headers [5], and/or equivalent META tags on all or (at least) sensitive
		// web pages.

		// Independently of the cache policy defined by the web application, if
		// caching web application contents is allowed, the session IDs must never be
		// cached, so it is highly recommended to use the
		// `Cache-Control: no-cache="Set-Cookie, Set-Cookie2"` directive, to allow web
		// clients to cache everything except the session ID.
		//
		// https://www.owasp.org/index.php/Session_Management_Cheat_Sheet#Web_Content_Caching
		service.Log.Info(api.CacheHeaders, api.LogFields{})
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")

		// Let gorilla mux do its thing
		next.ServeHTTP(w, r)
	})
}
