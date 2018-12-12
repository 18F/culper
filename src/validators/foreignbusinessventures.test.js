import ForeignBusinessVenturesValidator, {
  VenturesValidator
} from './foreignbusinessventures'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Foreign business ventures component validation', function() {
  it('validate foreign business ventures name', () => {
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

    battery(tests, VenturesValidator, 'validName')
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
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    battery(tests, VenturesValidator, 'validAddress')
  })

  it('validate foreign business ventures country', () => {
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

    battery(tests, VenturesValidator, 'validCitizenship')
  })

  it('validate foreign business ventures description', () => {
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

    battery(tests, VenturesValidator, 'validDescription')
  })

  it('validate foreign business ventures relationship', () => {
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

    battery(tests, VenturesValidator, 'validRelationship')
  })

  it('validate foreign business ventures date range', () => {
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
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              month: '1',
              day: '1',
              year: '2012',
              date: new Date('1/1/2012')
            },
            present: false
          }
        },
        expected: true
      }
    ]

    battery(tests, VenturesValidator, 'validDates')
  })

  it('validate foreign business ventures association', () => {
    const tests = [
      {
        state: {
          Association: {}
        },
        expected: false
      },
      {
        state: {
          Association: {
            value: 'this is the association'
          }
        },
        expected: true
      }
    ]

    battery(tests, VenturesValidator, 'validAssociation')
  })

  it('validate foreign business ventures position', () => {
    const tests = [
      {
        state: {
          Position: {}
        },
        expected: false
      },
      {
        state: {
          Position: {
            value: 'this is the position'
          }
        },
        expected: true
      }
    ]

    battery(tests, VenturesValidator, 'validPosition')
  })

  it('validate foreign business ventures service', () => {
    const tests = [
      {
        state: {
          Service: {}
        },
        expected: false
      },
      {
        state: {
          Service: {
            value: 'this is the service'
          }
        },
        expected: true
      }
    ]

    battery(tests, VenturesValidator, 'validService')
  })

  it('validate foreign business ventures support', () => {
    const tests = [
      {
        state: {
          Support: {}
        },
        expected: false
      },
      {
        state: {
          Support: {
            value: 'this is the support'
          }
        },
        expected: true
      }
    ]

    battery(tests, VenturesValidator, 'validSupport')
  })

  it('validate foreign business ventures compensation', () => {
    const tests = [
      {
        state: {
          Compensation: {}
        },
        expected: false
      },
      {
        state: {
          Compensation: {
            value: 'this is the compensation'
          }
        },
        expected: true
      }
    ]

    battery(tests, VenturesValidator, 'validCompensation')
  })

  it('validate foreign business ventures', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignVentures: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasForeignVentures: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignVentures: { value: 'Yes' },
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
                  Citizenship: {
                    value: ['United States', 'Germany']
                  },
                  Description: {
                    value: 'this is the description'
                  },
                  Relationship: {
                    value: 'this is the relationship'
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Association: {
                    value: 'this is the association'
                  },
                  Position: {
                    value: 'this is the position'
                  },
                  Service: {
                    value: 'this is the service'
                  },
                  Support: {
                    value: 'this is the support'
                  },
                  Compensation: {
                    value: 'this is the compensation'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessVenturesValidator, 'isValid')
  })
})
