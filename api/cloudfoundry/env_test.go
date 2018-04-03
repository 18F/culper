package cloudfoundry

import (
	"os"
	"testing"
)

var (
	// Setting of the VCAP_APPLICATION environment variable is necessary because `go-cfenv` will
	// throw errors if it is not!
	vcapApplication = `{}`

	// vcapServices represents the JSON structure which *may* be found on a CloudFoundry instance.
	vcapServices = `{
		"aws-rds": [
			{
				"credentials": {
					"db_name": "[db-name]",
					"host": "[db-host]",
					"password": "[db-password]",
					"port": "5432",
					"uri": "postgres://[db-username]:[db-password]@[db-host]:5432/[db-name]",
					"username": "[db-username]"
				},
				"label": "aws-rds",
				"name": "eqip-postgres",
				"plan": "shared-psql",
				"provider": null,
				"syslog_drain_url": null,
				"tags": [
					"database",
					"RDS",
					"postgresql",
					"mysql"
				],
				"volume_mounts": []
			}
		]
	}`
)

func TestDatabaseURI(t *testing.T) {
	os.Setenv("VCAP_APPLICATION", vcapApplication)
	os.Setenv("VCAP_SERVICES", vcapServices)

	// Test agains the environment variables
	expected := "postgres://[db-username]:[db-password]@[db-host]:5432/[db-name]"
	uri := DatabaseURI("eqip-postgres")
	if uri != expected {
		t.Errorf("Expected the database URI to be '%s' but received '%s'", expected, uri)
	}

	// Test against defaults
	os.Setenv("VCAP_APPLICATION", "")
	os.Setenv("VCAP_SERVICES", "")
	expected = "postgres://postgres@localhost:5432/postgres"
	expectedDocker := "postgres://postgres@db:5432/postgres"
	uri = DatabaseURI("eqip-postgres")
	if uri != expected && uri != expectedDocker {
		t.Errorf("Expected the database URI to be '%s' or '%s' but received '%s'", expected, expectedDocker, uri)
	}
}

func TestTwofactorDisabled(t *testing.T) {
	os.Setenv("DISABLE_2FA", "1")

	// Test agains the environment variables
	if !TwofactorDisabled() {
		t.Errorf("Expected twofactor authentication to be disabled")
	}

	// Test against defaults
	os.Setenv("DISABLE_2FA", "")
	if TwofactorDisabled() {
		t.Errorf("Expected twofactor authentication to be enabled")
	}
}

func TestTwofactorResettable(t *testing.T) {
	os.Setenv("ALLOW_2FA_RESET", "1")

	// Test agains the environment variables
	if !TwofactorResettable() {
		t.Errorf("Expected twofactor authentication to allow reset")
	}

	// Test against defaults
	os.Setenv("ALLOW_2FA_RESET", "")
	if TwofactorDisabled() {
		t.Errorf("Expected twofactor authentication to disallow reset")
	}
}

func TestAllowedOrigin(t *testing.T) {
	tests := []struct {
		env     string
		origin  string
		allowed bool
	}{
		{env: "", origin: "https://test.com:443", allowed: false},
		{env: "*", origin: "https://test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://sub.test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://tester.com:443", allowed: false},
		{env: "https://test.com", origin: "https://test.com:443", allowed: true},
		{env: "https://test.com:443", origin: "https://test.com:443", allowed: true},
	}

	for _, test := range tests {
		os.Setenv("CORS_ALLOWED", test.env)
		if AllowedOrigin(test.origin) != test.allowed {
			suffix := ""
			if !test.allowed {
				suffix = "not "
			}
			t.Errorf("Expected origin (%s) to be %sallowed with environment (%s)", test.origin, suffix, test.env)
		}
	}
}
