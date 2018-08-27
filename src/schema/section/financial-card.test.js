import { unschema } from '../schema'
import { financialCard } from './financial-card'

describe('Schema for financial card', () => {
  it('can wrap in schema', () => {
    const data = {
      HasCardAbuse: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Agency: {},
              Address: {
                country: null
              },
              Date: {},
              Reason: {},
              Amount: {
                value: ''
              },
              AmountEstimated: {},
              Description: {}
            }
          }
        ]
      }
    }

    expect(unschema(financialCard(data))).toEqual(data)
  })
})
