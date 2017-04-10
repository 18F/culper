import DiagnosesValidator from './diagnoses'

describe('Diagnoses validation', function () {
  it('validates treatment list', () => {
    const tests = [
      {
        state: {
          InTreatment: 'Yes',
          TreatmentList: [{
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
            }
          }]
        },
        expected: true
      },
      {
        state: {
          InTreatment: 'No',
          TreatmentList: []
        },
        expected: true
      },
      {
        state: {
          InTreatment: 'Yes',
          TreatmentList: []
        },
        expected: false
      },
      {
        state: {
          InTreatment: 'Yes',
          TreatmentList: [{}]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new DiagnosesValidator(test.state, null).validTreatmentList()).toBe(test.expected)
    })
  })

  it('validates diagnosis list', () => {
    const tests = [
      {
        state: {
          Diagnosed: 'Yes',
          DiagnosisList: [{
            Diagnosis: {
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
            }
          }]
        },
        expected: true
      },
      {
        state: {
          Diagnosed: 'No',
          DiagnosisList: []
        },
        expected: true
      },
      {
        state: {
          Diagnosed: 'Yes',
          DiagnosisList: []
        },
        expected: false
      },
      {
        state: {
          Diagnosed: 'Yes',
          DiagnosisList: [{}]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new DiagnosesValidator(test.state, null).validDiagnosisList()).toBe(test.expected)
    })
  })

  it('validates diagnoses', () => {
    const tests = [
      {
        state: {
          Diagnosed: 'No',
          InTreatment: 'No',
          DidNotConsult: 'Yes',
          DiagnosisList: [],
          TreatmentList: []
        },
        expected: true
      }]

    tests.forEach(test => {
      expect(new DiagnosesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
