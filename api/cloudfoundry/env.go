package cloudfoundry

import (
	"fmt"
	"os"

	"github.com/18F/e-QIP-prototype/api"
	cfenv "github.com/cloudfoundry-community/go-cfenv"
)

func Configure() {
	current, err := cfenv.Current()
	if err != nil {
		return
	}

	// Check for USPS API information
	usps := vcap("usps-api", "api_key")
	if usps != "" {
		os.Setenv(api.USPS_API_API_KEY, usps)
	}

	// Check for database connection information
	db := getDatabase(current, "eqip-postgres")
	if db != "" {
		os.Setenv(api.DATABASE_URI, db)
	}

	// Check for bindable HTTP/HTTPS information
	uri := getURI(current)
	if uri != "" {
		os.Setenv(api.API_BASE_URL, uri)
	}
	port := getPort(current)
	if port != "" {
		os.Setenv(api.PORT, port)
	}
}

// getURI is the application URI.
func getURI(current *cfenv.App) string {
	if current != nil && len(current.ApplicationURIs) > 0 {
		return current.ApplicationURIs[0]
	}
	return ""
}

// getPort returns the publicly accessible port.
func getPort(current *cfenv.App) string {
	if current != nil && current.Port != 0 {
		return fmt.Sprintf("%d", current.Port)
	}
	return ""
}

// getDatabase returns the database connection string.
func getDatabase(current *cfenv.App, label string) string {
	// Attempt to pull from CloudFoundry settings first
	if current != nil {
		// First, try finding it by name
		service, err := current.Services.WithName(label)
		if err == nil {
			return service.Credentials["uri"].(string)
		}

		// Next, try finding it by label
		services, err := current.Services.WithLabel(label)
		if err == nil {
			for _, s := range services {
				return s.Credentials["uri"].(string)
			}
		}
	}
	return ""
}
