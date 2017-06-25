import LocationValidator, { Geocoder } from './location'
import Location from '../components/Form/Location'

describe('the location component', function () {
  it('should validate locations', function () {
    const tests = [
      {
        data: {
          city: 'A-Town',
          state: 'VA',
          county: 'Arlington',
          country: 'United States',
          layout: Location.BIRTHPLACE
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany',
          layout: Location.BIRTHPLACE
        },
        expected: true
      },
      {
        data: {
          city: 'A-Town',
          state: 'VA',
          country: 'United States',
          layout: Location.BIRTHPLACE_WITHOUT_COUNTY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany States',
          layout: Location.BIRTHPLACE_WITHOUT_COUNTY
        },
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          country: 'United States',
          layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
        },
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          layout: Location.CITY_STATE
        },
        expected: true
      },
      {
        data: {
          street: '123 Some rd',
          city: 'Arlington',
          country: 'Germany',
          layout: Location.STREET_CITY_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany',
          layout: Location.CITY_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          country: 'United States',
          layout: Location.CITY_STATE_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          state: '',
          country: 'Germany',
          layout: Location.CITY_STATE_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany',
          layout: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).isValid(test.fields)).toBe(test.expected)
    })
  })

  it('should validate fields', function () {
    const tests = [
      {
        data: {
          city: 'Arlington'
        },
        fields: ['city'],
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          county: 'Thecountry',
          country: 'United States'
        },
        fields: ['city', 'state', 'county', 'country'],
        expected: true
      },
      {
        data: {},
        fields: [],
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).validFields(test.fields)).toBe(test.expected)
    })
  })

  it('should check if international', function () {
    const tests = [
      {
        data: {
          country: 'United States'
        },
        expected: false
      },
      {
        data: {
          country: 'POSTOFFICE'
        },
        expected: false
      },
      {
        data: {
          country: 'Germany'
        },
        expected: true
      },
      {
        data: {},
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).isInternational()).toBe(test.expected)
    })
  })

  it('should check if it can geocode', function () {
    const tests = [
      {
        data: {
          street: '123 Some Rd',
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          county: 'Thecountry',
          country: 'United States',
          layout: Location.ADDRESS
        },
        expected: true
      },
      {
        data: {
          street: '123 Some Rd',
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          county: 'Thecountry',
          country: 'United States',
          layout: Location.US_ADDRESS
        },
        expected: true
      },
      {
        data: {
          street: '123 Some Rd',
          city: 'Arlington',
          country: 'United States'
        },
        expected: false
      },
      {
        data: {
          street: '123 Some Rd',
          city: 'Arlington',
          country: 'United States',
          layout: Location.CITY_STATE_COUNTRY
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).canGeocode()).toBe(test.expected)
    })
  })

  it('should handle geocode errors', function () {
    const tests = [
      {
        data: {
          Errors: [
            {
              Error: 'error.geocode.system'
            }
          ]
        },
        expected: true
      },
      {
        data: {
          Errors: []
        },
        expected: false
      },
      {
        data: {
          Errors: [
            {
              Error: 'error.geocode.city'
            }
          ]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new Geocoder(test.data).isSystemError(test.data)).toBe(test.expected)
    })
  })
})
