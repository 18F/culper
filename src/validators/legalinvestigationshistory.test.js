import LegalInvestigationsHistoryValidator, {
  HistoryValidator
} from './legalinvestigationshistory.js'
import { battery } from './helpers'

describe('Legal investigations history component validation', function() {
  it('validate agency information', () => {
    const tests = [
      {
        state: {
          Agency: {},
          AgencyExplanation: {}
        },
        expected: false
      },
      {
        state: {
          Agency: {},
          AgencyExplanation: {},
          AgencyNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          Agency: {
            value: 'U.S. Department of Defense'
          },
          AgencyExplanation: {}
        },
        expected: true
      },
      {
        state: {
          Agency: {
            value: 'Other'
          },
          AgencyExplanation: {
            value: 'this is the explanation'
          }
        },
        expected: true
      },
      {
        state: {
          Agency: {
            value: 'Foreign government'
          },
          AgencyExplanation: {
            value: 'this is the explanation'
          }
        },
        expected: true
      },
      {
        state: {
          Agency: {
            value: 'U.S. Department of Treasury'
          },
          AgencyExplanation: {
            value: 'this is the explanation'
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
          ClearanceLevel: {}
        },
        expected: false
      },
      {
        state: {
          ClearanceLevel: {},
          ClearanceLevelNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          ClearanceLevel: {
            Level: { value: 'Top Secret' }
          }
        },
        expected: true
      },
      {
        state: {
          ClearanceLevel: {
            Level: { value: 'Other' },
            Explanation: { value: 'this is the explanation' }
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
                  AgencyExplanation: {},
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
                  ClearanceLevel: {},
                  ClearanceLevelNotApplicable: {
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
