import ForeignBusinessEmploymentValidator, {
  ForeignBusinessEmploymentItemValidator
} from './foreignbusinessemployment'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Foreign business employment component validation', function() {
  it('validate foreign business employment name', () => {
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
        data: {
          Description: {}
        },
        expected: false
      },
      {
        data: {
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
        data: {
          Date: {}
        },
        expected: false
      },
      {
        data: {
          Date: {
            day: '1',
            month: '1',
            year: '2016'
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
        data: {
          Address: {}
        },
        expected: false
      },
      {
        data: {
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
        data: {
          Accepted: ''
        },
        expected: false
      },
      {
        data: {
          Accepted: { value: 'No' }
        },
        expected: false
      },
      {
        data: {
          Accepted: { value: 'Yes' }
        },
        expected: false
      },
      {
        data: {
          Accepted: { value: 'Yes' },
          Explanation: {
            value: 'this is the explanation'
          }
        },
        expected: true
      },
      {
        data: {
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
        data: {},
        expected: false
      },
      {
        data: {
          HasForeignEmployment: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          HasForeignEmployment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          HasForeignEmployment: { value: 'Yes' },
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
                  Description: {
                    value: 'this is the description'
                  },
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016'
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
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessEmploymentValidator, 'isValid')
  })
})
