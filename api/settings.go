package api

// Settings represents environments settings to pull configuration information.
// This may be via environment variables or a specific environment like CloudFoundry.
type Settings interface {
	Configure()
	Has(string) bool
	String(string) string
	True(string) bool
	Int(string) int
}

const (
	// NodeEnv Sets the Node environment to configure the application for a specific uses:
	//
	//  - `test`: used with unit testing and code coverage
	//  - `development`: for use while developing the application
	//  - `staging`: environment for various usability tests prior to releasing to production
	//  - `production`: minify and optimize all possible assets for optimal use
	//
	// Target: Front-end (web)
	// Default: `development`
	// Values: `test` | `development` | `staging` | `production`
	NodeEnv = "NODE_ENV"

	// GolangEnv Sets the Go environment to configure the application for specific uses:
	//
	//  - `test`: used with unit testing and code coverage
	//  - `development`: for use while developing the application
	//  - `staging`: environment for various usability tests prior to releasing to production
	//  - `production`: compiled for production use only minimum required assets (does **not** include test accounts)
	//
	// Target: Back-end (api)
	// Default: `development`
	// Values: `test` | `development` | `staging` | `production`
	GolangEnv = "GOLANG_ENV"

	// LogLevel Log level for the back-end API. The default source for logging will be standard outputs (`stdout` and `stderr`).
	//
	// Target: Back-end (api)
	// Default: `warning`
	// Values: `debug` | `info` | `warning` | `error` | `fatal` | `panic`
	LogLevel = "LOG_LEVEL"

	// LogFile Path to the local file system log file.
	//
	// Logging to file may be used in conjunction with other logging sources.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	LogFile = "LOG_FILE"

	// LogDirectory Path to the local file system log file.
	//
	// Logging to file may be used in conjunction with other logging sources.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	LogDirectory = "LOG_DIRECTORY"

	// LogSyslog Connection string for a `syslog` server such as `udp://logserver:514`. Both TCP and UDP are supported.
	//
	// Logging to `syslog` may be used in conjunction with other logging sources.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	// Values: `{protocol}://{host}:{port}`
	LogSyslog = "LOG_SYSLOG"

	// LogSyslogCert Providing a path to the PEM certificate will convert all `syslog` communication to use TLS. Only TCP + TLS is supported making the connection string `tcp://logserver:514`.
	//
	// Logging to `syslog` may be used in conjunction with other logging sources.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	LogSyslogCert = "LOG_SYSLOG_CERT"

	// SessionTimeout Session timeout in minutes. Periods of inactivity falling outside of the threshold will be considered invalid and are required to be re-authenticated.
	//
	// Target: Back-end (api)
	// Default: `15`
	SessionTimeout = "SESSION_TIMEOUT"

	// APIRedirect Front-end URL for the back-end to redirect responses to. If this value is not set it will redirect to the same server host but on port 80.
	//
	// Target: Back-end (api)
	// Default: `{server_protocol}://{server_host}`
	APIRedirect = "API_REDIRECT"

	// APIBaseURL Back-end URL for the front-end to direct requests to.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: `{server_protocol}://{server_host}:{server_port}/api`
	APIBaseURL = "API_BASE_URL"

	// Port Port to use for back-end API.
	//
	// Target: Back-end (api)
	// Default: `3000`
	Port = "PORT"

	// HashRouting Flag to enable hash routing. This should only be used in scenarios where push state is not an option.
	//
	// Target: Front-end (web)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	HashRouting = "HASH_ROUTING"

	// DbMigrationTarget Target a specific database migration step for example, `20180212130825_account_lock.sql`. By specifying a target then when migrations are ran it will try to step down **or** up until the target is reached. By not providing a value migrations will always attempt to go to the latest version.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	DbMigrationTarget = "DB_MIGRATION_TARGET"

	// DatabaseURI PostgreSQL database connection string. If a value is set do no set other database connection information.
	//
	// Target: Back-end (api)
	// Default: *none*
	// Values: `postgres://{db-username}:{db-password}@{db-host}:5432/{db-name}`
	DatabaseURI = "DATABASE_URI"

	// DatabaseUser PostgreSQL database user name.
	//
	// Target: Back-end (api)
	// Default: `postgres`
	DatabaseUser = "DATABASE_USER"

	// DatabasePassword PostgreSQL database password.
	//
	// Target: Back-end (api)
	// Default: *none*
	DatabasePassword = "DATABASE_PASSWORD"

	// DatabaseName PostgreSQL database instance name.
	//
	// Target: Back-end (api)
	// Default: `postgres`
	DatabaseName = "DATABASE_NAME"

	// DatabaseSSLMode The PostgreSQL sslmode to use to connect to the db
	//
	// Target: Back-end (api)
	// Default: `require`
	DatabaseSSLMode = "DATABASE_SSLMODE"

	// TestDatabaseName PostgreSQL database instance name for tests
	//
	// Target: Back-end (api)
	// Default: `eapp_test`
	TestDatabaseName = "TEST_DATABASE_NAME"

	// DatabaseHost PostgreSQL database host name and port.
	//
	// Target: Back-end (api)
	// Default: `localhost:5432`
	DatabaseHost = "DATABASE_HOST"

	// CORSAllowed Whitelist of address(es) for cross-origin resource sharing (CORS). CORS restricts resources (e.g. fonts, scripts, images) on a web page to be requested from another domain outside of the domain from which it is served.
	//
	// Examples
	//
	// | Type               | Example                            |
	// | ------------------ | ---------------------------------- |
	// | explicit           | http://localhost                   |
	// | multiple           | http://localhost;https://test\.com |
	// | wildcard           | *                                  |
	// | regular expression | https?://localhost                 |
	//
	// Target: Back-end (api)
	// Default: *empty*
	CORSAllowed = "CORS_ALLOWED"

	// CORSMaxAge The number of seconds browsers should cache preflight requests.
	//
	// Target: Back-end (api)
	// Default: `600`
	CORSMaxAge = "CORS_MAX_AGE"

	// FlushStorage Flag to enable flushing of persisted information for an account during the logon process.
	//
	// Target: Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	FlushStorage = "FLUSH_STORAGE"

	// UspsAPIKey United States Postal Service (USPS) API key for address validation.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	UspsAPIKey = "USPS_API_API_KEY"

	// CSRFSecret Random tokens used for CSRF digitally signed using a secret random key of at least 256-bits.
	//
	// Target: Back-end (api)
	// Default: *none*
	CSRFSecret = "CSRF_SECRET"

	// BasicEnabled Flag to enable basic username and password authentication.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	BasicEnabled = "BASIC_ENABLED"

	// SamlEnabled Flag to enable SAML authentication.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	SamlEnabled = "SAML_ENABLED"

	// SamlSloEnabled Flag to enable SAML single logout.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	SamlSloEnabled = "SAML_SLO_ENABLED"

	// SamlPublicCert File path (absolute or relative) to SAML public certificate.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SamlPublicCert = "SAML_PUBLIC_CERT"

	// SamlPrivateCert File path (absolute or relative) to SAML private certificate.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SamlPrivateCert = "SAML_PRIVATE_CERT"

	// SamlIdpSsoURL Endpoint to SAML 2.0 Single Sign-On (SSO) identity provider. The client will be redirected to this URL to complete the authentication process. This value will be provided by the IdAM configuration settings.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SamlIdpSsoURL = "SAML_IDP_SSO_URL"

	// SamlIdpSsoDescURL The identity provider's issuer URL. This value will be provided by the IdAM configuration settings.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SamlIdpSsoDescURL = "SAML_IDP_SSO_DESC_URL"

	// SamlIdpPublicCert File path (absolute or relative) to identity data provider's public certificate (X.509 PEM) used to verify the authentication response signature. This certificate will be provided by the IdAM solution.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SamlIdpPublicCert = "SAML_IDP_PUBLIC_CERT"

	// SamlSignRequest Flag to enable signing of SAML 2.0 requests.
	//
	// Target: Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	SamlSignRequest = "SAML_SIGN_REQUEST"

	// SamlVerifyInsecure Flag to allow insecure validation of SAML 2.0 responses.
	//
	// Target: Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	SamlVerifyInsecure = "SAML_VERIFY_INSECURE"

	// SamlConsumerServiceURL Endpoint for assertion consumer service. After authentication is completed the customer will be redirected to this endpoint for local processes to verify and handle the response.
	//
	// Target: Back-end (api)
	// Default: `{API_BASE_URL}/auth/saml/callback`
	SamlConsumerServiceURL = "SAML_CONSUMER_SERVICE_URL"

	// TLSCert File path (absolute or relative) to TLS public certificate (X.509 PEM) certificate for use with the back-end API.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	TLSCert = "TLS_CERT"

	// TLSKey File path (absolute or relative) to TLS private key (X.509 PEM) for use the back-end API.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	TLSKey = "TLS_KEY"

	// WsEnabled Allows requests to be made to the eqip web service.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	WsEnabled = "WS_ENABLED"

	// WsURL The endpoint for the OPM web service used to submit the package for investigation.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	WsURL = "WS_URL"

	// WsKey File path to private certificate key (PKCS#8 DER) used to sign security tokens for the OPM web service.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	WsKey = "WS_KEY"

	// WsCallerinfoAgencyID Provided by OPM representing the caller's agency.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WsCallerinfoAgencyID = "WS_CALLERINFO_AGENCY_ID"

	// WsCallerinfoAgencyUserSSN Provided by OPM representing the caller's agency user making the web service call. The value **should not** be a valid SSN.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WsCallerinfoAgencyUserSSN = "WS_CALLERINFO_AGENCY_USER_SSN"

	// WsCallerinfoAgencyUserPseudossn Flag representing whether or not the caller has an SSN.
	//
	// Target: Back-end (api)
	// Default: *empty*
	// Values: True: `1`, False: `0`
	WsCallerinfoAgencyUserPseudossn = "WS_CALLERINFO_AGENCY_USER_PSEUDOSSN"

	// WsAgencyID Provided by OPM representing the destination agency.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WsAgencyID = "WS_AGENCY_ID"

	// WsAgencyGroupID Provided by OPM representing the destination agency's group.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WsAgencyGroupID = "WS_AGENCY_GROUP_ID"

	// AttachmentsEnabled Flag representing whether or not attachments are allowed.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: True: `1`
	// Values: True: `1`, False: *empty*
	AttachmentsEnabled = "ATTACHMENTS_ENABLED"

	// FileMaximumSize Is the maximum file size of an attachment allowed in bytes.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: 5000000
	FileMaximumSize = "FILE_MAXIMUM_SIZE"

	// FileTypes Allowed file types of an attachment.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: ".tiff;.png;.pdf"
	FileTypes = "FILE_TYPES"

	// IndentJSON set to indent response JSON.
	//
	// Target: Back-end (api)
	// Default: ""
	IndentJSON = "INDENT_JSON"

	// DevUseInsecureCookie wether to use a cookie with Secure set to false in development.
	//
	// Target: Back-end (api)
	// Default: ""
	DevUseInsecureCookie = "DEV_USE_INSECURE_COOKIE"
)
