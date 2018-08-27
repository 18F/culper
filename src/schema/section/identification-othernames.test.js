import { unschema } from '../schema'
import { identificationOthernames } from './identification-othernames'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasOtherNames: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              MaidenName: {},
              DatesUsed: {
                from: {},
                to: {},
                present: null
              },
              Reason: {}
            }
          }
        ]
      }
    }

    expect(unschema(identificationOthernames(data))).toEqual(data)
  })
})
