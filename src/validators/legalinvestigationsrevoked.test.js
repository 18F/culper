import LegalInvestigationsRevokedValidator, {
  RevokedValidator
} from './legalinvestigationsrevoked.js'
import { battery } from './helpers'

describe('Legal investigations revoked component validation', function() {
  it('validate date completed', () => {
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
            year: '2010'
          }
        },
        expected: true
      }
    ]

    battery(tests, RevokedValidator, 'validDate')
  })

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
          Agency: {
            value: 'U.S. Department of Defense'
          }
        },
        expected: true
      }
    ]

    battery(tests, RevokedValidator, 'validAgency')
  })

  it('validate explanation', () => {
    const tests = [
      {
        state: {
          Explanation: {}
        },
        expected: false
      },
      {
        state: {
          Explanation: {
            value: 'this is an explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, RevokedValidator, 'validExplanation')
  })

  it('validate investigation revocations', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasRevocations: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasRevocations: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasRevocations: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasRevocations: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2010'
                  },
                  Agency: {
                    value: 'U.S. Department of Defense'
                  },
                  Explanation: {
                    value: 'this is an explanation'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, LegalInvestigationsRevokedValidator, 'isValid')
  })
})
