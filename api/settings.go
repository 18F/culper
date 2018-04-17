package api

type Settings interface {
	Configure()
	Has(string) bool
	String(string) string
	True(string) bool
	Int(string) int
}

const (
	// NODE_ENV Sets the Node environment to configure the application for a specific uses:
	//
	//  - `test`: used with unit testing and code coverage
	//  - `development`: for use while developing the application
	//  - `staging`: environment for various usability tests prior to releasing to production
	//  - `production`: minify and optimize all possible assets for optimal use
	//
	// Target: Front-end (web)
	// Default: `development`
	// Values: `test` | `development` | `staging` | `production`
	NODE_ENV = "NODE_ENV"

	// GOLANG_ENV Sets the Go environment to configure the application for specific uses:
	//
	//  - `test`: used with unit testing and code coverage
	//  - `development`: for use while developing the application
	//  - `staging`: environment for various usability tests prior to releasing to production
	//  - `production`: compiled for production use only minimum required assets (does **not** include test accounts)
	//
	// Target: Back-end (api)
	// Default: `development`
	// Values: `test` | `development` | `staging` | `production`
	GOLANG_ENV = "GOLANG_ENV"

	// LOG_LEVEL Log level for the back-end API. The default source for logging will be standard outputs (`stdout` and `stderr`).
	//
	// Target: Back-end (api)
	// Default: `warning`
	// Values: `debug` | `info` | `warning` | `error` | `fatal` | `panic`
	LOG_LEVEL = "LOG_LEVEL"

	// LOG_FILE Path to the local file system log file.
	//
	// Logging to file may be used in conjunction with other logging sources.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	LOG_FILE = "LOG_FILE"

	// LOG_SYSLOG Connection string for a `syslog` server such as `udp://logserver:514`. Both TCP and UDP are supported.
	//
	// Logging to `syslog` may be used in conjunction with other logging sources.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	// Values: `{protocal}://{host}:{port}`
	LOG_SYSLOG = "LOG_SYSLOG"

	// LOG_SYSLOG_CERT Providing a path to the PEM certificate will convert all `syslog` communication to use TLS. Only TCP + TLS is supported making the connection string `tcp://logserver:514`.
	//
	// Logging to `syslog` may be used in conjunction with other logging sources.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	LOG_SYSLOG_CERT = "LOG_SYSLOG_CERT"

	// SESSION_TIMEOUT Session timeout in minutes. Periods of inactivity falling outside of the threshold will be considered invalid and are required to be re-authenticated.
	//
	// Target: Back-end (api)
	// Default: `15`
	SESSION_TIMEOUT = "SESSION_TIMEOUT"

	// API_REDIRECT Front-end URL for the back-end to redirect responses to. If this value is not set it will redirect to the same server host but on port 80.
	//
	// Target: Back-end (api)
	// Default: `{server_protocol}://{server_host}`
	API_REDIRECT = "API_REDIRECT"

	// API_BASE_URL Back-end URL for the front-end to direct requests to.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: `{server_protocol}://{server_host}:{server_port}/api`
	API_BASE_URL = "API_BASE_URL"

	// PORT Port to use for back-end API.
	//
	// Target: Back-end (api)
	// Default: `3000`
	PORT = "PORT"

	// HASH_ROUTING Flag to enable hash routing. This should only be used in scenarios where push state is not an option.
	//
	// Target: Front-end (web)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	HASH_ROUTING = "HASH_ROUTING"

	// DB_MIGRATION_TARGET Target a specific database migration step for example, `20180212130825_account_lock.sql`. By specifying a target then when migrations are ran it will try to step down **or** up until the target is reached. By not providing a value migrations will always attempt to go to the latest version.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	DB_MIGRATION_TARGET = "DB_MIGRATION_TARGET"

	// DATABASE_URI PostgreSQL database connection string. If a value is set do no set other database connection information.
	//
	// Target: Back-end (api)
	// Default: *none*
	// Values: `postgres://{db-username}:{db-password}@{db-host}:5432/{db-name}`
	DATABASE_URI = "DATABASE_URI"

	// DATABASE_USER PostgreSQL database user name.
	//
	// Target: Back-end (api)
	// Default: `postgres`
	DATABASE_USER = "DATABASE_USER"

	// DATABASE_PASSWORD PostgreSQL database password.
	//
	// Target: Back-end (api)
	// Default: *none*
	DATABASE_PASSWORD = "DATABASE_PASSWORD"

	// DATABASE_NAME PostgreSQL database instance name.
	//
	// Target: Back-end (api)
	// Default: `postgres`
	DATABASE_NAME = "DATABASE_NAME"

	// DATABASE_HOST PostgreSQL database host name and port.
	//
	// Target: Back-end (api)
	// Default: `localhost:5432`
	DATABASE_HOST = "DATABASE_HOST"

	// CORS_ALLOWED Whitelist of address(es) for cross-origin resource sharing (CORS). CORS restricts resources (e.g. fonts, scripts, images) on a web page to be requested from another domain outside of the domain from which it is served.
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
	CORS_ALLOWED = "CORS_ALLOWED"

	// FLUSH_STORAGE Flag to enable flushing of persisted information for an account during the logon process.
	//
	// Target: Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	FLUSH_STORAGE = "FLUSH_STORAGE"

	// USPS_API_API_KEY United States Postal Service (USPS) API key for address validation.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	USPS_API_API_KEY = "USPS_API_API_KEY"

	// JWT_SECRET The HS512 algorithm is used to sign each JavaScript Web Token using a secret random key of at least 512-bits. For example, `openssl rand 64 | base64 --wrap=0` generates an appropriate key. If this value is not specified, one will be automatically generated unique to the instance.
	//
	// Target: Back-end (api)
	// Default: *none*
	JWT_SECRET = "JWT_SECRET"

	// BASIC_ENABLED Flag to enable basic username and password authentication.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	BASIC_ENABLED = "BASIC_ENABLED"

	// SAML_ENABLED Flag to enable SAML authentication.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	SAML_ENABLED = "SAML_ENABLED"

	// SAML_PUBLIC_CERT File path (absolute or relative) to SAML public certificate.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SAML_PUBLIC_CERT = "SAML_PUBLIC_CERT"

	// SAML_PRIVATE_CERT File path (absolute or relative) to SAML private certificate.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SAML_PRIVATE_CERT = "SAML_PRIVATE_CERT"

	// SAML_IDP_SSO_URL Endpoint to SAML 2.0 Single Sign-On (SSO) identity provider. The client will be redirected to this URL to complete the authentication process. This value will be provided by the IdAM configuration settings.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SAML_IDP_SSO_URL = "SAML_IDP_SSO_URL"

	// SAML_IDP_SSO_DESC_URL The identity provider's issuer URL. This value will be provided by the IdAM configuration settings.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SAML_IDP_SSO_DESC_URL = "SAML_IDP_SSO_DESC_URL"

	// SAML_IDP_PUBLIC_CERT File path (absolute or relative) to identity data provider's public certificate (X.509 PEM) used to verify the authentication response signature. This certificate will be provided by the IdAM solution.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	SAML_IDP_PUBLIC_CERT = "SAML_IDP_PUBLIC_CERT"

	// SAML_SIGN_REQUEST Flag to enable signing of SAML 2.0 requests.
	//
	// Target: Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	SAML_SIGN_REQUEST = "SAML_SIGN_REQUEST"

	// SAML_CONSUMER_SERVICE_URL Endpoint for assertion consumer service. After authentication is completed the customer will be redirected to this endpoint for local processes to verify and handle the response.
	//
	// Target: Back-end (api)
	// Default: `{API_BASE_URL}/auth/saml/callback`
	SAML_CONSUMER_SERVICE_URL = "SAML_CONSUMER_SERVICE_URL"

	// DISABLE_2FA Flag to disable multiple factor authentication (MFA) authentication.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	DISABLE_2FA = "DISABLE_2FA"

	// ALLOW_2FA_RESET Flag to allow resetting multiple factor authentication (MFA) association to an account.
	//
	// Target: Front-end (web), Back-end (api)
	// Default: False: *empty*
	// Values: True: `1`, False: *empty*
	ALLOW_2FA_RESET = "ALLOW_2FA_RESET"

	// WINDOW_SIZE Window size used in multiple factor authentication (MFA) authentication. Valid range from 0 to 100 but values beyond 3 through 5 are considered bad security practices.
	//
	// Target: Back-end (api)
	// Default: `3`
	WINDOW_SIZE = "WINDOW_SIZE"

	// TLS_CERT File path (absolute or relative) to TLS public certificate (X.509 PEM) certificate for use with the back-end API.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	TLS_CERT = "TLS_CERT"

	// TLS_KEY File path (absolute or relative) to TLS private key (X.509 PEM) for use the back-end API.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	TLS_KEY = "TLS_KEY"

	// WS_URL The endpoint for the OPM web service used to submit the package for investigation.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	WS_URL = "WS_URL"

	// WS_KEY File path to private certificate key (PKCS#8 DER) used to sign security tokens for the OPM web service.
	//
	// Target: Back-end (api)
	// Default: *not enabled*
	WS_KEY = "WS_KEY"

	// WS_CALLERINFO_AGENCY_ID Provided by OPM representing the caller's agency.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WS_CALLERINFO_AGENCY_ID = "WS_CALLERINFO_AGENCY_ID"

	// WS_CALLERINFO_AGENCY_USER_SSN Provided by OPM representing the caller's agency user making the web service call. The value **should not** be a valid SSN.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WS_CALLERINFO_AGENCY_USER_SSN = "WS_CALLERINFO_AGENCY_USER_SSN"

	// WS_CALLERINFO_AGENCY_USER_PSEUDOSSN Flag representing whether or not the caller has an SSN.
	//
	// Target: Back-end (api)
	// Default: *empty*
	// Values: True: `1`, False: `0`
	WS_CALLERINFO_AGENCY_USER_PSEUDOSSN = "WS_CALLERINFO_AGENCY_USER_PSEUDOSSN"

	// WS_AGENCY_ID Provided by OPM representing the destination agency.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WS_AGENCY_ID = "WS_AGENCY_ID"

	// WS_AGENCY_GROUP_ID Provided by OPM representing the destination agency's group.
	//
	// Target: Back-end (api)
	// Default: *empty*
	WS_AGENCY_GROUP_ID = "WS_AGENCY_GROUP_ID"

	// FILE_MAXIMUM_SIZE
	//
	// Target: Front-end (web), Back-end (api)
	// Default: 5000000
	FILE_MAXIMUM_SIZE = "FILE_MAXIMUM_SIZE"

	// FILE_TYPES
	//
	// Target: Front-end (web), Back-end (api)
	// Default: ".tiff;.png;.pdf"
	FILE_TYPES = "FILE_TYPES"
)
