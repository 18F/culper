package http

import (
	"crypto/tls"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

var (
	// TransportLayerSecurity is the TLS configuration settings for a HTTPS server.
	TransportLayerSecurity = &tls.Config{
		MinVersion: tls.VersionTLS12,
		CurvePreferences: []tls.CurveID{
			tls.CurveP521,
			tls.CurveP384,
			tls.CurveP256,
		},
		PreferServerCipherSuites: true,
		CipherSuites: []uint16{
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,
			tls.TLS_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_RSA_WITH_AES_256_CBC_SHA,
		},
	}
)

// Server is a HTTP/HTTPS server implementation.
type Server struct {
	Env api.Settings
	Log api.LogService
}

type serverFunc func(server *http.Server) error

// ListenAndServe will bind to the host address and port and serve the content.
func (service Server) ListenAndServe(address string, router http.Handler) error {
	var message string
	var server *http.Server
	var serverFunc serverFunc

	if service.Env.Has(api.TLSCert) && service.Env.Has(api.TLSKey) {
		message = api.StartingServerTLS
		server = &http.Server{
			Addr:         address,
			Handler:      router,
			TLSConfig:    TransportLayerSecurity,
			TLSNextProto: make(map[string]func(*http.Server, *tls.Conn, http.Handler), 0),
		}
		serverFunc = func(s *http.Server) error {
			return s.ListenAndServeTLS(service.Env.String(api.TLSCert), service.Env.String(api.TLSKey))
		}
	} else {
		message = api.StartingServer
		server = &http.Server{
			Addr:    address,
			Handler: router,
		}
		serverFunc = func(s *http.Server) error {
			return s.ListenAndServe()
		}
	}

	service.Log.Info(message, api.LogFields{"address": address})
	return serverFunc(server)
}
