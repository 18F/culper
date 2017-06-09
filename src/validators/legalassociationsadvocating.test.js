import LegalAssociationsAdvocatingValidator, { AdvocatingValidator } from './legalassociationsadvocating'
import { battery } from './helpers'

describe('Legal associations advocated component validation', function () {
  it('validate dates', () => {
    const tests = [
      {
        props: {
          Dates: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Reasons: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {},
        expected: false
      },
      {
        props: {
          HasAdvocated: 'No'
        },
        expected: true
      },
      {
        props: {
          HasAdvocated: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasAdvocated: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasAdvocated: 'Yes',
          List: [
            {
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
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalAssociationsAdvocatingValidator, 'isValid')
  })
})
