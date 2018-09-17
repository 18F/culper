import LocationValidator, { Geocoder } from './location'
import Location from '../components/Form/Location'
import { api } from '../services/api'
import MockAdapter from 'axios-mock-adapter'

describe('the location component', function() {
  it('should validate locations', function() {
    const tests = [
      {
        data: {
          city: 'A-Town',
          state: 'VA',
          county: 'Arlington',
          country: { value: 'United States' },
          layout: Location.BIRTHPLACE
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: { value: 'Germany' },
          layout: Location.BIRTHPLACE
        },
        expected: true
      },
      {
        data: {
          city: 'A-Town',
          state: 'VA',
          country: { value: 'United States' },
          layout: Location.BIRTHPLACE_WITHOUT_COUNTY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: { value: 'Germany States' },
          layout: Location.BIRTHPLACE_WITHOUT_COUNTY
        },
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          country: { value: 'United States' },
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
          country: { value: 'Germany' },
          layout: Location.STREET_CITY_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: { value: 'Germany' },
          layout: Location.CITY_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          country: { value: 'United States' },
          layout: Location.CITY_STATE_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          state: '',
          country: { value: 'Germany' },
          layout: Location.CITY_STATE_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: { value: 'Germany' },
          layout: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).isValid(test.fields)).toBe(
        test.expected
      )
    })
  })

  it('should validate fields', function() {
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
          country: { value: 'United States' }
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
      expect(new LocationValidator(test.data).validFields(test.fields)).toBe(
        test.expected
      )
    })
  })

  it('should check if international', function() {
    const tests = [
      {
        data: {
          country: { value: 'United States' }
        },
        expected: false
      },
      {
        data: {
          country: { value: 'POSTOFFICE' }
        },
        expected: false
      },
      {
        data: {
          country: { value: 'Germany' }
        },
        expected: true
      },
      {
        data: {},
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).isInternational()).toBe(
        test.expected
      )
    })
  })

  it('should check if it can geocode', function() {
    const tests = [
      {
        data: {
          street: '123 Some Rd',
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          county: 'Thecountry',
          country: { value: 'United States' },
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
          county: 'Thecounty',
          country: { value: 'United States' },
          layout: Location.US_ADDRESS
        },
        expected: true
      },
      {
        data: {
          street: '123 Some Rd',
          city: 'Arlington',
          country: { value: 'United States' }
        },
        expected: false
      },
      {
        data: {
          street: '123 Some Rd',
          city: 'Arlington',
          country: { value: 'United States' },
          layout: Location.CITY_STATE_COUNTRY
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).canGeocode()).toBe(test.expected)
    })
  })

  it('should handle geocode errors', function() {
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
      expect(new Geocoder(test.data).isSystemError(test.data)).toBe(
        test.expected
      )
    })
  })

  it('should handle system errors', async () => {
    const test = {
      state: {
        addressType: 'United States',
        address: '1234 Some Rd',
        city: 'Arlington',
        state: 'VA',
        zipcode: '22202'
      },
      expected: {
        Errors: [
          {
            Error: 'error.geocode.system'
          }
        ]
      }
    }

    api.setToken('my-token')
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/validate').reply(200, {
      Errors: [
        {
          Error: 'error.geocode.system'
        }
      ]
    })
    return new LocationValidator(test.state, null)
      .geocode()
      .then(r => {})
      .catch(r => {
        expect(r).toEqual(test.expected)
      })
  })

  it('should handle geocode', async () => {
    const test = {
      state: {
        country: { value: 'United States' },
        street: '1234 Some Rd',
        city: 'Arlington',
        state: 'VA',
        zipcode: '22202'
      },
      expected: {
        Errors: [
          {
            Error: 'error.geocode.partial'
          }
        ]
      }
    }

    api.setToken('my-token')
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/validate').reply(200, {
      Errors: [
        {
          Error: 'error.geocode.partial'
        }
      ]
    })
    return new LocationValidator(test.state, null)
      .geocode()
      .then(r => {})
      .catch(r => {
        expect(r).toEqual(test.expected)
      })
  })

  it('should handle empty error', async () => {
    const test = {
      state: {
        country: { value: 'United States' },
        street: '1234 Some Rd',
        city: 'Arlington',
        state: 'VA',
        zipcode: '22202'
      },
      expected: {
        Errors: []
      }
    }

    api.setToken('my-token')
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/validate').reply(200, {
      Errors: []
    })
    return new LocationValidator(test.state, null)
      .geocode()
      .then(r => {})
      .catch(r => {
        expect(r).toEqual(test.expected)
      })
  })

  it('should validate zipcode', function() {
    const tests = [
      {
        state: {
          country: { value: 'United States' },
          street: '1234 Some Rd',
          city: 'Arlington',
          state: 'VA',
          zipcode: '2'
        },
        expected: false
      },
      {
        state: {
          country: { value: 'United States' },
          street: '1234 Some Rd',
          city: 'Arlington',
          state: 'VA',
          zipcode: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.state, null).validZipcode()).toEqual(
        test.expected
      )
    })
  })

  it.only('should validate zipcode is in correct state if in US', function() {
    const tests = [
      {
        state: {
          country: { value: 'United States' },
          street: '1 Great Teen Drama Dr.',
          city: 'Beverly Hills',
          state: 'CA',
          zipcode: '90210'
        },
        expected: true
      },
      {
        state: {
          country: { value: 'United States' },
          street: '1234 Some Rd',
          city: 'Arlington',
          state: 'VA',
          zipcode: '90210'
        },
        expected: false
      },
      {
        state: {
          country: { value: 'Outside US' },
          street: '1234 Some Rd',
          city: 'City',
          state: 'NOTUS',
          zipcode: '12321'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new LocationValidator(test.state, null).validZipcodeState()
      ).toEqual(test.expected)
    })
  })
})
