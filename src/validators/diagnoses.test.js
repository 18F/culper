import DiagnosesValidator from './diagnoses'
import Location from '../components/Form/Location'

describe('Diagnoses validation', function () {
  it('validates treatment list', () => {
    const tests = [
      {
        state: {
          InTreatment: { value: 'Yes' },
          TreatmentList: [{
            Item: {
              Name: {
                value: 'Circuit Court'
              },
              Address: {
                country: { value: 'United States' },
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
                type: 'Domestic',
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
          InTreatment: { value: 'No' },
          TreatmentList: [],
          TreatmentListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          InTreatment: { value: 'Yes' },
          TreatmentList: [],
          TreatmentListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          InTreatment: { value: 'Yes' },
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
          Diagnosed: { value: 'Yes' },
          DiagnosisList: [{
            Item: {
              Condition: {
                value: 'Test'
              },
              Effective: { value: 'Yes' },
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
                  country: { value: 'United States' },
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
                  state: 'Virginia',
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
            }
          }],
          DiagnosisListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          Diagnosed: { value: 'No' },
          DiagnosisList: [],
          DiagnosisListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          Diagnosed: { value: 'Yes' },
          DiagnosisList: [],
          DiagnosisListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          Diagnosed: { value: 'Yes' },
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
          Diagnosed: { value: 'No' },
          InTreatment: { value: 'No' },
          DidNotConsult: { value: 'Yes' },
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
