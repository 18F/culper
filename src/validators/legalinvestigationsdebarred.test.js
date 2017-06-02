import LegalInvestigationsDebarredValidator, { DebarredValidator } from './legalinvestigationsdebarred.js'
import { battery } from './helpers'

describe('Legal investigations debarred component validation', function () {
  it('validate date completed', () => {
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
        props: {
          Agency: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Explanation: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {},
        expected: false
      },
      {
        props: {
          HasDebarment: 'No'
        },
        expected: true
      },
      {
        props: {
          HasDebarment: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasDebarment: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasDebarment: 'Yes',
          List: [
            {
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
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalInvestigationsDebarredValidator, 'isValid')
  })
})
