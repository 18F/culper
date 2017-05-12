import PoliceOtherOffensesValidator from './policeotheroffenses'

describe('Police record validation', function () {
  it('can validate checks against multiple branches', () => {
    const tests = [
      {
        state: {
          HasOtherConviction: 'Yes',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'No',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No'
        },
        expected: true
      },
      {
        state: {
          HasOtherConviction: 'Nope',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'No',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PoliceOtherOffensesValidator(test.state, null).validChecks()).toBe(test.expected)
    })
  })

  it('validates offenses', () => {
    const tests = [
      {
        state: {
          HasOtherConviction: 'Yes',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'No',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasOtherConviction: 'No',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'No',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No',
          List: []
        },
        expected: true
      },
      {
        state: {
          HasSummons: 'No',
          HasArrests: 'No',
          HasCharges: 'No',
          HasProbation: 'No',
          HasTrial: 'Yes',
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
                  value: ''
                },
                InvolvedViolence: 'No',
                InvolvedFirearms: 'No',
                InvolvedSubstances: 'No',
                Address: null,
                WasCited: 'No'
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasOtherConviction: 'Yes',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'No',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No',
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
      },
      {
        state: {
          HasOtherConviction: 'Yes',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'No',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No',
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
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PoliceOtherOffensesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('can count other offenses', () => {
    const tests = [
      {
        state: {
          HasOtherConviction: 'No',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'Yes',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No'
        },
        expected: 1
      },
      {
        state: {
          HasOtherConviction: 'No',
          HasOtherFelony: 'No',
          HasOtherDomestic: 'No',
          HasOtherFirearms: 'No',
          HasOtherAlcohol: 'No'
        },
        expected: 0
      }
    ]

    tests.forEach(test => {
      expect(new PoliceOtherOffensesValidator(test.state, null).hasOtherOffensesCount()).toBe(test.expected)
    })
  })
})
