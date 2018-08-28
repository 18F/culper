import DiagnosisValidator from './diagnosis'
import Location from '../components/Form/Location'

describe('Diagnosis validation', function() {
  it('validates effective', () => {
    const tests = [
      {
        data: {
          Effective: { value: 'Yes' },
          Explanation: {
            value: null
          }
        },
        expected: true
      },
      {
        data: {
          Effective: { value: 'No' },
          Explanation: {
            value: null
          }
        },
        expected: false
      },
      {
        data: {
          Effective: { value: 'No' },
          Explanation: {
            value: 'The explanation'
          }
        },
        expected: true
      },
      {
        data: {
          Effective: { value: 'Nope' },
          Explanation: {
            value: 'The explanation'
          }
        },
        expected: false
      },
      {
        data: {
          prefix: 'existingConditions.diagnosis',
          Effective: { value: 'Nope' },
          Explanation: {
            value: 'The explanation'
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DiagnosisValidator(test.data).validEffective()).toBe(
        test.expected
      )
    })
  })

  it('validates diagnosis', () => {
    const tests = [
      {
        data: {
          Condition: { value: 'Test' },
          Effective: { value: 'Yes' },
          Explanation: {
            value: null
          },
          Diagnosed: {
            from: {
              month: '1',
              day: '1',
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              month: '1',
              day: '1',
              year: '2012',
              date: new Date('1/1/2012')
            },
            present: false
          },
          Treatment: {
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
          TreatmentFacility: {
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
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DiagnosisValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
