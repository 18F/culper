import LegalInvestigationsHistoryValidator, { HistoryValidator } from './legalinvestigationshistory.js'
import { battery } from './helpers'

describe('Legal investigations history component validation', function () {
  it('validate agency information', () => {
    const tests = [
      {
        state: {
          Agency: {}
        },
        expected: false
      },
      {
        state: {
          Agency: {},
          AgencyNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          Agency: {
            Agency: 'U.S. Department of Defense'
          }
        },
        expected: true
      },
      {
        state: {
          Agency: {
            Agency: 'Other',
            Explanation: {
              value: 'this is the explanation'
            }
          }
        },
        expected: true
      },
      {
        state: {
          Agency: {
            Agency: 'Foreign government',
            Explanation: {
              value: 'this is the explanation'
            }
          }
        },
        expected: true
      },
      {
        state: {
          Agency: {
            Agency: 'U.S. Department of Treasury',
            Explanation: {
              value: 'this is the explanation'
            }
          }
        },
        expected: true
      }
    ]

    battery(tests, HistoryValidator, 'validAgency')
  })

  it('validate date completed', () => {
    const tests = [
      {
        state: {
          Completed: {}
        },
        expected: false
      },
      {
        state: {
          Completed: {},
          CompletedNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          Completed: {
            date: new Date('1/1/2010'),
            day: '1',
            month: '1',
            year: '2010'
          }
        },
        expected: true
      }
    ]

    battery(tests, HistoryValidator, 'validCompleted')
  })

  // This is optional
  // it('validate issued by', () => {
  //   const tests = [
  //     {
  //       state: {
  //         Issued: {}
  //       },
  //       expected: false
  //     },
  //     {
  //       state: {
  //         Issued: {
  //           value: 'Some other agency'
  //         }
  //       },
  //       expected: true
  //     }
  //   ]

  //   battery(tests, HistoryValidator, 'validIssued')
  // })

  it('validate date granted', () => {
    const tests = [
      {
        state: {
          Granted: {}
        },
        expected: false
      },
      {
        state: {
          Granted: {},
          GrantedNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          Granted: {
            date: new Date('1/1/2010'),
            day: '1',
            month: '1',
            year: '2010'
          }
        },
        expected: true
      }
    ]

    battery(tests, HistoryValidator, 'validGranted')
  })

  it('validate clearance level information', () => {
    const tests = [
      {
        state: {
          Clearance: {}
        },
        expected: false
      },
      {
        state: {
          Clearance: {},
          ClearanceNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          Clearance: {
            Level: 'Top Secret'
          }
        },
        expected: true
      },
      {
        state: {
          Clearance: {
            Level: 'Other',
            Explanation: {
              value: 'this is the explanation'
            }
          }
        },
        expected: true
      }
    ]

    battery(tests, HistoryValidator, 'validClearance')
  })

  it('validate investigations history', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasHistory: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasHistory: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasHistory: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasHistory: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Agency: {},
                  AgencyNotApplicable: {
                    applicable: false
                  },
                  Completed: {},
                  CompletedNotApplicable: {
                    applicable: false
                  },
                  Issued: {
                    value: 'Some other agency'
                  },
                  Granted: {},
                  GrantedNotApplicable: {
                    applicable: false
                  },
                  Clearance: {},
                  ClearanceNotApplicable: {
                    applicable: false
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, LegalInvestigationsHistoryValidator, 'isValid')
  })
})
