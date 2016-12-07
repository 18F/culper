package cf

import (
	"fmt"
	"os"

	cfenv "github.com/cloudfoundry-community/go-cfenv"
)

func PublicAddress() string {
	current, _ := cfenv.Current()
	uri := getURI(current)
	port := getPort(current)
	return fmt.Sprintf("%s:%s", uri, port)
}

func PublicURI() string {
	current, _ := cfenv.Current()
	proto := getProtocol(current)
	uri := getURI(current)
	port := getPort(current)
	return fmt.Sprintf("%s://%s:%s", proto, uri, port)
}

func getProtocol(current *cfenv.App) string {
	if current != nil && len(current.ApplicationURIs) > 0 {
		return "https"
	}
	return "http"
}

func getPort(current *cfenv.App) string {
	if current != nil && current.Port != 0 {
		return string(current.Port)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	return port
}

func getURI(current *cfenv.App) string {
	if current != nil && len(current.ApplicationURIs) > 0 {
		return current.ApplicationURIs[0]
	}

	return "localhost"
}
