import ForeignActivitiesSupportValidator, { SupportValidator } from './foreignsupport'
import { battery } from './helpers'

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
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
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
            value: [
              { name: 'United States', value: 'United States' }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' },
              { name: 'Germany', value: 'Germany' }
            ]
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
          HasForeignSupport: 'No'
        },
        expected: true
      },
      {
        state: {
          HasForeignSupport: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasForeignSupport: 'Yes',
          List: [
            {
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
                addressType: 'International',
                address: '1234 Some Rd',
                city: 'Munich',
                country: 'Germany'
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
                value: [
                  { name: 'United States', value: 'United States' },
                  { name: 'Germany', value: 'Germany' }
                ]
              }
            }
          ]
        },
        expected: true
      }
    ]

    battery(tests, ForeignActivitiesSupportValidator, 'isValid')
  })
})
