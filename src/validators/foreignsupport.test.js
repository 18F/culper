import ForeignActivitiesSupportValidator, {
  SupportValidator
} from './foreignsupport'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Foreign activities support component validation', function() {
  it('validate foreign activities support name', () => {
    const tests = [
      {
        data: {
          Name: {}
        },
        expected: false
      },
      {
        data: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
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
        data: {
          Address: {}
        },
        expected: false
      },
      {
        data: {
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
        data: {
          Relationship: {}
        },
        expected: false
      },
      {
        data: {
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
        data: {
          Amount: {}
        },
        expected: false
      },
      {
        data: {
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
        data: {
          Frequency: {}
        },
        expected: false
      },
      {
        data: {
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
        data: {},
        expected: false
      },
      {
        data: {
          Citizenship: {}
        },
        expected: false
      },
      {
        data: {
          Citizenship: {
            value: ['United States']
          }
        },
        expected: true
      },
      {
        data: {
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
        data: {},
        expected: false
      },
      {
        data: {
          HasForeignSupport: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          HasForeignSupport: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          HasForeignSupport: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Name: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
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
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignActivitiesSupportValidator, 'isValid')
  })
})
