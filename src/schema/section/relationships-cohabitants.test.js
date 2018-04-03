import { unschema } from '../schema'
import { relationshipsCohabitants } from './relationships-cohabitants'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasCohabitant: { value: 'Yes' },
      CohabitantList: {
        branch: { value: 'No' },
        items: [{
          Item: {
            Name: {},
            Birthdate: {},
            BirthPlace: {
              country: null
            },
            ForeignBornDocument: {
              DocumentType: {},
              OtherExplanation: {},
              DocumentNumber: {},
              DocumentExpiration: {},
              DocumentExpirationNotApplicable: {}
            },
            SSN: {},
            OtherNames: {
              branch: null,
              items: [{
                Item: {
                  Has: {},
                  OtherName: {},
                  MaidenName: {},
                  DatesUsed: {
                    from: {},
                    to: {},
                    present: null
                  }
                }
              }]
            },
            Citizenship: {},
            CohabitationBegan: {}
          }
        }]
      }
    }

    expect(unschema(relationshipsCohabitants(data))).toEqual(data)
  })
})
