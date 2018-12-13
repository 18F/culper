import ForeignBusinessAdviceValidator, {
  AdviceValidator
} from './foreignbusinessadvice'
import { battery } from './helpers'

describe('Foreign business advice component validation', function() {
  it('validate foreign business advice description', () => {
    const tests = [
      {
        state: {
          Description: {}
        },
        expected: false
      },
      {
        state: {
          Description: {
            value: 'this is the description'
          }
        },
        expected: true
      }
    ]

    battery(tests, AdviceValidator, 'validDescription')
  })

  it('validate foreign business advice name', () => {
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
            suffix: 'Jr'
          }
        },
        expected: true
      }
    ]

    battery(tests, AdviceValidator, 'validName')
  })

  it('validate foreign business advice organization', () => {
    const tests = [
      {
        state: {
          Organization: {}
        },
        expected: false
      },
      {
        state: {
          Organization: {
            value: 'this is the organization'
          }
        },
        expected: true
      }
    ]

    battery(tests, AdviceValidator, 'validOrganization')
  })

  it('validate foreign business advice country', () => {
    const tests = [
      {
        state: {
          Country: {}
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'United States'
          }
        },
        expected: true
      }
    ]

    battery(tests, AdviceValidator, 'validCountry')
  })

  it('validate foreign business advice date range', () => {
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
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
            },
            present: false
          }
        },
        expected: true
      }
    ]

    battery(tests, AdviceValidator, 'validDates')
  })

  it('validate foreign business advice', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignAdvice: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasForeignAdvice: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignAdvice: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Description: {
                    value: 'this is the description'
                  },
                  Name: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    suffix: 'Jr'
                  },
                  Organization: {
                    value: 'this is the organization'
                  },
                  Country: {
                    value: 'United States'
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessAdviceValidator, 'isValid')
  })
})
