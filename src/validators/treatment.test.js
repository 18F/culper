import TreatmentValidator from './treatment'
import Location from '../components/Form/Location'

describe('Treatment validation', function () {
  it('validates treatment', () => {
    const tests = [
      {
        data: {
          Name: {
            value: 'Circuit Court'
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Phone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            type: 'Domestic',
            extension: ''
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new TreatmentValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
