import PoliceValidator from './police'

describe('Police record validation', function () {
  it('can validate checks against multiple branches', () => {
    const tests = [
      {
        state: {
          HasSummons: 'Yes',
          HasArrests: null,
          HasCharges: null,
          HasProbation: null,
          HasTrial: null
        },
        expected: false
      },
      {
        state: {
          HasSummons: 'Yes',
          HasArrests: 'No',
          HasCharges: 'No',
          HasProbation: 'No',
          HasTrial: 'No'
        },
        expected: true
      },
      {
        state: {
          HasSummons: 'Yes',
          HasArrests: 'Yes',
          HasCharges: 'Yes',
          HasProbation: 'Yes',
          HasTrial: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PoliceValidator(test.state, null).validChecks()).toBe(test.expected)
    })
  })

  it('validates offenses', () => {
    const tests = [
      {
        state: {
          HasSummons: 'Yes',
          HasArrests: null,
          HasCharges: null,
          HasProbation: null,
          HasTrial: null,
          List: []
        },
        expected: false
      },
      {
        state: {
          HasSummons: 'No',
          HasArrests: 'No',
          HasCharges: 'No',
          HasProbation: 'No',
          HasTrial: 'No',
          List: [],
          DomesticViolence: [
            {
              Has: 'Yes',
              domestic: {
                CourtName: {
                  value: '4th Circuit Court'
                },
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Explanation: {
                  value: 'Some content'
                },
                Issued: {
                  month: '1',
                  year: '2009'
                }
              }
            }
          ]
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
          List: []
        },
        expected: false
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
                  value: 'Description of the offense'
                },
                InvolvedViolence: 'No',
                InvolvedFirearms: 'No',
                InvolvedSubstances: 'No',
                Address: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                WasCited: 'No'
              }
            }
          ],
          DomesticViolence: [
            {
              Has: 'Yes',
              domestic: {
                CourtName: {
                  value: '4th Circuit Court'
                },
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Explanation: {
                  value: 'Some content'
                },
                Issued: {
                  month: '1',
                  year: '2009'
                }
              }
            }
          ]
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
                  value: 'Description of the offense'
                },
                InvolvedViolence: 'No',
                InvolvedFirearms: 'No',
                InvolvedSubstances: 'No',
                Address: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                WasCited: 'No'
              }
            }
          ],
          OtherOffenses: [
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
                CourtType: 'Felony',
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
          ],
          DomesticViolence: [
            {
              Has: 'Yes',
              domestic: {
                CourtName: {
                  value: '4th Circuit Court'
                },
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Explanation: {
                  value: 'Some content'
                },
                Issued: {
                  month: '1',
                  year: '2009'
                }
              }
            }
          ]
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
                  value: 'Description of the offense'
                },
                InvolvedViolence: 'No',
                InvolvedFirearms: 'No',
                InvolvedSubstances: 'No',
                Address: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                WasCited: 'No'
              }
            }
          ],
          OtherOffenses: [
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
                CourtType: 'Felony',
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
          ],
          DomesticViolence: [
            {
              Has: 'Yes',
              domestic: {
                CourtName: {
                  value: '4th Circuit Court'
                },
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Explanation: {
                  value: 'Some content'
                },
                Issued: {
                  month: '1',
                  year: '2009'
                }
              }
            }
          ]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PoliceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
