import { unschema } from '../schema'
import { foreignBusinessVoting } from './foreign-business-voting'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignVoting: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Date: {},
              Country: {},
              Reason: {},
              Eligibility: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignBusinessVoting(data))).toEqual(data)
  })
})
