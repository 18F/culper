import ForeignActivitiesSupportValidator, { SupportValidator } from './foreignsupport'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Foreign activities support component validation', function () {
  it('validate foreign activities support name', () => {
    const tests = [
      {
        state: {
          Name: {}
        },
        expected: false
      },
      {
        state: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          }
        },
        expected: true
      }
    ]

    battery(tests, SupportValidator, 'validName')
  })

  it('validate foreign activities support address', () => {
    const tests = [
      {
        state: {
          Address: {}
        },
        expected: false
      },
      {
        state: {
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    battery(tests, SupportValidator, 'validAddress')
  })

  it('validate foreign activities support relationship', () => {
    const tests = [
      {
        state: {
          Relationship: {}
        },
        expected: false
      },
      {
        state: {
          Relationship: {
            value: 'this is the relationship'
          }
        },
        expected: true
      }
    ]

    battery(tests, SupportValidator, 'validRelationship')
  })

  it('validate foreign activities support amount', () => {
    const tests = [
      {
        state: {
          Amount: {}
        },
        expected: false
      },
      {
        state: {
          Amount: {
            value: '1000'
          }
        },
        expected: true
      }
    ]

    battery(tests, SupportValidator, 'validAmount')
  })

  it('validate foreign activities support frequency', () => {
    const tests = [
      {
        state: {
          Frequency: {}
        },
        expected: false
      },
      {
        state: {
          Frequency: {
            value: 'Daily'
          }
        },
        expected: true
      }
    ]

    battery(tests, SupportValidator, 'validFrequency')
  })

  it('validate foreign activities support citizenship', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          Citizenship: {}
        },
        expected: false
      },
      {
        state: {
          Citizenship: {
            value: ['United States']
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: ['United States', 'Germany']
          }
        },
        expected: true
      }
    ]

    battery(tests, SupportValidator, 'validCitizenship')
  })

  it('validate foreign activities support', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignSupport: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasForeignSupport: { value: 'Yes' },
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasForeignSupport: { value: 'Yes' },
          List: [
            {
              Item: {
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                Address: {
                  street: '1234 Some Rd',
                  city: 'Munich',
                  country: { value: 'Germany' },
                  layout: Location.ADDRESS
                },
                Relationship: {
                  value: 'this is the relationship'
                },
                Amount: {
                  value: '1000'
                },
                Frequency: {
                  value: 'Daily'
                },
                Citizenship: {
                  value: ['United States', 'Germany']
                }
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, ForeignActivitiesSupportValidator, 'isValid')
  })
})
