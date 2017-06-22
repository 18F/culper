import ForeignBusinessSponsorshipValidator, { SponsorshipValidator } from './foreignbusinesssponsorship'
import { battery } from './helpers'
import { Layouts } from '../components/Form/Location'

describe('Foreign business sponsorship component validation', function () {
  it('validate foreign business sponsorship name', () => {
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

    battery(tests, SponsorshipValidator, 'validName')
  })

  it('validate foreign business sponsorship birthdate', () => {
    const tests = [
      {
        props: {
          Birthdate: {}
        },
        expected: false
      },
      {
        props: {
          Birthdate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
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
        props: {
          Birthplace: {}
        },
        expected: false
      },
      {
        props: {
          Birthplace: {
            domestic: 'Yes',
            country: 'United States',
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA'
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
        props: {
          Address: {}
        },
        expected: false
      },
      {
        props: {
          Address: {
            city: 'Arlington',
            country: 'Germnay',
            layout: Layouts.CITY_COUNTRY
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
        props: {
          Citizenship: {}
        },
        expected: false
      },
      {
        props: {
          Citizenship: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
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
        props: {
          Dates: {}
        },
        expected: false
      },
      {
        props: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
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
        props: {
          Residence: {}
        },
        expected: false
      },
      {
        props: {
          Residence: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
        props: {
          Organization: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {
          OrganizationAddress: {}
        },
        expected: false
      },
      {
        props: {
          OrganizationAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
        props: {
          Stay: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Sponsorship: {}
        },
        expected: false
      },
      {
        props: {
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
        props: {},
        expected: false
      },
      {
        props: {
          HasForeignSponsorship: 'No'
        },
        expected: true
      },
      {
        props: {
          HasForeignSponsorship: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignSponsorship: 'Yes',
          List: [{}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignSponsorship: 'Yes',
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
              Birthdate: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              BirthdateNotApplicable: {
                applicable: true
              },
              Birthplace: {
                domestic: 'Yes',
                country: 'United States',
                city: 'Arlington',
                county: 'Arlington',
                state: 'VA'
              },
              Address: {
                country: 'United States',
                city: 'Arlington',
                layout: Layouts.CITY_COUNTRY
              },
              Citizenship: {
                value: [{ name: 'Germany', value: 'Germany' }]
              },
              Dates: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                },
                present: false
              },
              Residence: {
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
              },
              Organization: {
                value: 'this is the organization'
              },
              OrganizationNotApplicable: {
                applicable: true
              },
              OrganizationAddress: {
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
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
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessSponsorshipValidator, 'isValid')
  })
})
