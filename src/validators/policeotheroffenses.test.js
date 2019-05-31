import PoliceOtherOffensesValidator from './policeotheroffenses'
import Location from '../components/Form/Location'

describe('Police record validation', () => {
  it('validates offenses', () => {
    const tests = [
      {
        state: {
          List: {
            branch: { value: '' },
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: [{ Item: { Has: { value: 'Yes' } } }],
          },
        },
        expected: false,
      },
      {
        state: {
          List: {
            branch: { value: '' },
            items: [{ Item: { Has: { value: 'No' } } }],
          },
        },
        expected: true,
      },
      {
        state: {
          HasOtherOffenses: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ Item: { Has: { value: 'Yes' } } }],
          },
        },
        expected: false,
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  Description: {
                    value: 'Some description',
                  },
                  InvolvedViolence: { value: 'No' },
                  InvolvedFirearms: { value: 'Yes' },
                  InvolvedSubstances: { value: 'No' },
                  ChargeType: { value: 'Felony' },
                  CourtAddress: {
                    country: { value: 'United States' },
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.OFFENSE,
                  },
                  CourtDate: {
                    month: '1',
                    year: '2016',
                  },
                  CourtName: {
                    value: 'court name',
                  },
                  CourtCharge: {
                    value: 'Some charge',
                  },
                  CourtOutcome: {
                    value: 'Some outcome',
                  },
                  WasSentenced: { value: 'Yes' },
                  Sentence: {
                    AwaitingTrial: { value: 'Yes' },
                    AwaitingTrialExplanation: 'Yes',
                    ExceedsYear: { value: 'Yes' },
                    Incarcerated: { value: 'Yes' },
                    IncarcerationDates: {
                      from: {
                        month: '1',
                        day: '1',
                        year: '2000',
                      },
                      to: {
                        month: '1',
                        day: '1',
                        year: '2004',
                      },
                      present: false,
                    },
                    ProbationDates: {
                      from: {
                        month: '1',
                        day: '1',
                        year: '2000',
                      },
                      to: {
                        month: '1',
                        day: '1',
                        year: '2004',
                      },
                      present: false,
                    },
                    Description: {
                      value: 'Foo',
                    },
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new PoliceOtherOffensesValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
