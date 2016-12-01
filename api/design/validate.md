FORMAT: 1A

# E-QIP API

# Validate SSN [/validate/ssn/{ssn}]

## Validates Social Security Number [GET]

+ Request
    + Headers

        Authorization: Bearer
        Accept: text/plain

+ Response 200 (application/json)
    + Headers

        X-Eqip-Media-Type: eqip.v1

    + Body

        application/json

+ Response 500

# Validate Passport [/validate/passport/{passport}]

## Validates Passport Number [GET]

+ Request
    + Headers

        Authorization: Bearer
        Accept: text/plain

+ Response 200 (application/json)
    + Headers

        X-Eqip-Media-Type: eqip.v1

    + Body

        application/json

+ Response 500

# Validate Adddress [/validate/address]

## Validates complete address [POST]

+ Request
    + Headers

        Authorization: Bearer
        Accept: text/plain

+ Response 200 (application/json)
    + Headers

        X-Eqip-Media-Type: eqip.v1

    + Body

        application/json

+ Response 500

# Validate City [/validate/address/city/{city}]

## Validates a city entry [GET]

+ Request
    + Headers

        Authorization: Bearer
        Accept: text/plain

+ Response 200 (application/json)
    + Headers

        X-Eqip-Media-Type: eqip.v1

    + Body

        application/json

+ Response 500

# Validate Zipcode [/validate/address/zipcode/{zipcode}]

## Validates a zipcode entry [GET]

+ Request
    + Headers

        Authorization: Bearer
        Accept: text/plain

+ Response 200 (application/json)
    + Headers

        X-Eqip-Media-Type: eqip.v1

    + Body

        application/json

+ Response 500

# Validate State [/validate/address/state/{state}]

## Validates a state entry [GET]

+ Request
    + Headers

        Authorization: Bearer
        Accept: text/plain

+ Response 200 (application/json)
    + Headers

        X-Eqip-Media-Type: eqip.v1

    + Body

        application/json

+ Response 500
