import { unschema } from '../schema'
import { legalInvestigationsRevoked } from './legal-investigations-revoked'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasRevocations: { value: 'Yes' },
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

    expect(unschema(legalInvestigationsRevoked(data))).toEqual(data)
  })
})
