import LegalAssociationsActivitiesValidator, { ActivitiesValidator } from './legalassociationsactivities'
import { battery } from './helpers'

describe('Legal associations activities component validation', function () {
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

    battery(tests, ActivitiesValidator, 'validDates')
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

    battery(tests, ActivitiesValidator, 'validReasons')
  })

  it('validate associations activities in terrorism', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasActivities: 'No'
        },
        expected: true
      },
      {
        state: {
          HasActivities: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasActivities: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasActivities: 'Yes',
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

    battery(tests, LegalAssociationsActivitiesValidator, 'isValid')
  })
})
