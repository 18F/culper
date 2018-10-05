import { unschema } from '../schema'
import { relationshipsRelatives } from './relationships-relatives'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Relation: {},
              Name: {},
              Birthdate: {},
              Birthplace: {
                country: null
              },
              Citizenship: {},
              CitizenshipDocumentation: {},
              OtherCitizenshipDocumentation: {},
              MaidenSameAsListed: {},
              MaidenName: {},
              Aliases: {
                branch: null,
                items: [
                  {
                    Item: {
                      Has: {},
                      Name: {},
                      MaidenName: {},
                      Dates: {
                        from: {},
                        to: {},
                        present: null
                      },
                      Reason: {}
                    }
                  }
                ]
              },
              IsDeceased: {},
              Address: {
                country: null
              },
              DocumentNumber: {},
              CourtName: {},
              CourtAddress: {
                country: null
              },
              Document: {},
              DocumentComments: {},
              ResidenceDocumentNumber: {},
              Expiration: {},
              FirstContact: {},
              LastContact: {},
              Methods: {},
              MethodsComments: {},
              Frequency: {},
              FrequencyComments: {},
              EmployerNotApplicable: {},
              EmployerAddressNotApplicable: {},
              EmployerRelationshipNotApplicable: {},
              Employer: {},
              EmployerAddress: {
                country: null
              },
              HasAffiliation: {},
              EmployerRelationship: {}
            }
          }
        ]
      }
    }

    expect(unschema(relationshipsRelatives(data))).toEqual(data)
  })
})
