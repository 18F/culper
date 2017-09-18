import LegalInvestigationsDebarredValidator, { DebarredValidator } from './legalinvestigationsdebarred.js'
import { battery } from './helpers'

describe('Legal investigations debarred component validation', function () {
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
            date: new Date('1/1/2010'),
            day: '1',
            month: '1',
            year: '2010'
          }
        },
        expected: true
      }
    ]

    battery(tests, DebarredValidator, 'validDate')
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

    battery(tests, DebarredValidator, 'validAgency')
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

    battery(tests, DebarredValidator, 'validExplanation')
  })

  it('validate investigation revocations', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasDebarment: 'No'
        },
        expected: true
      },
      {
        state: {
          HasDebarment: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasDebarment: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasDebarment: 'Yes',
          List: [
            {
              Item: {
                Date: {
                  date: new Date('1/1/2010'),
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
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalInvestigationsDebarredValidator, 'isValid')
  })
})
