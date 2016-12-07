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

      {
        "Errors": [
          {
            "Fieldname": "SSN",
            "Errors": [
              {
                "Fieldname": "First",
                "Error": "First is a required field"
              },
              {
                "Fieldname": "Middle",
                "Error": "Middle is a required field"
              },
              {
                "Fieldname": "Last",
                "Error": "Last is a required field"
              }
            ]
          }
        ]
      }


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

      {
        "Errors": [
          {
            "Fieldname": "Passport",
            "Error": ""
          }
        ]
      }

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

      {
        "Errors": [
          {
            "Fieldname": "Address",
            "Error": ""
          },
          {
            "Fieldname": "Street",
            "Error": ""
          },
          {
            "Fieldname": "City",
            "Error": ""
          },
          {
            "Fieldname": "State",
            "Error": ""
          },
          {
            "Fieldname": "Zipcode",
            "Error": ""
          },
          {
            "Fieldname": "County",
            "Error": ""
          },
          {
            "Fieldname": "Country",
            "Error": "",
            "Suggestions": []
          }
        ]
      }

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
      {
        "Errors": [
          {
            "Fieldname": "City",
            "Error": ""
          }
        ]
      }

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

    {
      "Errors": [
        {
          "Fieldname": "Zipcode",
          "Error": ""
        }
      ]
    }


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

    {
      "Errors": [
        {
          "Fieldname": "State",
          "Error": ""
        }
      ]
    }

+ Response 500
