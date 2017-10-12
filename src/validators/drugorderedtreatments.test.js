import DrugOrderedTreatmentsValidator, { DrugOrderedTreatmentValidator } from './drugorderedtreatments'
import Location from '../components/Form/Location'

describe('Drug Ordered Treatment Validation', function () {
  it('should validate drug ordered treatments', function () {
    const tests = [
      {
        state: {
          TreatmentOrdered: 'Nope'
        },
        expected: false
      },
      {
        state: {
          TreatmentOrdered: 'No'
        },
        expected: true
      },
      {
        state: {
          TreatmentOrdered: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          TreatmentOrdered: 'Yes',
          List: [{OrderedTreatment: {}}],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          TreatmentOrdered: 'Yes',
          List: [{OrderedTreatment: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          TreatmentOrdered: 'Yes',
          ListBranch: 'No',
          List: [
            {
              Item: {
                OrderedBy: ['Employer'],
                Explanation: {
                  value: 'The explanation'
                },
                ActionTaken: 'Yes',
                DrugType: 'Cocaine',
                TreatmentProvider: {
                  value: 'Provider'
                },
                TreatmentProviderAddress: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                TreatmentProviderTelephone: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  timeOfDay: 'Both',
                  type: 'Domestic',
                  extension: ''
                },
                TreatmentDates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  }
                },
                TreatmentCompleted: 'Yes'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          TreatmentOrdered: 'Yes',
          ListBranch: 'No',
          List: [
            {
              Item: {
                OrderedBy: ['Employer'],
                Explanation: {
                  value: 'The explanation'
                },
                ActionTaken: 'Yes',
                DrugType: 'Cocaine',
                TreatmentProvider: {
                  value: 'Provider'
                },
                TreatmentProviderAddress: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                TreatmentProviderTelephone: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                },
                TreatmentDates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  }
                },
                TreatmentCompleted: 'No',
                NoTreatmentExplanation: {
                  value: 'No treatment'
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          TreatmentOrdered: 'Yes',
          ListBranch: 'No',
          List: [
            {
              Item: {
                OrderedBy: ['Employer'],
                Explanation: {
                  value: 'The explanation'
                },
                ActionTaken: 'No',
                NoActionTakenExplanation: {
                  value: 'No action taken'
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          TreatmentOrdered: 'Yes',
          ListBranch: 'No',
          List: [
            {
              Item: {
                OrderedBy: ['Employer'],
                Explanation: {
                  value: 'The explanation'
                },
                ActionTaken: 'Nope'
              }
            }
          ]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new DrugOrderedTreatmentsValidator(test.state).isValid()).toBe(test.expected)
    })
  })

  it('should validate treatment completed', function () {
    const tests = [
      {
        state: {
          TreatmentCompleted: 'Nope'
        },
        expected: false
      },
      {
        state: {
          TreatmentCompleted: 'No',
          NoTreatmentExplanation: {
            value: 'Nothing'
          }
        },
        expected: true
      },
      {
        state: {
          TreatmentCompleted: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DrugOrderedTreatmentValidator(test.state).validTreatmentCompleted()).toBe(test.expected)
    })
  })
})
