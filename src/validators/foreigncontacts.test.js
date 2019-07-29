import ForeignContactsValidator, {
  ForeignNationalValidator,
} from './foreigncontacts'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Foreign contacts component validation', () => {
  it('validate foreign national name', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          NameNotApplicable: {
            applicable: false,
          },
        },
        expected: false,
      },
      {
        data: {
          NameNotApplicable: {
            applicable: false,
          },
          NameExplanation: {
            value: 'explanation',
          },
        },
        expected: true,
      },
      {
        data: {
          NameNotApplicable: {
            applicable: true,
          },
          Name: {},
        },
        expected: false,
      },
      {
        data: {
          NameNotApplicable: {
            applicable: true,
          },
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

    battery(tests, ForeignNationalValidator, 'validName')
  })

  it('validate foreign nation date of first contact', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          FirstContact: {
            day: '1',
            month: '1',
            year: '2016',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validFirstContact')
  })

  it('validate foreign nation date of last contact', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          LastContact: {
            day: '1',
            month: '1',
            year: '2016',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validLastContact')
  })

  it('validate foreign national methods of contact', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          Methods: { values: [] },
        },
        expected: false,
      },
      {
        data: {
          Methods: { values: ['In person'] },
        },
        expected: true,
      },
      {
        data: {
          Methods: { values: ['In person', 'Written'] },
        },
        expected: true,
      },
      {
        data: {
          Methods: { values: ['In person', 'Other'] },
        },
        expected: false,
      },
      {
        data: {
          Methods: { values: ['In person', 'Other'] },
          MethodsExplanation: {
            value: 'explanation',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validMethods')
  })

  it('validate foreign national frequency of contact', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          Frequency: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          Frequency: { value: 'Weekly' },
        },
        expected: true,
      },
      {
        data: {
          Frequency: { value: 'Other' },
        },
        expected: false,
      },
      {
        data: {
          Frequency: { value: 'Other' },
          FrequencyExplanation: {
            value: 'explanation',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validFrequency')
  })

  it('validate foreign national nature of the relationship', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          Relationship: { values: [] },
        },
        expected: false,
      },
      {
        data: {
          Relationship: { values: ['Personal'] },
        },
        expected: true,
      },
      {
        data: {
          Relationship: { values: ['Personal', 'Professional'] },
        },
        expected: true,
      },
      {
        data: {
          Relationship: { values: ['Personal', 'Other'] },
        },
        expected: false,
      },
      {
        data: {
          Relationship: { values: ['Personal', 'Other'] },
          RelationshipExplanation: {
            value: 'explanation',
          },
        },
        expected: true,
      },
      {
        data: {
          Relationship: { values: ['Personal', 'Obligation'] },
          RelationshipExplanation: {
            value: 'explanation',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validRelationship')
  })

  it('validate foreign national aliases', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          Aliases: {
            items: [],
          },
        },
        expected: false,
      },
      {
        data: {
          Aliases: {
            items: [{ Item: { Has: { value: 'No' } } }],
          },
        },
        expected: true,
      },
      {
        data: {
          Aliases: {
            items: [{ Item: { Has: { value: 'Yes' } } }],
          },
        },
        expected: false,
      },
      {
        data: {
          Aliases: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Alias: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    suffix: 'Jr',
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

    battery(tests, ForeignNationalValidator, 'validAliases')
  })

  it('validate foreign national citizenship', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          Citizenship: {},
        },
        expected: false,
      },
      {
        data: {
          Citizenship: {
            value: ['United States'],
          },
        },
        expected: true,
      },
      {
        data: {
          Citizenship: {
            value: ['United States', 'Germany'],
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validCitizenship')
  })

  it('validate foreign national date of birth', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          BirthdateNotApplicable: {
            applicable: false,
          },
        },
        expected: true,
      },
      {
        data: {
          BirthdateNotApplicable: {
            applicable: true,
          },
          Birthdate: {},
        },
        expected: false,
      },
      {
        data: {
          BirthdateNotApplicable: {
            applicable: true,
          },
          Birthdate: {
            day: '1',
            month: '1',
            year: '2016',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validBirthdate')
  })

  it('validate foreign national place of birth', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          BirthplaceNotApplicable: {
            applicable: false,
          },
        },
        expected: true,
      },
      {
        data: {
          BirthplaceNotApplicable: {
            applicable: true,
          },
          Birthplace: {},
        },
        expected: false,
      },
      {
        data: {
          BirthplaceNotApplicable: {
            applicable: true,
          },
          Birthplace: {
            domestic: 'Yes',
            country: { value: 'United States' },
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validBirthplace')
  })

  it('validate foreign national current address', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          AddressNotApplicable: {
            applicable: false,
          },
        },
        expected: true,
      },
      {
        data: {
          AddressNotApplicable: {
            applicable: true,
          },
          Address: {},
        },
        expected: false,
      },
      {
        data: {
          AddressNotApplicable: {
            applicable: true,
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validAddress')
  })

  it('validate foreign national employer', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          EmployerNotApplicable: {
            applicable: false,
          },
        },
        expected: true,
      },
      {
        data: {
          EmployerNotApplicable: {
            applicable: true,
          },
          Employer: {},
        },
        expected: false,
      },
      {
        data: {
          EmployerNotApplicable: {
            applicable: true,
          },
          Employer: {
            value: 'employer name',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validEmployer')
  })

  it('validate foreign national employer address', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          EmployerAddressNotApplicable: {
            applicable: false,
          },
        },
        expected: true,
      },
      {
        data: {
          EmployerAddressNotApplicable: {
            applicable: true,
          },
          EmployerAddress: {},
        },
        expected: false,
      },
      {
        data: {
          EmployerAddressNotApplicable: {
            applicable: true,
          },
          EmployerAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validEmployerAddress')
  })

  it('validate foreign national affiliations', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          HasAffiliations: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          HasAffiliations: { value: "I don't know" },
        },
        expected: true,
      },
      {
        data: {
          HasAffiliations: { value: 'Yes' },
          Affiliations: {},
        },
        expected: false,
      },
      {
        data: {
          HasAffiliations: { value: 'Yes' },
          Affiliations: {
            value: 'list of my affiliations',
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignNationalValidator, 'validAffiliations')
  })

  it('validate foreign contacts', () => {
    const tests = [
      {
        data: {},
        expected: false,
      },
      {
        data: {
          HasForeignContacts: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          HasForeignContacts: { value: 'Yes' },
        },
        expected: false,
      },
      {
        data: {
          HasForeignContacts: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  NameNotApplicable: {
                    applicable: false,
                  },
                  NameExplanation: {
                    value: 'explanation',
                  },
                  FirstContact: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  LastContact: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  Methods: { values: ['In person'] },
                  Frequency: { value: 'Weekly' },
                  Relationship: { values: ['Personal'] },
                  Aliases: {
                    items: [{ Item: { Has: { value: 'No' } } }],
                  },
                  Citizenship: {
                    value: ['United States'],
                  },
                  BirthdateNotApplicable: {
                    applicable: false,
                  },
                  BirthplaceNotApplicable: {
                    applicable: false,
                  },
                  AddressNotApplicable: {
                    applicable: false,
                  },
                  EmployerNotApplicable: {
                    applicable: false,
                  },
                  EmployerAddressNotApplicable: {
                    applicable: false,
                  },
                  HasAffiliations: { value: 'No' },
                  AlternateAddress: {
                    HasDifferentAddress: { value: 'No' },
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]

    battery(tests, ForeignContactsValidator, 'isValid')
  })
})
