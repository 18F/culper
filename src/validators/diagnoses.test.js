import DiagnosesValidator from './diagnoses'
import Location from '../components/Form/Location'

describe('Diagnoses validation', function () {
  it('validates treatment list', () => {
    const tests = [
      {
        state: {
          InTreatment: 'Yes',
          TreatmentList: [{
            Item: {
              Name: {
                value: 'Circuit Court'
              },
              Address: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202',
                layout: Location.ADDRESS
              },
              Phone: {
                noNumber: '',
                number: '7031112222',
                numberType: 'Home',
                timeOfDay: 'Both',
                extension: ''
              }
            }
          }],
          TreatmentListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          InTreatment: 'No',
          TreatmentList: [],
          TreatmentListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          InTreatment: 'Yes',
          TreatmentList: [],
          TreatmentListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          InTreatment: 'Yes',
          TreatmentList: [{}],
          TreatmentListBranch: 'No'
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
            Item: {
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
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
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
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
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
          }],
          DiagnosisListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          Diagnosed: 'No',
          DiagnosisList: [],
          DiagnosisListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          Diagnosed: 'Yes',
          DiagnosisList: [],
          DiagnosisListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          Diagnosed: 'Yes',
          DiagnosisList: [{}],
          DiagnosisListBranch: 'No'
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
          DiagnosisListBranch: 'No',
          TreatmentList: [],
          TreatmentListBranch: 'No'
        },
        expected: true
      }]

    tests.forEach(test => {
      expect(new DiagnosesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
