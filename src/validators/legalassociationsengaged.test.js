import LegalAssociationsEngagedValidator, { EngagedValidator } from './legalassociationsengaged'
import { battery } from './helpers'

describe('Legal associations engaged component validation', function () {
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

    battery(tests, EngagedValidator, 'validDates')
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

    battery(tests, EngagedValidator, 'validReasons')
  })

  it('validate associations engaged in terrorism', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasEngaged: 'No'
        },
        expected: true
      },
      {
        props: {
          HasEngaged: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasEngaged: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasEngaged: 'Yes',
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

    battery(tests, LegalAssociationsEngagedValidator, 'isValid')
  })
})
