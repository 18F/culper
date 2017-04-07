import TreatmentValidator from './treatment'

describe('Treatment validation', function () {
  it('validates treatment', () => {
    const tests = [
      {
        state: {
          Name: {
            value: 'Circuit Court'
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          Phone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new TreatmentValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
