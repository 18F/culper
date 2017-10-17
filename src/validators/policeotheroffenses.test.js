import PoliceOtherOffensesValidator from './policeotheroffenses'
import Location from '../components/Form/Location'

describe('Police record validation', function () {
  it('validates offenses', () => {
    const tests = [
      {
        state: {
          HasOtherOffenses: { value: 'Yes' },
          List: []
        },
        expected: false
      },
      {
        state: {
          HasOtherOffenses: { value: 'Yes' },
          List: [{Item: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasOtherOffenses: { value: 'No' },
          List: []
        },
        expected: true
      },
      {
        state: {
          HasOtherOffenses: { value: 'Yes' },
          ListBranch: 'No',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasOtherOffenses: { value: 'Yes' },
          ListBranch: 'No',
          List: [
            {
              Item: {
                Date: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Description: {
                  value: 'Some description'
                },
                InvolvedViolence: { value: 'No' },
                InvolvedFirearms: { value: 'Yes' },
                InvolvedSubstances: { value: 'No' },
                ChargeType: 'Felony',
                CourtAddress: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                CourtDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                CourtName: {
                  value: 'court name'
                },
                CourtCharge: {
                  value: 'Some charge'
                },
                CourtOutcome: {
                  value: 'Some outcome'
                },
                WasSentenced: { value: 'Yes' },
                Sentence: {
                  AwaitingTrial: { value: 'Yes' },
                  AwaitingTrialExplanation: 'Yes',
                  ExceedsYear: { value: 'Yes' },
                  Incarcerated: { value: 'Yes' },
                  IncarcerationDates: {
                    from: {
                      date: new Date('1/1/2000')
                    },
                    to: {
                      date: new Date('1/1/2004')
                    },
                    present: false
                  },
                  ProbationDates: {
                    from: {
                      date: new Date('1/1/2000')
                    },
                    to: {
                      date: new Date('1/1/2004')
                    },
                    present: false
                  },
                  Description: {
                    value: 'Foo'
                  }
                }
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PoliceOtherOffensesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
