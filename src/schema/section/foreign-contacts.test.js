import { unschema } from '../schema'
import { foreignContacts } from './foreign-contacts'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignContacts: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              NameNotApplicable: {},
              NameExplanation: {},
              FirstContact: {},
              LastContact: {},
              Methods: {},
              MethodsExplanation: {},
              Frequency: {},
              FrequencyExplanation: {},
              Relationship: {},
              RelationshipExplanation: {},
              Aliases: {
                branch: null,
                items: [
                  {
                    Item: {
                      Has: {},
                      Alias: {}
                    }
                  }
                ]
              },
              Citizenship: {},
              Birthdate: {},
              BirthdateNotApplicable: {},
              Birthplace: {
                country: null
              },
              BirthplaceNotApplicable: {},
              Address: {
                country: null
              },
              AddressNotApplicable: {},
              Employer: {},
              EmployerNotApplicable: {},
              EmployerAddress: {
                country: null
              },
              EmployerAddressNotApplicable: {},
              HasAffiliations: {},
              Affiliations: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignContacts(data))).toEqual(data)
  })
})
