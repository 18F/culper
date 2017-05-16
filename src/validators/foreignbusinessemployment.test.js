import ForeignBusinessEmploymentValidator, { EmploymentValidator } from './foreignbusinessemployment'
import { battery } from './helpers'

describe('Foreign business employment component validation', function () {
  it('validate foreign business employment name', () => {
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

    battery(tests, EmploymentValidator, 'validName')
  })

  it('validate foreign business employment description', () => {
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

    battery(tests, EmploymentValidator, 'validDescription')
  })

  it('validate foreign business employment date', () => {
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

    battery(tests, EmploymentValidator, 'validDate')
  })

  it('validate foreign business employment address', () => {
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

    battery(tests, EmploymentValidator, 'validAddress')
  })

  it('validate foreign business employment acceptance', () => {
    const tests = [
      {
        state: {
          Accepted: ''
        },
        expected: false
      },
      {
        state: {
          Accepted: 'No'
        },
        expected: true
      },
      {
        state: {
          Accepted: 'Yes'
        },
        expected: false
      },
      {
        state: {
          Accepted: 'Yes',
          Explanation: {
            value: 'this is the explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, EmploymentValidator, 'validAcceptance')
  })

  it('validate foreign business employment', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignEmployment: 'No'
        },
        expected: true
      },
      {
        state: {
          HasForeignEmployment: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasForeignEmployment: 'Yes',
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
                Description: {
                  value: 'this is the description'
                },
                Date: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Address: {
                  addressType: 'International',
                  address: '1234 Some Rd',
                  city: 'Munich',
                  country: 'Germany'
                },
                Accepted: 'No'
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessEmploymentValidator, 'isValid')
  })
})
