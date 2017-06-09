import LegalTechnologyUnauthorizedValidator, { UnauthorizedValidator } from './legaltechnologyunauthorized'
import { battery } from './helpers'

describe('Legal technology unauthorized component validation', function () {
  it('validate date', () => {
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

    battery(tests, UnauthorizedValidator, 'validDate')
  })

  it('validate incident', () => {
    const tests = [
      {
        props: {
          Incident: {}
        },
        expected: false
      },
      {
        props: {
          Incident: {
            value: 'this is an incident'
          }
        },
        expected: true
      }
    ]

    battery(tests, UnauthorizedValidator, 'validIncident')
  })

  it('validate location', () => {
    const tests = [
      {
        props: {
          Location: {}
        },
        expected: false
      },
      {
        props: {
          Location: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      }
    ]

    battery(tests, UnauthorizedValidator, 'validLocation')
  })

  it('validate action', () => {
    const tests = [
      {
        props: {
          Action: {}
        },
        expected: false
      },
      {
        props: {
          Action: {
            value: 'this is an action'
          }
        },
        expected: true
      }
    ]

    battery(tests, UnauthorizedValidator, 'validAction')
  })

  it('validate technology unauthorized', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasUnauthorized: 'No'
        },
        expected: true
      },
      {
        props: {
          HasUnauthorized: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasUnauthorized: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasUnauthorized: 'Yes',
          List: [
            {
              Date: {
                date: new Date('1/1/2010'),
                day: '1',
                month: '1',
                year: '2010'
              },
              Incident: {
                value: 'this is an incident'
              },
              Location: {
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
              },
              Action: {
                value: 'this is an action'
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalTechnologyUnauthorizedValidator, 'isValid')
  })
})
