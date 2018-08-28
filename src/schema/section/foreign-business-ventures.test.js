import { unschema } from '../schema'
import { foreignBusinessVentures } from './foreign-business-ventures'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignVentures: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              Address: {
                country: null
              },
              Citizenship: {},
              Description: {},
              Relationship: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Association: {},
              Position: {},
              Service: {},
              Support: {},
              Compensation: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignBusinessVentures(data))).toEqual(data)
  })
})
