package cloudfoundry

import (
	"os"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
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

func TestDatabaseFromCloudfoundry(t *testing.T) {
	env := mock.Native{}
	os.Setenv("VCAP_APPLICATION", vcapApplication)
	os.Setenv("VCAP_SERVICES", vcapServices)
	old := env.String(api.DATABASE_URI)
	os.Setenv(api.DATABASE_URI, "")
	Configure()

	// Test agains the environment variables
	expected := "postgres://[db-username]:[db-password]@[db-host]:5432/[db-name]"
	uri := env.String(api.DATABASE_URI)
	if uri != expected {
		t.Errorf("Expected the database URI to be '%s' but received '%s'", expected, uri)
	}

	os.Setenv(api.DATABASE_URI, old)
}

func TestDatabaseDefaults(t *testing.T) {
	env := mock.Native{}
	os.Setenv("VCAP_APPLICATION", "")
	os.Setenv("VCAP_SERVICES", "")
	old := env.String(api.DATABASE_URI)
	os.Setenv(api.DATABASE_URI, "")
	Configure()

	// Test agains the environment variables
	expected := ""
	uri := env.String(api.DATABASE_URI)
	if uri != expected {
		t.Errorf("Expected the database URI to be empty but received '%s'", uri)
	}

	os.Setenv(api.DATABASE_URI, old)
}
