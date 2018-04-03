package cloudfoundry

import (
	"encoding/json"
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

// VcapService will attempt to pull credential information for a service by
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
func VcapService(name string) string {
	parts := strings.SplitN(name, "_", 2)

	// If the environment contains VCAP services pull the credentials
	serviceCredential := vcap(parts[0], parts[1])
	if serviceCredential != "" {
		return serviceCredential
	}
	return ""
	// // Fallback to the native environment variable
	// return native(slugify(name, credential))
}

// // slugify provides a concatenation of strings to then perform
// // a dirty normalization.
// func slugify(slugs ...string) string {
// 	s := strings.Join(slugs, "_")
// 	s = strings.Replace(s, "-", "_", -1)
// 	return strings.ToUpper(s)
// }

// // native calls the native environment call for environment variable
// func native(name string) string {
// 	return os.Getenv(name)
// }

// vcap extracts the proper service credentials from the VCAP_SERVICES
func vcap(name, credential string) string {
	// Return early if there is not a VCAP_SERVICES environment variable
	services := native("VCAP_SERVICES")
	if services == "" {
		return ""
	}

	// The VCAP_SERVICES stores a JSON value which we can parse
	var v vcapService
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
