package integration_test

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
)

type testContextKey string

const testKey testContextKey = "TEST_KEY"

func TestMuxContextParsing(t *testing.T) {

	passthrough := "davey tate"
	urlName := "Banquo"

	middleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			newContext := context.WithValue(r.Context(), testKey, passthrough)
			next.ServeHTTP(w, r.WithContext(newContext))
		})
	}

	handler := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		urlData := vars["name"]
		contextualData := r.Context().Value(testKey).(string)

		fmt.Println("URL: ", urlData)
		fmt.Println("CONTEXT: ", contextualData)

		if urlData != urlName {
			t.Fatal("We didn't get the url data into the handler", urlData)
		}

		if contextualData != passthrough {
			t.Fatal("The context data was not passed through.", contextualData)
		}

	}

	r := mux.NewRouter()
	r.Handle("/hello/{name}", middleware(http.HandlerFunc(handler))).Methods("GET")

	ts := httptest.NewServer(r)
	defer ts.Close()

	url := ts.URL + "/hello/" + urlName
	http.Get(url)

	// using t.Fatal inside the handler function of course is weird
	// code continues to run after here, but who cares.

}
