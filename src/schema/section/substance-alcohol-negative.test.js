import { unschema } from '../schema'
import { substanceAlcoholNegative } from './substance-alcohol-negative'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasImpacts: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Occurred: {},
              Circumstances: {},
              NegativeImpact: {},
              Used: {
                from: {},
                to: {},
                present: null
              }
            }
          }
        ]
      }
    }

    expect(unschema(substanceAlcoholNegative(data))).toEqual(data)
  })
})
