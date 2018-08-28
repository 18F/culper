import ForeignBusinessFamilyValidator, {
  FamilyValidator
} from './foreignbusinessfamily'
import { battery } from './helpers'

describe('Foreign business family component validation', function() {
  it('validate foreign business family name', () => {
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

    battery(tests, FamilyValidator, 'validName')
  })

  it('validate foreign business family agency', () => {
    const tests = [
      {
        state: {
          Agency: {}
        },
        expected: false
      },
      {
        state: {
          Agency: {
            value: 'this is the agency'
          }
        },
        expected: true
      }
    ]

    battery(tests, FamilyValidator, 'validAgency')
  })

  it('validate foreign business family country', () => {
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

    battery(tests, FamilyValidator, 'validCountry')
  })

  it('validate foreign business family date', () => {
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
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    battery(tests, FamilyValidator, 'validDate')
  })

  it('validate foreign business family circumstances', () => {
    const tests = [
      {
        state: {
          Circumstances: {}
        },
        expected: false
      },
      {
        state: {
          Circumstances: {
            value: 'this is the circumstances'
          }
        },
        expected: true
      }
    ]

    battery(tests, FamilyValidator, 'validCircumstances')
  })

  it('validate foreign business family', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignFamily: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasForeignFamily: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignFamily: { value: 'Yes' },
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
                    lastInitialOnly: false,
                    suffix: 'Jr'
                  },
                  Agency: {
                    value: 'this is the agency'
                  },
                  Country: {
                    value: 'United States'
                  },
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    date: new Date('1/1/2016')
                  },
                  Circumstances: {
                    value: 'this is the circumstances'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessFamilyValidator, 'isValid')
  })
})
