# Configuration

The configuration of both front-end (web application) and the back-end (RESTful API) were designed to be done solely through environment variables. This allows for the maximum amount of flexibility in deployment options and architectures.

Reading through this guide there are a couple of items to note:

 1. Boolean values follow the practice of being *true* when **any value** is present and *false* when **empty**
 2. The use of *curly brackets* (the `{` and `}`) signify placeholders in a value
 3. Italics are used to convey something and are not to be misinterpreted as a value

When running the application using the provided [docker-compose.yml](docker-compose.yml) configuration several of these settings are preconfigured such as database connection information. These may be overridden by specifying the values directly in the `.env` file.

## Overview

| Environment Variable                       | Required        | Front-end (web)        | Back-end (api)        |
| --------------------------------           | :-------------: | :--------------------: | :-------------------: |
| [`NODE_ENV`](#node_env)                            | X               | X                      |                       |
| [`GOLANG_ENV`](#golang_env)                          | X               |                        | X                     |
| [`LOG_LEVEL`](#log_level)                           |                 |                        | X                     |
| [`LOG_FILE`](#log_file)                            |                 |                        | X                     |
| [`LOG_SYSLOG`](#log_syslog)                          |                 |                        | X                     |
| [`LOG_SYSLOG_CERT`](#log_syslog_cert)                     |                 |                        | X                     |
| [`SESSION_TIMEOUT`](#session_timeout)                     |                 | X                      | X                     |
| [`API_REDIRECT`](#api_redirect)                        |                 |                        | X                     |
| [`API_BASE_URL`](#api_base_url)                        | X               | X                      | X                     |
| [`PORT`](#port)                                |                 |                        | X                     |
| [`HASH_ROUTING`](#hash_routing)                        |                 | X                      |                       |
| [`DB_MIGRATION_TARGET`](#db_migration_target)                 |                 |                        | X                     |
| [`DATABASE_URI`](#database_uri)                        |                 |                        | X                     |
| [`DATABASE_USER`](#database_user)                       |                 |                        | X                     |
| [`DATABASE_PASSWORD`](#database_password)                   |                 |                        | X                     |
| [`DATABASE_NAME`](#database_name)                       |                 |                        | X                     |
| [`TEST_DATABASE_NAME`](#test_database_name)                       |                 |                        | X                     |
| [`DATABASE_HOST`](#database_host)                       |                 |                        | X                     |
| [`DATABASE_SSLMODE`](#database_sslmode)                       |                 |                        | X                     |
| [`CORS_ALLOWED`](#cors_allowed)                        | X               |                        | X                     |
| [`CORS_MAX_AGE`](#cors_max_age)                    |                 |                        | X                     |
| [`FLUSH_STORAGE`](#flush_storage)                       |                 |                        | X                     |
| [`USPS_API_API_KEY`](#usps_api_api_key)                    |                 |                        | X                     |
| [`CSRF_SECRET`](#csrf_secret)                          | X               |                        | X                     |
| [`BASIC_ENABLED`](#basic_enabled)                       |                 | X                      | X                     |
| [`SAML_ENABLED`](#saml_enabled)                        |                 | X                      | X                     |
| [`SAML_SLO_ENABLED`](#saml_slo_enabled)                        |                 | X                      | X                     |
| [`SAML_PUBLIC_CERT`](#saml_public_cert)                    |                 |                        | X                     |
| [`SAML_PRIVATE_CERT`](#saml_private_cert)                   |                 |                        | X                     |
| [`SAML_IDP_SSO_URL`](#saml_idp_sso_url)                    |                 |                        | X                     |
| [`SAML_IDP_SSO_DESC_URL`](#saml_idp_sso_desc_url)               |                 |                        | X                     |
| [`SAML_IDP_PUBLIC_CERT`](#saml_idp_public_cert)                |                 |                        | X                     |
| [`SAML_SIGN_REQUEST`](#saml_sign_request)                   |                 |                        | X                     |
| [`SAML_CONSUMER_SERVICE_URL`](#saml_consumer_service_url)           |                 |                        | X                     |
| [`TLS_CERT`](#tls_cert)                            |                 |                        | X                     |
| [`TLS_KEY`](#tls_key)                             |                 |                        | X                     |
| [`WS_ENABLED`](#ws_enabled)                              | X               |                        | X                     |
| [`WS_URL`](#ws_url)                              | X               |                        | X                     |
| [`WS_KEY`](#ws_key)                              | X               |                        | X                     |
| [`WS_CALLERINFO_AGENCY_ID`](#ws_callerinfo_agency_id)             | X               |                        | X                     |
| [`WS_CALLERINFO_AGENCY_USER_SSN`](#ws_callerinfo_agency_user_ssn)       | X               |                        | X                     |
| [`WS_CALLERINFO_AGENCY_USER_PSEUDOSSN`](#ws_callerinfo_agency_user_pseudossn) | X               |                        | X                     |
| [`WS_AGENCY_ID`](#ws_agency_id)                        | X               |                        | X                     |
| [`WS_AGENCY_GROUP_ID`](#ws_agency_group_id)                  | X               |                        | X                     |
| [`ATTACHMENTS_ENABLED`](#attachments_enabled)                          |                 | X                      | X                     |
| [`FILE_MAXIMUM_SIZE`](#file_maximum_size)                   |                 | X                      | X                     |
| [`FILE_TYPES`](#file_types)                          |                 | X                      | X                     |
| [`INDENT_JSON`](#indent_json)                    |                 |                        | X                     |
| [`DEV_USE_INSECURE_COOKIE`](#dev_use_insecure_cookie)                    |                 |                        | X                     |

## `NODE_ENV`

Sets the Node environment to configure the application for a specific uses:

 - `test`: used with unit testing and code coverage
 - `development`: for use while developing the application
 - `staging`: environment for various usability tests prior to releasing to production
 - `production`: minify and optimize all possible assets for optimal use

**Target** - Front-end (web)<br>
**Default** - `development`<br>
**Values** - `test` | `development` | `staging` | `production`<br>

## `GOLANG_ENV`

Sets the Go environment to configure the application for specific uses:

 - `test`: used with unit testing and code coverage
 - `development`: for use while developing the application
 - `staging`: environment for various usability tests prior to releasing to production
 - `production`: compiled for production use only minimum required assets (does **not** include test accounts)

**Target** - Back-end (api)<br>
**Default** - `development`<br>
**Values** - `test` | `development` | `staging` | `production`<br>

## `LOG_LEVEL`

Log level for the back-end API. The default source for logging will be standard outputs (`stdout` and `stderr`).

**Target** - Back-end (api)<br>
**Default** - `warning`<br>
**Values** - `debug` | `info` | `warning` | `error` | `fatal` | `panic`<br>

## `LOG_FILE`

Path to the local file system log file.

Logging to file may be used in conjunction with other logging sources.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `LOG_SYSLOG`

Connection string for a `syslog` server such as `udp://logserver:514`. Both TCP and UDP are supported.

Logging to `syslog` may be used in conjunction with other logging sources.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>
**Values** - `{protocol}://{host}:{port}`

## `LOG_SYSLOG_CERT`

Providing a path to the PEM certificate will convert all `syslog` communication to use TLS. Only TCP + TLS is supported making the connection string `tcp://logserver:514`.

Logging to `syslog` may be used in conjunction with other logging sources.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SESSION_TIMEOUT`

Session timeout in minutes. Periods of inactivity falling outside of the threshold will be considered invalid and are required to be re-authenticated.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - `15`<br>

## `API_REDIRECT`

Front-end URL for the back-end to redirect responses to. If this value is not set it will redirect to the same server host but on port 80.

**Target** - Back-end (api)<br>
**Default** - `{server_protocol}://{server_host}`<br>

## `API_BASE_URL`

Back-end URL for the front-end to direct requests to.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - `{server_protocol}://{server_host}:{server_port}/api`<br>

## `PORT`

Port to use for back-end API.

**Target** - Back-end (api)<br>
**Default** - `3000`<br>

## `HASH_ROUTING`

Flag to enable hash routing. This should only be used in scenarios where push state is not an option.

**Target** - Front-end (web)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `DB_MIGRATION_TARGET`

Target a specific database migration step for example, `20180212130825_account_lock.sql`. By specifying a target then when migrations are ran it will try to step down **or** up until the target is reached. By not providing a value migrations will always attempt to go to the latest version.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `DATABASE_URI`

PostgreSQL database connection string. If a value is set do no set other database connection information.

**Target** - Back-end (api)<br>
**Default** - *none*<br>
**Values** - `postgres://{db-username}:{db-password}@{db-host}:5432/{db-name}`<br>

## `DATABASE_USER`

PostgreSQL database user name.

**Target** - Back-end (api)<br>
**Default** - `postgres`<br>

## `DATABASE_PASSWORD`

PostgreSQL database password.

**Target** - Back-end (api)<br>
**Default** - *none*<br>

## `DATABASE_NAME`

PostgreSQL database instance name.

**Target** - Back-end (api)<br>
**Default** - `postgres`<br>

## `TEST_DATABASE_NAME`

PostgreSQL database instance name for running any tests that require a database.

**Target** - Back-end (api)<br>
**Default** - `eapp_test`<br>

## `DATABASE_HOST`

PostgreSQL database host name and port.

**Target** - Back-end (api)<br>
**Default** - `localhost:5432`<br>

## `DATABASE_SSLMODE`

The PostgreSQL sslmode to use to connect to the db.

**Target** - Back-end (api)<br>
**Default** - `require`<br>

## `CORS_ALLOWED`

Whitelist of address(es) for cross-origin resource sharing (CORS). CORS restricts resources (e.g. fonts, scripts, images) on a web page to be requested from another domain outside of the domain from which it is served.

### Examples

| Type               | Example                            |
| ------------------ | ---------------------------------- |
| explicit           | http://localhost                   |
| multiple           | http://localhost;https://test\.com |
| wildcard           | *                                  |
| regular expression | https?://localhost               |

**Target** - Back-end (api)<br>
**Default** - *empty*<br>

## `CORS_MAX_AGE`

Sets the `Access-Control-Max-Age` header in the response to a cross-origin
resources sharing (CORS) preflight request (i.e., `HTTP OPTIONS`).

The value indicates the number of seconds the preflight results should be
cached by the browser. Chrome caps maximum age to 10 minutes. FireFox caps
it to 24 hours. Safari caps it to 5 minutes.

Preflight caching is done against the host/URL/headers. Setting this to zero
will disable the browser preflight cache and result in every CORS call being
preceeded by a preflight HTTP OPTIONS request.

**Target** - Back-end (api)<br>
**Default** - `600`<br>


## `FLUSH_STORAGE`

Flag to enable flushing of persisted information for an account during the logon process.

**Target** - Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `USPS_API_API_KEY`

United States Postal Service (USPS) API key for address validation.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `CSRF_SECRET`

Tokens generated for CSRF protection are digitally signed using a secret random key of at least 256-bits.
For example, `openssl rand -base64 32` generates an appropriate key. If this value is not specified, 
one will be automatically generated unique to the instance, but then different instances will not be able to read 
each other's cookies. 

**Target** - Back-end (api)<br>
**Default** - *none*<br>

## `BASIC_ENABLED`

Flag to enable basic username and password authentication.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `SAML_ENABLED`

Flag to enable SAML authentication.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `SAML_SLO_ENABLED`

Flag to enable SAML Single Logout (SLO). If enabled, when the user logs out of eApp, a signed SLO request will be sent to the server endpoint defined by `SAML_IDP_SSO_URL`.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `SAML_PUBLIC_CERT`

File path (absolute or relative) to SAML public certificate.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_PRIVATE_CERT`

File path (absolute or relative) to SAML private certificate.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_IDP_SSO_URL`

Endpoint to SAML 2.0 Single Sign-On (SSO) identity provider. The client will be redirected to this URL to complete the authentication process. This value will be provided by the IdAM configuration settings.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_IDP_SSO_DESC_URL`

The identity provider's issuer URL. This value will be provided by the IdAM configuration settings.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_IDP_PUBLIC_CERT`

File path (absolute or relative) to identity data provider's public certificate (X.509 PEM) used to verify the authentication response signature. This certificate will be provided by the IdAM solution.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_SIGN_REQUEST`

Flag to enable signing of SAML 2.0 requests. The target identity provider (IdP) should be configured to verify authentication requests against trusted public certificates; e.g., `SAML_PUBLIC_CERT`.

**Target** - Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `SAML_CONSUMER_SERVICE_URL`

Endpoint for assertion consumer service. After authentication is completed the customer will be redirected to this endpoint for local processes to verify and handle the response.

**Target** - Back-end (api)<br>
**Default** - `{API_BASE_URL}/auth/saml/callback`<br>

## `TLS_CERT`

File path (absolute or relative) to TLS public certificate (X.509 PEM) certificate for use with the back-end API.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `TLS_KEY`

File path (absolute or relative) to TLS private key (X.509 PEM) for use the back-end API.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `WS_ENABLED`

Determines whether to enabled the submission to the eqip webservice

**Target** - Back-end (api)<br>
**Default** - True<br>
**Values** - True: `1`, False: `0`<br>

## `WS_URL`

The endpoint for the OPM web service used to submit the package for investigation.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `WS_KEY`

File path to private certificate key (PKCS#8 DER) used to sign security tokens for the OPM web service.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `WS_CALLERINFO_AGENCY_ID`

Provided by OPM representing the caller's agency.

**Target** - Back-end (api)<br>
**Default** - *empty*<br>

## `WS_CALLERINFO_AGENCY_USER_SSN`

Provided by OPM representing the caller's agency user making the web service call. The value **should not** be a valid SSN.

**Target** - Back-end (api)<br>
**Default** - *empty*<br>

## `WS_CALLERINFO_AGENCY_USER_PSEUDOSSN`

Flag representing whether or not the caller has an SSN.

**Target** - Back-end (api)<br>
**Default** - *empty*<br>
**Values** - True: `1`, False: `0`<br>

## `WS_AGENCY_ID`

Provided by OPM representing the destination agency.

**Target** - Back-end (api)<br>
**Default** - *empty*<br>

## `WS_AGENCY_GROUP_ID`

Provided by OPM representing the destination agency's group.

**Target** - Back-end (api)<br>
**Default** - *empty*<br>

## `ATTACHMENTS_ENABLED`

Flag to enable uploading and management of attachments within the application.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - True: `1`<br>
**Values** - True: `1`, False: *empty*<br>

## `FILE_MAXIMUM_SIZE`

Maximum file size allowed for attachment files. This also needs to be applied to any additional configurations such as proxies or web servers which are in front of the services.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - `5000000`<br>

## `FILE_TYPES`

Allowed file extensions for attachments.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - `.tiff;.png;.pdf`<br>

## `INDENT_JSON`

Set this to indent the JSON response to /form

**Target** - Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `DEV_USE_INSECURE_COOKIE`

For local development without SSL enabled, set the cookie to be Secure: false so it will be transmitted over http

**Target** - Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>
