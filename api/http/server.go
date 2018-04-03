package http

import (
	"crypto/tls"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

var (
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

type Server struct {
	Env *api.Settings
	Log *api.Settings
}

type serverFunc func(server *http.Server) error

func (service Server) ListenAndServe(address string, router http.Handler) error {
	var message string
	var server *http.Server
	var serverFunc serverFunc

	if service.Env.Has(api.TLS_CERT) && service.Env.Has(api.TLS_KEY) {
		message = api.StartingServerTLS
		server = &http.Server{
			Addr:         address,
			Handler:      router,
			TLSConfig:    cfg,
			TLSNextProto: make(map[string]func(*http.Server, *tls.Conn, http.Handler), 0),
		}
		serverFunc = func(s *http.Server) error {
			return s.ListenAndServeTLS(service.Env.String(api.TLS_CERT), service.Env(api.TLS_KEY))
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
