import AddressValidator from './address'
import { api } from '../services/api'
import MockAdapter from 'axios-mock-adapter'

describe('Address component validation', function () {
  it('should validate address information', function () {
    const tests = [
      {
        state: {
          addressType: 'United States',
          address: '1234 Some Rd',
          city: 'Arlington',
          state: 'Virginia',
          zipcode: '22202'
        },
        expected: true
      },
      {
        state: {
          addressType: 'United States',
          address: '1234 Some Rd',
          city: '',
          state: 'Virginia',
          zipcode: '22202'
        },
        expected: false
      },
      {
        state: {
          addressType: 'International',
          address: '1234 Some Rd',
          city: 'Munich',
          country: 'Germany'
        },
        expected: true
      },
      {
        state: {
          addressType: 'International',
          address: '1234 Some Rd',
          city: '',
          country: 'Germany'
        },
        expected: false
      },
      {
        state: {
          addressType: 'APOFPO',
          address: '1234 Some Rd',
          state: 'APO',
          city: 'APO',
          zipcode: '00000'
        },
        expected: true
      },
      {
        state: {
          addressType: 'APOFPO',
          address: '1234 Some Rd',
          state: null,
          city: 'APO',
          zipcode: '00000'
        },
        expected: false
      },
      {
        state: {
          addressType: 'DoesNotExist',
          address: '1234 Some Rd',
          state: null,
          city: 'APO',
          zipcode: '00000'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new AddressValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should prepare data to be geocoded', function () {
    const tests = [
      {
        state: {
          addressType: 'United States',
          address: '1234 Some Rd',
          city: 'Arlington',
          state: 'Virginia',
          zipcode: '22202'
        },
        expected: {
          Address: '1234 Some Rd',
          City: 'Arlington',
          State: 'Virginia',
          Zipcode: '22202'
        }
      },
      {
        state: {
          addressType: 'APOFPO',
          address: 'PSC 1010',
          state: 'AE',
          city: 'APO',
          zipcode: '09021'
        },
        expected: {
          Address: 'PSC 1010',
          City: 'APO',
          State: 'AE',
          Zipcode: '09021'
        }
      },
      {
        state: {
          addressType: 'International',
          address: '123 Some place',
          city: 'Munich',
          country: 'Germany'
        },
        expected: {}
      }
    ]

    tests.forEach(test => {
      expect(new AddressValidator(test.state, null).prepareGeocode()).toEqual(test.expected)
    })
  })

  it('should geocode information', async () => {
    const test = {
      state: {
        addressType: 'United States',
        address: '1234 Some Rd',
        city: 'Arlington',
        state: 'Virginia',
        zipcode: '22202'
      },
      expected: {
        Errors: []
      }
    }

    api.setToken('my-token')
    const mock = new MockAdapter(api.proxySecured)
    mock.onPost('/validate/address').reply(200, {
      Errors: []
    })

    return new AddressValidator(test.state, null)
      .geocode()
      .then(r => {
        expect(r).toEqual(test.expected)
      })
  })

  it('should handle system errors', async () => {
    const test = {
      state: {
        addressType: 'United States',
        address: '1234 Some Rd',
        city: 'Arlington',
        state: 'Virginia',
        zipcode: '22202'
      },
      expected: {
        Errors: [{
          Error: 'error.geocode.system'
        }]
      }
    }

    api.setToken('my-token')
    const mock = new MockAdapter(api.proxySecured)
    mock.onPost('/validate/address').reply(200, {
      Errors: [{
        Error: 'error.geocode.system'
      }]
    })
    return new AddressValidator(test.state, null)
      .geocode()
      .then(r => {
      }).catch(r => {
        expect(r).toEqual(test.expected)
      })
  })

  it('should validate zipcode', function () {
    const tests = [
      {
        state: {
          addressType: 'United States',
          address: '1234 Some Rd',
          city: 'Arlington',
          state: 'Virginia',
          zipcode: '2'
        },
        expected: false
      },
      {
        state: {
          addressType: 'United States',
          address: '1234 Some Rd',
          city: 'Arlington',
          state: 'Virginia',
          zipcode: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new AddressValidator(test.state, null).validZipcode()).toEqual(test.expected)
    })
  })
})
