import { unschema } from '../schema'
import { foreignBusinessPolitical } from './foreign-business-political'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignPolitical: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Position: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Country: {},
              Reason: {},
              Eligibility: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignBusinessPolitical(data))).toEqual(data)
  })
})
