import DiagnosisValidator from './diagnosis'

describe('Diagnosis validation', function () {
  it('validates effective', () => {
    const tests = [
      {
        state: {
          Effective: 'Yes',
          Explanation: {
            value: null
          }
        },
        expected: true
      },
      {
        state: {
          Effective: 'No',
          Explanation: {
            value: null
          }
        },
        expected: false
      },
      {
        state: {
          Effective: 'No',
          Explanation: {
            value: 'The explanation'
          }
        },
        expected: true
      },
      {
        state: {
          Effective: 'Nope',
          Explanation: {
            value: 'The explanation'
          }
        },
        expected: false
      },
      {
        state: {
          Effective: 'Nope',
          Explanation: {
            value: 'The explanation'
          }
        },
        props: {
          prefix: 'existingConditions.diagnosis'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DiagnosisValidator(test.state, test.props).validEffective()).toBe(test.expected)
    })
  })

  it('validates diagnosis', () => {
    const tests = [
      {
        state: {
          Condition: {
            value: 'Test'
          },
          Effective: 'Yes',
          Explanation: {
            value: null
          },
          Diagnosed: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          },
          Treatment: {
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
          TreatmentFacility: {
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
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DiagnosisValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
