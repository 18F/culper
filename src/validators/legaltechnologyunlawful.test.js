import LegalTechnologyUnlawfulValidator, { UnlawfulValidator } from './legaltechnologyunlawful'
import { battery } from './helpers'

describe('Legal technology unlawful component validation', function () {
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

    battery(tests, UnlawfulValidator, 'validDate')
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

    battery(tests, UnlawfulValidator, 'validIncident')
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

    battery(tests, UnlawfulValidator, 'validLocation')
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

    battery(tests, UnlawfulValidator, 'validAction')
  })

  it('validate technology unlawful', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasUnlawful: 'No'
        },
        expected: true
      },
      {
        props: {
          HasUnlawful: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasUnlawful: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasUnlawful: 'Yes',
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

    battery(tests, LegalTechnologyUnlawfulValidator, 'isValid')
  })
})
