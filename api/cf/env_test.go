package cf

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
