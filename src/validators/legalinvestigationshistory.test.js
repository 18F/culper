import LegalInvestigationsHistoryValidator, { HistoryValidator } from './legalinvestigationshistory.js'
import { battery } from './helpers'

describe('Legal investigations history component validation', function () {
  it('validate agency information', () => {
    const tests = [
      {
        props: {
          Agency: {}
        },
        expected: false
      },
      {
        props: {
          Agency: {},
          AgencyNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        props: {
          Agency: {
            Agency: 'U.S. Department of Defense'
          }
        },
        expected: true
      },
      {
        props: {
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
        props: {
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
        props: {
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
        props: {
          Completed: {}
        },
        expected: false
      },
      {
        props: {
          Completed: {},
          CompletedNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        props: {
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
  //       props: {
  //         Issued: {}
  //       },
  //       expected: false
  //     },
  //     {
  //       props: {
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
        props: {
          Granted: {}
        },
        expected: false
      },
      {
        props: {
          Granted: {},
          GrantedNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        props: {
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
        props: {
          Clearance: {}
        },
        expected: false
      },
      {
        props: {
          Clearance: {},
          ClearanceNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        props: {
          Clearance: {
            Level: 'Top Secret'
          }
        },
        expected: true
      },
      {
        props: {
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
        props: {},
        expected: false
      },
      {
        props: {
          HasHistory: 'No'
        },
        expected: true
      },
      {
        props: {
          HasHistory: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasHistory: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasHistory: 'Yes',
          List: [
            {
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
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalInvestigationsHistoryValidator, 'isValid')
  })
})
