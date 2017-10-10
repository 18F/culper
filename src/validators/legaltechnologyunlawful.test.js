import LegalTechnologyUnlawfulValidator, { UnlawfulValidator } from './legaltechnologyunlawful'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Legal technology unlawful component validation', function () {
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

    battery(tests, UnlawfulValidator, 'validDate')
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

    battery(tests, UnlawfulValidator, 'validIncident')
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
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    battery(tests, UnlawfulValidator, 'validLocation')
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

    battery(tests, UnlawfulValidator, 'validAction')
  })

  it('validate technology unlawful', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasUnlawful: 'No'
        },
        expected: true
      },
      {
        state: {
          HasUnlawful: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasUnlawful: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasUnlawful: 'Yes',
          List: [
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
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                Action: {
                  value: 'this is an action'
                }
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalTechnologyUnlawfulValidator, 'isValid')
  })
})
