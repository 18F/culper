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
                  Charges: {
                    items: [
                      {
                        Item: {
                          ChargeType: { value: 'Felony' },
                          CourtDate: {
                            month: '1',
                            year: '2016',
                          },
                          CourtCharge: {
                            value: 'Some charge',
                          },
                          CourtOutcome: {
                            value: 'Some outcome',
                          },
                        },
                      },
                    ],
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.OFFENSE,
                  },
                  CourtName: {
                    value: 'court name',
                  },
                  WasSentenced: { value: 'Yes' },
                  Sentence: {
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
              {
                Item: {
                  Has: {
                    value: 'No',
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
