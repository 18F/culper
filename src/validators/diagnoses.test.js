import DiagnosesValidator from './diagnoses'
import Location from '../components/Form/Location'

describe('Diagnoses validation', function() {
  it('validates treatment list', () => {
    const tests = [
      {
        state: {
          InTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          InTreatment: { value: 'No' },
          TreatmentList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: true
      },
      {
        state: {
          InTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          InTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: [{}]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(
        new DiagnosesValidator(test.state, null).validTreatmentList()
      ).toBe(test.expected)
    })
  })

  it('validates diagnosis list', () => {
    const tests = [
      {
        state: {
          Diagnosed: { value: 'Yes' },
          DiagnosisList: {
            branch: { value: 'No' },
            items: [
              {
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
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
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
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Diagnosed: { value: 'No' },
          DiagnosisList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: true
      },
      {
        state: {
          Diagnosed: { value: 'Yes' },
          DiagnosisList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          Diagnosed: { value: 'Yes' },
          DiagnosisList: {
            branch: { value: 'No' },
            items: [{}]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(
        new DiagnosesValidator(test.state, null).validDiagnosisList()
      ).toBe(test.expected)
    })
  })

  it('validates diagnoses', () => {
    const tests = [
      {
        state: {
          Diagnosed: { value: 'No' },
          InTreatment: { value: 'No' },
          DidNotConsult: { value: 'Yes' },
          DiagnosisList: {
            branch: { value: 'No' },
            items: []
          },
          TreatmentList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DiagnosesValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
