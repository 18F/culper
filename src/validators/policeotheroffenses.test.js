import PoliceOtherOffensesValidator from './policeotheroffenses'

describe('Police record validation', function () {

  it('validates offenses', () => {
    const tests = [
      {
        state: {
          HasOtherOffenses: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasOtherOffenses: 'Yes',
          List: [{Item: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasOtherOffenses: 'No',
          List: []
        },
        expected: true
      },
      {
        state: {
          HasOtherOffenses: 'Yes',
          ListBranch: 'No',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasOtherOffenses: 'Yes',
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
                InvolvedViolence: 'No',
                InvolvedFirearms: 'Yes',
                InvolvedSubstances: 'No',
                ChargeType: 'Felony',
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
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
                WasSentenced: 'Yes',
                Sentence: {
                  AwaitingTrial: 'Yes',
                  AwaitingTrialExplanation: 'Yes',
                  ExceedsYear: 'Yes',
                  Incarcerated: 'Yes',
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
