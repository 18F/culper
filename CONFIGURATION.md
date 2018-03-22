# Configuration

The configuration of both front-end (web application) and the back-end (RESTful API) were designed to be done solely through environment variables. This allows for the maximum amount of flexibility in deployment options and architectures.

Reading through this guide there are a couple of items to note:

 1. Boolean values follow the practice of being *true* when **any value** is present and *false* when **empty**
 2. The use of *curly brackets* (the `{` and `}`) signify placeholders in a value
 3. Italics are used to convey something and are not to be misinterpretted as a value

When running the application using the provided [docker-compose.yml](docker-compose.yml) configuration several of these settings are preconfigured such as database connection information. These may be overridden by specifying the values directly in the `.env` file.

## Overview

| Environment Variable             | Required      | Front-end (web)      | Back-end (api)      |
| -------------------------------- |:-------------:|:--------------------:|:-------------------:|
| [`NODE_ENV`](#NODE_ENV)                  | X             | X                    |                     |
| [`GOLANG_ENV`](#GOLANG_ENV)                | X             |                      | X                   |
| [`LOG_LEVEL`](#LOG_LEVEL)                 |               |                      | X                   |
| [`LOG_FILE`](#LOG_FILE)                  |               |                      | X                   |
| [`LOG_SYSLOG`](#LOG_SYSLOG)                |               |                      | X                   |
| [`LOG_SYSLOG_CERT`](#LOG_SYSLOG_CERT)           |               |                      | X                   |
| [`SESSION_TIMEOUT`](#SESSION_TIMEOUT)           |               |                      | X                   |
| [`API_REDIRECT`](#API_REDIRECT)              |               |                      | X                   |
| [`API_BASE_URL`](#API_BASE_URL)              |               | X                    |                     |
| [`PORT`](#PORT)                      |               |                      | X                   |
| [`HASH_ROUTING`](#HASH_ROUTING)              |               | X                    |                     |
| [`DB_MIGRATION_TARGET`](#DB_MIGRATION_TARGET)       |               |                      | X                   |
| [`DATABASE_URI`](#DATABASE_URI)              |               |                      | X                   |
| [`DATABASE_USER`](#DATABASE_USER)             |               |                      | X                   |
| [`DATABASE_PASSWORD`](#DATABASE_PASSWORD)         |               |                      | X                   |
| [`DATABASE_NAME`](#DATABASE_NAME)             |               |                      | X                   |
| [`DATABASE_HOST`](#DATABASE_HOST)             |               |                      | X                   |
| [`CORS_ALLOWED`](#CORS_ALLOWED)              | X             |                      | X                   |
| [`FLUSH_STORAGE`](#FLUSH_STORAGE)             |               |                      | X                   |
| [`USPS_API_API_KEY`](#USPS_API_API_KEY)          |               |                      | X                   |
| [`JWT_SECRET`](#JWT_SECRET)                | X             |                      | X                   |
| [`BASIC_ENABLED`](#BASIC_ENABLED)             |               | X                    | X                   |
| [`SAML_ENABLED`](#SAML_ENABLED)              |               | X                    | X                   |
| [`SAML_PUBLIC_CERT`](#SAML_PUBLIC_CERT)          |               |                      | X                   |
| [`SAML_PRIVATE_CERT`](#SAML_PRIVATE_CERT)         |               |                      | X                   |
| [`SAML_IDP_SSO_URL`](#SAML_IDP_SSO_URL)          |               |                      | X                   |
| [`SAML_IDP_SSO_DESC_URL`](#SAML_IDP_SSO_DESC_URL)     |               |                      | X                   |
| [`SAML_IDP_PUBLIC_CERT`](#SAML_IDP_PUBLIC_CERT)      |               |                      | X                   |
| [`SAML_SIGN_REQUEST`](#SAML_SIGN_REQUEST)         |               |                      | X                   |
| [`SAML_CONSUMER_SERVICE_URL`](#SAML_CONSUMER_SERVICE_URL) |               |                      | X                   |
| [`DISABLE_2FA`](#DISABLE_2FA)               |               | X                    | X                   |
| [`ALLOW_2FA_RESET`](#ALLOW_2FA_RESET)           |               |                      | X                   |
| [`WINDOW_SIZE`](#WINDOW_SIZE)               |               |                      | X                   |
| [`TLS_CERT`](#TLS_CERT)                  |               |                      | X                   |
| [`TLS_KEY`](#TLS_KEY)                   |               |                      | X                   |
| [`WS_URL`](#WS_URL)                    | X             |                      | X                   |
| [`WS_KEY`](#WS_KEY)                    | X             |                      | X                   |

## `NODE_ENV`

Node environment setting.

 - `test`: used with unit testing and code coverage
 - `development`: for use while developing the application
 - `staging`: environment for various usability tests prior to releasing to production
 - `production`: minify and optimize all possible assets for optimal use

**Target** - Front-end (web)<br>
**Default** - `development`<br>
**Values** - `test` | `development` | `staging` | `production`<br>

## `GOLANG_ENV`

Go environment setting.

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
**Values** - `{protocal}://{host}:{port}`

## `LOG_SYSLOG_CERT`

Providing a path to the PEM certificate will convert all `syslog` communication to use TLS. Only TCP + TLS is supported making the connection string `tcp://logserver:514`.

Logging to `syslog` may be used in conjunction with other logging sources.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SESSION_TIMEOUT`

Session timeout in minutes.

**Target** - Back-end (api)<br>
**Default** - `15`<br>

## `API_REDIRECT`

Frontend URL for the backend to redirect responses to. If this value is not set it will redirect to the same server host but on port 80.

**Target** - Back-end (api)<br>
**Default** - `{server_protocol}://{server_host}`<br>

## `API_BASE_URL`

Backend URL for the frontend to direct requests to.

**Target** - Front-end (web)<br>
**Default** - `{server_protocol}://{server_host}:{server_port}/api`<br>

## `PORT`

Port to use for backend API.

**Target** - Back-end (api)<br>
**Default** - `3000`<br>

## `HASH_ROUTING`

Flag to enable hash routing.

**Target** - Front-end (web)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `DB_MIGRATION_TARGET`

Target a specific database migration step for example, `20180212130825_account_lock.sql`. By specifying a target then when migrations are ran it will try to step down **or** up until the target is reached. By not providing a value migrations will always attempt to go to the latest version.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `DATABASE_URI`

Database connection string (if used do no set other database connection information).

**Target** - Back-end (api)<br>
**Default** - *none*<br>
**Values** - `postgres://{db-username}:{db-password}@{db-host}:5432/{db-name}`<br>

## `DATABASE_USER`

Database user name.

**Target** - Back-end (api)<br>
**Default** - `postgres`<br>

## `DATABASE_PASSWORD`

Database password.

**Target** - Back-end (api)<br>
**Default** - *none*<br>

## `DATABASE_NAME`

Database instance name.

**Target** - Back-end (api)<br>
**Default** - `postgres`<br>

## `DATABASE_HOST`

Database host name and port.

**Target** - Back-end (api)<br>
**Default** - `localhost:5432`<br>

## `CORS_ALLOWED`

Whitelist of address for CORS.

### Examples

| Type               | Example                           |
| ------------------ | --------------------------------- |
| explicit           | http://localhost                  |
| multiple           | http://localhost;https://test.com |
| wildcard           | *                                 |
| regular expression | http[s?]://localhost              |

**Target** - Back-end (api)<br>
**Default** - `(localhost)`<br>

## `FLUSH_STORAGE`

Flag to enable flushing of persisted information upon logging in.

**Target** - Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `USPS_API_API_KEY`

USPS API key for address validation.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `JWT_SECRET`

Secret used for token signing and validation.

**Target** - Back-end (api)<br>
**Default** - *none*<br>

## `BASIC_ENABLED`

Flag to enable basic user/password authentication.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `SAML_ENABLED`

Flag to enable SAML authentication.

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

URL to identity data provider SSO.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_IDP_SSO_DESC_URL`

URL to identity data provider's SSO description.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_IDP_PUBLIC_CERT`

File path (absolute or relative) to identity data provider's public certificate.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `SAML_SIGN_REQUEST`

Flag to enable signing requests.

**Target** - Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `SAML_CONSUMER_SERVICE_URL`

URL to consumer service.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `DISABLE_2FA`

Flag to disable MFA authentication.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `ALLOW_2FA_RESET`

Flag to allow resetting MFA association to an account.

**Target** - Front-end (web), Back-end (api)<br>
**Default** - False: *empty*<br>
**Values** - True: `1`, False: *empty*<br>

## `WINDOW_SIZE`

Window size used in MFA authentication.

**Target** - Back-end (api)<br>
**Default** - `3`<br>

## `TLS_CERT`

File path (absolute or relative) to TLS certificate for use with the backend API.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `TLS_KEY`

File path (absolute or relative) to TLS private key for use the backend API.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `WS_URL`

The endpoint for the OPM web service used for submitting the package for investigation.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>

## `WS_KEY`

File path to private key used to sign security tokens for the OPM web service.

**Target** - Back-end (api)<br>
**Default** - *not enabled*<br>
