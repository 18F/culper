import LegalTechnologyUnauthorizedValidator, {
  UnauthorizedValidator
} from './legaltechnologyunauthorized'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Legal technology unauthorized component validation', function() {
  it('validate date', () => {
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

    battery(tests, UnauthorizedValidator, 'validDate')
  })

  it('validate incident', () => {
    const tests = [
      {
        state: {
          Incident: {}
        },
        expected: false
      },
      {
        state: {
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
        state: {
          Location: {}
        },
        expected: false
      },
      {
        state: {
          Location: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
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
        state: {
          Action: {}
        },
        expected: false
      },
      {
        state: {
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
        state: {},
        expected: false
      },
      {
        state: {
          HasUnauthorized: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasUnauthorized: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasUnauthorized: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasUnauthorized: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Action: {
                    value: 'this is an action'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, LegalTechnologyUnauthorizedValidator, 'isValid')
  })
})
