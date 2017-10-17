import LegalAssociationsAdvocatingValidator, { AdvocatingValidator } from './legalassociationsadvocating'
import { battery } from './helpers'

describe('Legal associations advocated component validation', function () {
  it('validate dates', () => {
    const tests = [
      {
        state: {
          Dates: {}
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          }
        },
        expected: true
      }
    ]

    battery(tests, AdvocatingValidator, 'validDates')
  })

  it('validate reasons', () => {
    const tests = [
      {
        state: {
          Reasons: {}
        },
        expected: false
      },
      {
        state: {
          Reasons: {
            value: 'this is the reasons'
          }
        },
        expected: true
      }
    ]

    battery(tests, AdvocatingValidator, 'validReasons')
  })

  it('validate associations advocated', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasAdvocated: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasAdvocated: { value: 'Yes' },
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasAdvocated: { value: 'Yes' },
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasAdvocated: { value: 'Yes' },
          List: [
            {
              Item: {
                Reasons: {
                  value: 'this is the reasons'
                },
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                }
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalAssociationsAdvocatingValidator, 'isValid')
  })
})
