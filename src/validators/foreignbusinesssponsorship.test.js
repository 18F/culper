import ForeignBusinessSponsorshipValidator, {
  SponsorshipValidator
} from './foreignbusinesssponsorship'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Foreign business sponsorship component validation', function() {
  it('validate foreign business sponsorship name', () => {
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

    battery(tests, SponsorshipValidator, 'validName')
  })

  it('validate foreign business sponsorship birthdate', () => {
    const tests = [
      {
        state: {
          Birthdate: {}
        },
        expected: false
      },
      {
        state: {
          Birthdate: {
            day: '1',
            month: '1',
            year: '2016'
          },
          BirthdateNotApplicable: {
            applicable: true
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validBirthdate')
  })

  it('validate foreign business sponsorship birthplace', () => {
    const tests = [
      {
        state: {
          Birthplace: {}
        },
        expected: false
      },
      {
        state: {
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germnay' },
            layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validBirthplace')
  })

  it('validate foreign business sponsorship address', () => {
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
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validAddress')
  })

  it('validate foreign business sponsorship citizenship', () => {
    const tests = [
      {
        state: {
          Citizenship: {}
        },
        expected: false
      },
      {
        state: {
          Citizenship: {
            value: ['Germany']
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validCitizenship')
  })

  it('validate foreign business sponsorship dates', () => {
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

    battery(tests, SponsorshipValidator, 'validDates')
  })

  it('validate foreign business sponsorship residence', () => {
    const tests = [
      {
        state: {
          Residence: {}
        },
        expected: false
      },
      {
        state: {
          Residence: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validResidence')
  })

  it('validate foreign business sponsorship organization', () => {
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
          },
          OrganizationNotApplicable: {
            applicable: true
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validOrganization')
  })

  it('validate foreign business sponsorship organization address', () => {
    const tests = [
      {
        state: {
          OrganizationAddress: {}
        },
        expected: false
      },
      {
        state: {
          OrganizationAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          OrganizationAddressNotApplicable: {
            applicable: true
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validOrganizationAddress')
  })

  it('validate foreign business sponsorship purpose of stay', () => {
    const tests = [
      {
        state: {
          Stay: {}
        },
        expected: false
      },
      {
        state: {
          Stay: {
            value: 'this is the stay'
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validStay')
  })

  it('validate foreign business sponsorship purpose', () => {
    const tests = [
      {
        state: {
          Sponsorship: {}
        },
        expected: false
      },
      {
        state: {
          Sponsorship: {
            value: 'this is the sponsorship'
          }
        },
        expected: true
      }
    ]

    battery(tests, SponsorshipValidator, 'validSponsorship')
  })

  it('validate foreign business sponsorship', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignSponsorship: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasForeignSponsorship: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignSponsorship: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignSponsorship: { value: 'Yes' },
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
                  Birthdate: {
                    day: '1',
                    month: '1',
                    year: '2016'
                  },
                  BirthdateNotApplicable: {
                    applicable: true
                  },
                  Birthplace: {
                    country: { value: 'Germnay' },
                    city: 'Munich',
                    layout: Location.CITY_COUNTRY
                  },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Citizenship: {
                    value: ['Germany']
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
                  },
                  Residence: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Organization: {
                    value: 'this is the organization'
                  },
                  OrganizationNotApplicable: {
                    applicable: true
                  },
                  OrganizationAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  OrganizationAddressNotApplicable: {
                    applicable: true
                  },
                  Stay: {
                    value: 'this is the stay'
                  },
                  Sponsorship: {
                    value: 'this is the sponsorship'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessSponsorshipValidator, 'isValid')
  })
})
