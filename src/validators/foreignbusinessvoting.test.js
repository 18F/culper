import ForeignBusinessVotingValidator, {
  VotingValidator
} from './foreignbusinessvoting'
import { battery } from './helpers'

describe('Foreign business voting component validation', function() {
  it('validate foreign business voting dates', () => {
    const tests = [
      {
        state: {
          Date: {}
        },
        expected: false
      },
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016'
          }
        },
        expected: true
      }
    ]

    battery(tests, VotingValidator, 'validDate')
  })

  it('validate foreign business voting country', () => {
    const tests = [
      {
        state: {
          Country: {}
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          }
        },
        expected: true
      }
    ]

    battery(tests, VotingValidator, 'validCountry')
  })

  it('validate foreign business voting reason', () => {
    const tests = [
      {
        state: {
          Reason: {}
        },
        expected: false
      },
      {
        state: {
          Reason: {
            value: 'this is the reason'
          }
        },
        expected: true
      }
    ]

    battery(tests, VotingValidator, 'validReason')
  })

  it('validate foreign business voting eligibility', () => {
    const tests = [
      {
        state: {
          Eligibility: {}
        },
        expected: false
      },
      {
        state: {
          Eligibility: {
            value: 'this is the eligibility'
          }
        },
        expected: true
      }
    ]

    battery(tests, VotingValidator, 'validEligibility')
  })

  it('validate foreign business voting', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignVoting: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasForeignVoting: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignVoting: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignVoting: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016'
                  },
                  Country: {
                    value: 'Germany'
                  },
                  Reason: {
                    value: 'this is the reason'
                  },
                  Eligibility: {
                    value: 'this is the eligibility'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessVotingValidator, 'isValid')
  })
})
