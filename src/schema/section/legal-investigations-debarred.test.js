import { unschema } from '../schema'
import { legalInvestigationsDebarred } from './legal-investigations-debarred'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasDebarment: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Agency: {},
              Date: {},
              Explanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(legalInvestigationsDebarred(data))).toEqual(data)
  })
})
