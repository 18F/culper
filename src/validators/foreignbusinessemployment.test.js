import ForeignBusinessEmploymentValidator, { ForeignBusinessEmploymentItemValidator } from './foreignbusinessemployment'
import { battery } from './helpers'
import Location from '../components/Form/Location'

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

    battery(tests, ForeignBusinessEmploymentItemValidator, 'validName')
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

    battery(tests, ForeignBusinessEmploymentItemValidator, 'validDescription')
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

    battery(tests, ForeignBusinessEmploymentItemValidator, 'validDate')
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
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessEmploymentItemValidator, 'validAddress')
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
          Accepted: { value: 'No' }
        },
        expected: false
      },
      {
        state: {
          Accepted: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          Accepted: { value: 'Yes' },
          Explanation: {
            value: 'this is the explanation'
          }
        },
        expected: true
      },
      {
        state: {
          Accepted: { value: 'No' },
          Explanation: {
            value: 'this is the explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessEmploymentItemValidator, 'validAcceptance')
  })

  it('validate foreign business employment', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignEmployment: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasForeignEmployment: { value: 'Yes' },
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasForeignEmployment: { value: 'Yes' },
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
                  city: 'Munich',
                  country: { value: 'Germany' },
                  layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
                },
                Accepted: { value: 'Yes' },
                Explanation: {
                  value: 'This is an explanation'
                }
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
