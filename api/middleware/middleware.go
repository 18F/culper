package middleware

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Handler is an injectable function which returns an error
// to help control flow.
type Handler func(w http.ResponseWriter, r *http.Request) error

// Middleware is a wrapper to make it easy to inject middleware in to
// the web application at different levels.
type Middleware struct {
	*mux.Router
	handlers []Handler
}

// MiddlewareRoute represents a route.
type MiddlewareRoute struct {
	*mux.Route
	parent *Middleware
}

// NewRouter will return Middleware with a new Gorilla mux.Router.
func NewRouter() *Middleware {
	return New(mux.NewRouter())
}

// New takes a mux.Router and prepares it as Middleware.
func New(handler *mux.Router) *Middleware {
	return &Middleware{
		Router:   handler,
		handlers: []Handler{},
	}
}

// Inject takes one or more MiddlewareFunc's and appends them to the current
// collection.
func (m *Middleware) Inject(f ...Handler) *Middleware {
	m.handlers = append(m.handlers, f...)
	return m
}

// HandleFunc takes a string to represent the path and an http.HandlerFunc.
// This function will then be wrapped with the middleware.
func (m *Middleware) HandleFunc(path string, f http.HandlerFunc) *Middleware {
	m.Router.NewRoute().Path(path).HandlerFunc(wrapper(f, m.handlers...))
	return m
}

// PathPrefix return a new MiddlewareRoute based on the path prefix.
func (m *Middleware) PathPrefix(path string) *MiddlewareRoute {
	mr := &MiddlewareRoute{
		Route:  m.Router.PathPrefix(path),
		parent: m,
	}
	return mr
}

// Subrouter creates a new Middleware router based on the route.
func (mr *MiddlewareRoute) Subrouter() *Middleware {
	return New(mr.Route.Subrouter()).Inject(mr.parent.handlers...)
}

// ServeHTTP can be passed to the http.ListenAndServe() function.
func (m *Middleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	m.Router.ServeHTTP(w, r)
}

func wrapper(f http.HandlerFunc, mf ...Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		for _, h := range mf {
			if err := h(w, r); err != nil {
				log.Println(err)
				return
			}
		}

		f(w, r)
	}
}
