import ForeignContactsValidator, { ForeignNationalValidator } from './foreigncontacts'
import { battery } from './helpers'

describe('Foreign contacts component validation', function () {
  it('validate foreign national name', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          NameNotApplicable: {
            applicable: false
          }
        },
        expected: false
      },
      {
        state: {
          NameNotApplicable: {
            applicable: false
          },
          NameExplanation: {
            value: 'explanation'
          }
        },
        expected: true
      },
      {
        state: {
          NameNotApplicable: {
            applicable: true
          },
          Name: {}
        },
        expected: false
      },
      {
        state: {
          NameNotApplicable: {
            applicable: true
          },
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

    battery(tests, ForeignNationalValidator, 'validName')
  })

  it('validate foreign nation date of first contact', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          FirstContact: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validFirstContact')
  })

  it('validate foreign nation date of last contact', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          LastContact: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validLastContact')
  })

  it('validate foreign national methods of contact', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          Methods: []
        },
        expected: false
      },
      {
        state: {
          Methods: ['In person']
        },
        expected: true
      },
      {
        state: {
          Methods: ['In person', 'Written']
        },
        expected: true
      },
      {
        state: {
          Methods: ['In person', 'Other']
        },
        expected: false
      },
      {
        state: {
          Methods: ['In person', 'Other'],
          MethodsExplanation: {
            value: 'explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validMethods')
  })

  it('validate foreign national frequency of contact', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          Frequency: ''
        },
        expected: false
      },
      {
        state: {
          Frequency: 'Weekly'
        },
        expected: true
      },
      {
        state: {
          Frequency: 'Other'
        },
        expected: false
      },
      {
        state: {
          Frequency: 'Other',
          FrequencyExplanation: {
            value: 'explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validFrequency')
  })

  it('validate foreign national nature of the relationship', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          Relationship: []
        },
        expected: false
      },
      {
        state: {
          Relationship: ['Personal']
        },
        expected: true
      },
      {
        state: {
          Relationship: ['Personal', 'Professional']
        },
        expected: true
      },
      {
        state: {
          Relationship: ['Personal', 'Other']
        },
        expected: false
      },
      {
        state: {
          Relationship: ['Personal', 'Other'],
          RelationshipExplanation: {
            value: 'explanation'
          }
        },
        expected: true
      },
      {
        state: {
          Relationship: ['Personal', 'Obligation'],
          RelationshipExplanation: {
            value: 'explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validRelationship')
  })

  it('validate foreign national aliases', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          Aliases: []
        },
        expected: false
      },
      {
        state: {
          Aliases: [
            {
              Has: 'No'
            }
          ]
        },
        expected: true
      },
      {
        state: {
          Aliases: [
            {
              Has: 'Yes'
            }
          ]
        },
        expected: false
      },
      {
        state: {
          Aliases: [
            {
              Has: 'Yes',
              Alias: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                lastInitialOnly: false,
                suffix: 'Jr'
              }
            }
          ]
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validAliases')
  })

  it('validate foreign national citizenship', function () {
    const tests = [
      {
        state: {
        },
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
            value: [
              { name: 'United States', value: 'United States' }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' },
              { name: 'Germany', value: 'Germany' }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validCitizenship')
  })

  it('validate foreign national date of birth', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          BirthdateNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          BirthdateNotApplicable: {
            applicable: true
          },
          Birthdate: {}
        },
        expected: false
      },
      {
        state: {
          BirthdateNotApplicable: {
            applicable: true
          },
          Birthdate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validBirthdate')
  })

  it('validate foreign national place of birth', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          BirthplaceNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          BirthplaceNotApplicable: {
            applicable: true
          },
          Birthplace: {}
        },
        expected: false
      },
      {
        state: {
          BirthplaceNotApplicable: {
            applicable: true
          },
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

    battery(tests, ForeignNationalValidator, 'validBirthplace')
  })

  it('validate foreign national current address', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          AddressNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          AddressNotApplicable: {
            applicable: true
          },
          Address: {}
        },
        expected: false
      },
      {
        state: {
          AddressNotApplicable: {
            applicable: true
          },
          Address: {
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

    battery(tests, ForeignNationalValidator, 'validAddress')
  })

  it('validate foreign national employer', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          EmployerNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          EmployerNotApplicable: {
            applicable: true
          },
          Employer: {}
        },
        expected: false
      },
      {
        state: {
          EmployerNotApplicable: {
            applicable: true
          },
          Employer: {
            value: 'employer name'
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validEmployer')
  })

  it('validate foreign national employer address', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          EmployerAddressNotApplicable: {
            applicable: false
          }
        },
        expected: true
      },
      {
        state: {
          EmployerAddressNotApplicable: {
            applicable: true
          },
          EmployerAddress: {}
        },
        expected: false
      },
      {
        state: {
          EmployerAddressNotApplicable: {
            applicable: true
          },
          EmployerAddress: {
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

    battery(tests, ForeignNationalValidator, 'validEmployerAddress')
  })

  it('validate foreign national affiliations', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasAffiliations: 'No'
        },
        expected: true
      },
      {
        state: {
          HasAffiliations: 'Yes',
          Affiliations: {}
        },
        expected: false
      },
      {
        state: {
          HasAffiliations: 'Yes',
          Affiliations: {
            value: 'list of my affiliations'
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignNationalValidator, 'validAffiliations')
  })

  it('validate foreign contacts', function () {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignContacts: 'No'
        },
        expected: true
      },
      {
        state: {
          HasForeignContacts: 'Yes'
        },
        expected: false
      },
      {
        state: {
          HasForeignContacts: 'Yes',
          List: [
            {
              Item: {
                NameNotApplicable: {
                  applicable: false
                },
                NameExplanation: {
                  value: 'explanation'
                },
                FirstContact: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                LastContact: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Methods: ['In person'],
                Frequency: 'Weekly',
                Relationship: ['Personal'],
                Aliases: [
                  {
                    Has: 'No'
                  }
                ],
                Citizenship: {
                  value: [
                    { name: 'United States', value: 'United States' }
                  ]
                },
                BirthdateNotApplicable: {
                  applicable: false
                },
                BirthplaceNotApplicable: {
                  applicable: false
                },
                AddressNotApplicable: {
                  applicable: false
                },
                EmployerNotApplicable: {
                  applicable: false
                },
                EmployerAddressNotApplicable: {
                  applicable: false
                },
                HasAffiliations: 'No'
              }
            }
          ]
        },
        expected: true
      }
    ]

    battery(tests, ForeignContactsValidator, 'isValid')
  })
})
