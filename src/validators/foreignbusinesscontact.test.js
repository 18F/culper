import ForeignBusinessContactValidator, {
  ContactValidator,
} from './foreignbusinesscontact'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Foreign business contact component validation', () => {
  it('validate foreign business contact name', () => {
    const tests = [
      {
        state: {
          Name: {},
        },
        expected: false,
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
            suffix: 'Jr',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validName')
  })

  it('validate foreign business contact location', () => {
    const tests = [
      {
        state: {
          Location: {},
        },
        expected: false,
      },
      {
        state: {
          Location: {
            country: { value: 'United States' },
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY,
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validLocation')
  })

  it('validate foreign business contact date', () => {
    const tests = [
      {
        state: {
          Date: {},
        },
        expected: false,
      },
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validDate')
  })

  it('validate foreign business contact governments', () => {
    const tests = [
      {
        state: {
          Governments: {},
        },
        expected: false,
      },
      {
        state: {
          Governments: {
            value: ['Germany'],
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validGovernments')
  })

  it('validate foreign business contact establishment', () => {
    const tests = [
      {
        state: {
          Establishment: {},
        },
        expected: false,
      },
      {
        state: {
          Establishment: {
            value: 'this is the establishment',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validEstablishment')
  })

  it('validate foreign business contact representatives', () => {
    const tests = [
      {
        state: {
          Representatives: {},
        },
        expected: false,
      },
      {
        state: {
          Representatives: {
            value: 'this is the representatives',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validRepresentatives')
  })

  it('validate foreign business contact purpose', () => {
    const tests = [
      {
        state: {
          Purpose: {},
        },
        expected: false,
      },
      {
        state: {
          Purpose: {
            value: 'this is the purpose',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validPurpose')
  })

  it('validate foreign business contact subsequent contacts', () => {
    const tests = [
      {
        state: {
          SubsequentContacts: null,
        },
        expected: false,
      },
      {
        state: {
          SubsequentContacts: {},
        },
        expected: false,
      },
      {
        state: {
          SubsequentContacts: {
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        state: {
          SubsequentContacts: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        state: {
          SubsequentContacts: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Explanation: {},
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        state: {
          SubsequentContacts: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Subsequent: {
                    value: 'This is the subsequent purpose',
                  },
                  Recent: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  Future: {
                    value: 'This is the subsequent future meetings',
                  },
                },
              },
              {
                Item: {
                  Has: { value: 'No' },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]

    battery(tests, ContactValidator, 'validSubsequentContacts')
  })

  it('validate foreign business contact', () => {
    const tests = [
      {
        state: {},
        expected: false,
      },
      {
        state: {
          HasForeignContact: { value: 'No' },
        },
        expected: true,
      },
      {
        state: {
          HasForeignContact: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [],
          },
        },
        expected: false,
      },
      {
        state: {
          HasForeignContact: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{}],
          },
        },
        expected: false,
      },
      {
        state: {
          HasForeignContact: { value: 'Yes' },
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
                    suffix: 'Jr',
                  },
                  Location: {
                    country: { value: 'United States' },
                    city: 'Arlington',
                    zipcode: '22202',
                    state: 'VA',
                    layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY,
                  },
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  Governments: {
                    value: ['Germany'],
                  },
                  Establishment: {
                    value: 'this is the establishment',
                  },
                  Representatives: {
                    value: 'this is the representatives',
                  },
                  Purpose: {
                    value: 'this is the purpose',
                  },
                  SubsequentContacts: {
                    items: [{ Item: { Has: { value: 'No' } } }],
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignBusinessContactValidator, 'isValid')
  })
})
