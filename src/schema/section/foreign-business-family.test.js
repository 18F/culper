import { unschema } from '../schema'
import { foreignBusinessFamily } from './foreign-business-family'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignFamily: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            Name: {},
            Agency: {},
            Country: {},
            Date: {},
            Circumstances: {}
          }
        }]
      }
    }

    expect(unschema(foreignBusinessFamily(data))).toEqual(data)
  })
})
