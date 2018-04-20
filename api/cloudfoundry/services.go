package cloudfoundry

import (
	"encoding/json"
	"os"
)

// vcapJSON represents the JSON structure found in the CloudFoundry
// VCAP_SERVICES environment variable
type vcapJSON struct {
	UserProvided []service `json:"user-provided"`
}

// service represents the JSON structure which is common between the
// user provided services as well as other services
type service struct {
	Name        string            `json:"name"`
	Label       string            `json:"label"`
	Credentials map[string]string `json:"credentials"`
}

// native calls the native environment call for environment variable
func native(name string) string {
	return os.Getenv(name)
}

// vcap extracts the proper service credentials from the VCAP_SERVICES
func vcap(name, credential string) string {
	// Return early if there is not a VCAP_SERVICES environment variable
	services := native("VCAP_SERVICES")
	if services == "" {
		return ""
	}

	// The VCAP_SERVICES stores a JSON value which we can parse
	var v vcapJSON
	if err := json.Unmarshal([]byte(services), &v); err == nil {
		// Look for the user provided service and it's specific credential
		for _, s := range v.UserProvided {
			if s.Name == name {
				return s.Credentials[credential]
			}
		}
	}

	return ""
}
