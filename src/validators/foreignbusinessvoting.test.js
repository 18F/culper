import ForeignBusinessVotingValidator, { VotingValidator } from './foreignbusinessvoting'
import { battery } from './helpers'

describe('Foreign business voting component validation', function () {
  it('validate foreign business voting dates', () => {
    const tests = [
      {
        props: {
          Date: {}
        },
        expected: false
      },
      {
        props: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
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
        props: {
          Country: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Reason: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Eligibility: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {},
        expected: false
      },
      {
        props: {
          HasForeignVoting: 'No'
        },
        expected: true
      },
      {
        props: {
          HasForeignVoting: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignVoting: 'Yes',
          List: [{}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignVoting: 'Yes',
          List: [
            {
              Date: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
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
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessVotingValidator, 'isValid')
  })
})
