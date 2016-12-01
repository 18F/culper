package cf

import (
	"encoding/json"
	"os"
	"strings"
)

// vcapService represents the JSON structure found in the CloudFoundry
// VCAP_SERVICES environment variable
type vcapService struct {
	UserProvided []service `json:"user-provided"`
}

// service represents the JSON structure which is common between the
// user provided services as well as other services
type service struct {
	Name        string            `json:"name"`
	Label       string            `json:"label"`
	Credentials map[string]string `json:"credentials"`
}

// UserService will attempt to pull credential information for a service by
// service name and credential name.
//
// If there is a VCAP_SERVICES environment variable it will attempt to parse
// its JSON value.
//
// Otherwise it will look for an environment variable in a normalized name
// and use its value:
//
//  - app-smtp => APP_SMTP
//  - app-postgres => APP_POSTGRES
func UserService(name, credential string) string {
	// If there is not a VCAP_SERVICES environment variable we check
	// if there is a one by itself.
	vcap := os.Getenv("VCAP_SERVICES")
	if vcap == "" {
		return os.Getenv(slugify(name, credential))
	}

	// The VCAP_SERVICES stores a JSON value which we can parse
	var v vcapService
	err := json.Unmarshal([]byte(vcap), &v)
	if err != nil {
		return ""
	}

	// Look for the user provided service and it's specific credential
	for _, s := range v.UserProvided {
		if s.Name == name {
			return s.Credentials[credential]
		}
	}

	return ""
}

// slugify provides a concatenation of strings to then perform
// a dirty normalization.
func slugify(slugs ...string) string {
	s := strings.Join(slugs, "_")
	s = strings.Replace(s, "-", "_", -1)
	return strings.ToUpper(s)
}
