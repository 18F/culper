import { unschema } from '../schema'
import { financialGambling } from './financial-gambling'

describe('Schema for financial gambling', () => {
  it('can wrap in schema', () => {
    const data = {
      HasGamblingDebt: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Losses: {
                value: ''
              },
              Description: {},
              Actions: {},
              Dates: {
                from: {},
                to: {},
                present: null
              }
            }
          }
        ]
      }
    }

    expect(unschema(financialGambling(data))).toEqual(data)
  })
})
