import LegalAssociationsActivitiesValidator, { ActivitiesValidator } from './legalassociationsactivities'
import { battery } from './helpers'

describe('Legal associations activities component validation', function () {
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

    battery(tests, ActivitiesValidator, 'validDates')
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

    battery(tests, ActivitiesValidator, 'validReasons')
  })

  it('validate associations activities in terrorism', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasActivities: 'No'
        },
        expected: true
      },
      {
        props: {
          HasActivities: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasActivities: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasActivities: 'Yes',
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

    battery(tests, LegalAssociationsActivitiesValidator, 'isValid')
  })
})
