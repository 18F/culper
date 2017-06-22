import ForeignBusinessContactValidator, { ContactValidator } from './foreignbusinesscontact'
import { battery } from './helpers'
import { Layouts } from '../components/Form/Location'

describe('Foreign business contact component validation', function () {
  it('validate foreign business contact name', () => {
    const tests = [
      {
        props: {
          Name: {}
        },
        expected: false
      },
      {
        props: {
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

    battery(tests, ContactValidator, 'validName')
  })

  it('validate foreign business contact location', () => {
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
            country: 'United States',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            layout: Layouts.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
          }
        },
        expected: true
      }
    ]

    battery(tests, ContactValidator, 'validLocation')
  })

  it('validate foreign business contact date', () => {
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
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    battery(tests, ContactValidator, 'validDate')
  })

  it('validate foreign business contact governments', () => {
    const tests = [
      {
        props: {
          Governments: {}
        },
        expected: false
      },
      {
        props: {
          Governments: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ContactValidator, 'validGovernments')
  })

  it('validate foreign business contact establishment', () => {
    const tests = [
      {
        props: {
          Establishment: {}
        },
        expected: false
      },
      {
        props: {
          Establishment: {
            value: 'this is the establishment'
          }
        },
        expected: true
      }
    ]

    battery(tests, ContactValidator, 'validEstablishment')
  })

  it('validate foreign business contact representatives', () => {
    const tests = [
      {
        props: {
          Representatives: {}
        },
        expected: false
      },
      {
        props: {
          Representatives: {
            value: 'this is the representatives'
          }
        },
        expected: true
      }
    ]

    battery(tests, ContactValidator, 'validRepresentatives')
  })

  it('validate foreign business contact purpose', () => {
    const tests = [
      {
        props: {
          Purpose: {}
        },
        expected: false
      },
      {
        props: {
          Purpose: {
            value: 'this is the purpose'
          }
        },
        expected: true
      }
    ]

    battery(tests, ContactValidator, 'validPurpose')
  })

  it('validate foreign business contact subsequent contacts', () => {
    const tests = [
      {
        props: {
          SubsequentContacts: null
        },
        expected: false
      },
      {
        props: {
          SubsequentContacts: {}
        },
        expected: false
      },
      {
        props: {
          SubsequentContacts: {
            List: [
              {
                Has: 'No'
              }
            ]
          }
        },
        expected: true
      },
      {
        props: {
          SubsequentContacts: {
            List: [
              {
                Has: 'Yes'
              }
            ]
          }
        },
        expected: false
      },
      {
        props: {
          SubsequentContacts: {
            List: [
              {
                Has: 'Yes',
                Explanation: {}
              }
            ]
          }
        },
        expected: false
      },
      {
        props: {
          SubsequentContacts: {
            List: [
              {
                Has: 'Yes',
                Subsequent: {
                  value: 'This is the subsequent purpose'
                },
                Recent: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Future: {
                  value: 'This is the subsequent future meetings'
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ContactValidator, 'validSubsequentContacts')
  })

  it('validate foreign business contact', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasForeignContact: 'No'
        },
        expected: true
      },
      {
        props: {
          HasForeignContact: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignContact: 'Yes',
          List: [{}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignContact: 'Yes',
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
              Location: {
                country: 'United States',
                city: 'Arlington',
                zipcode: '22202',
                state: 'VA',
                layout: Layouts.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
              },
              Date: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              Governments: {
                value: [{ name: 'Germany', value: 'Germany' }]
              },
              Establishment: {
                value: 'this is the establishment'
              },
              Representatives: {
                value: 'this is the representatives'
              },
              Purpose: {
                value: 'this is the purpose'
              },
              SubsequentContacts: {
                List: [
                  {
                    Has: 'No'
                  }
                ]
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessContactValidator, 'isValid')
  })
})
