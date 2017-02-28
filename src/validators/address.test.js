import AddressValidator from './address'

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
          apoFpo: 'AP 00000',
          apoFpoType: 'APO',
          zipcode: '000000'
        },
        expected: true
      },
      {
        state: {
          addressType: 'APOFPO',
          address: '1234 Some Rd',
          apoFpo: null,
          apoFpoType: 'APO',
          zipcode: '000000'
        },
        expected: false
      },
      {
        state: {
          addressType: 'DoesNotExist',
          address: '1234 Some Rd',
          apoFpo: null,
          apoFpoType: 'APO',
          zipcode: '000000'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new AddressValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
