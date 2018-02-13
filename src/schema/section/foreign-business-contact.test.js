import { unschema } from '../schema'
import { foreignBusinessContact } from './foreign-business-contact'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignContact: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            Name: {},
            Location: {
              country: null
            },
            Date: {},
            Governments: {},
            Establishment: {},
            Representatives: {},
            Purpose: {},
            SubsequentContacts: {
              branch: null,
              items: [{
                Item: {
                  Has: {},
                  Subsequent: {},
                  Recent: {},
                  Future: {}
                }
              }]
            }
          }
        }]
      }
    }

    expect(unschema(foreignBusinessContact(data))).toEqual(data)
  })
})
