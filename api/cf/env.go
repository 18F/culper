package cf

import (
	"fmt"
	"net/url"
	"os"
	"regexp"
	"strings"

	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	cfenv "github.com/cloudfoundry-community/go-cfenv"
)

// PublicAddress is a bindable address to host the server
func PublicAddress() string {
	current, _ := cfenv.Current()
	port := getPort(current)
	return fmt.Sprintf(":%s", port)
}

// PublicURI is the public URI accessible to the front end
func PublicURI() string {
	current, _ := cfenv.Current()
	proto := getProtocol(current)
	uri := getURI(current)
	port := getPort(current)
	return fmt.Sprintf("%s://%s:%s", proto, uri, port)
}

// DatabaseURI is the URI used to establish the database connection
func DatabaseURI(label string) string {
	log := logmsg.NewLogger()
	current, err := cfenv.Current()
	if err != nil {
		log.WithError(err).Debug("Cloud Foundry environment not found")
	}
	return getDatabase(current, label)
}

func getProtocol(current *cfenv.App) string {
	if current != nil && len(current.ApplicationURIs) > 0 {
		return "https"
	}
	return "http"
}

func getPort(current *cfenv.App) string {
	if current != nil && current.Port != 0 {
		return fmt.Sprintf("%d", current.Port)
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

func getDatabase(current *cfenv.App, label string) string {
	log := logmsg.NewLogger()

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

		// Anything else log the error and continue
		log.WithError(err).WithField("label", label).Debug("Could not parse VCAP_SERVICES")
	}

	// If the URI is set then use this as it is preferred
	addr := UserService("database", "uri")
	if addr != "" {
		return addr
	}

	// Or, by user (+ password) + database + host
	uri := &url.URL{Scheme: "postgres"}
	username := UserService("database", "user")
	if username == "" {
		username = "postgres"
	}

	// Check if there is a password set. If not then we need to create
	// the Userinfo structure in a different way so we don't include
	// exta colons (:).
	pw := UserService("database", "password")
	if pw == "" {
		uri.User = url.User(username)
	} else {
		uri.User = url.UserPassword(username, pw)
	}

	// The database name will be part of the URI path so it needs
	// a prefix of "/"
	database := UserService("database", "name")
	if database == "" {
		database = "postgres"
	}
	uri.Path = fmt.Sprintf("/%s", database)

	// Host can be either "address + port" or just "address"
	host := UserService("database", "host")
	if host == "" {
		host = "localhost:5432"
	}
	uri.Host = host

	return uri.String()
}

// TwofactorDisabled returns a boolean indicating whether the system allows for
// multiple factor authentication.
func TwofactorDisabled() bool {
	if UserService("DISABLE", "2FA") == "" {
		return false
	}
	return true
}

// TwofactorResettable returns a boolean indicating whether the system allows
// for an account to reset the multiple factor authentication assigned to it.
func TwofactorResettable() bool {
	if UserService("ALLOW", "2FA_RESET") == "" {
		return false
	}
	return true
}

// IsTest returns if the environment is in a test environment
func IsTest() bool {
	e := UserService("GOLANG", "ENV")
	if e == "test" || e == "development" {
		return true
	}
	return false
}

// FlushStorage returns whether the data should be flushed per use.
func FlushStorage() bool {
	if UserService("FLUSH", "STORAGE") == "" {
		return false
	}
	return true
}

// BasicEnabled returns a boolean indicating whether the system allows
// basic authentication.
func BasicEnabled() bool {
	if os.Getenv("BASIC_ENABLED") == "" {
		return false
	}
	return true
}

// SamlEnabled returns a boolean indicating whether the system allows
// SAML authentication.
func SamlEnabled() bool {
	if os.Getenv("SAML_ENABLED") == "" {
		return false
	}
	return true
}

// AllowedOrigin checks the given origin is whitelisted as an acceptable address.
func AllowedOrigin(origin string) bool {
	addresses := strings.TrimSpace(os.Getenv("CORS_ALLOWED"))
	for _, addr := range strings.Split(addresses, ";") {
		if addr == "" {
			continue
		}

		if addr == "*" {
			return true
		}
		re := regexp.MustCompile(strings.TrimSpace(addr))
		if re.MatchString(origin) {
			return true
		}
	}

	return false
}

func TargetAudiences() []string {
	audiences := []string{}

	if BasicEnabled() {
		audiences = append(audiences, jwt.BasicAuthAudience)
	}

	if !TwofactorDisabled() {
		audiences = append(audiences, jwt.TwoFactorAudience)
	}

	if SamlEnabled() {
		audiences = append(audiences, jwt.SingleSignOnAudience)
	}

	return audiences
}
