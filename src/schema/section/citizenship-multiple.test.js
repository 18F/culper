import { unschema } from '../schema'
import { citizenshipMultiple } from './citizenship-multiple'

describe('Schema for citizenship multiple', () => {
  it('can wrap in schema', () => {
    const data = {
      HasMultiple: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Country: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              How: {},
              Renounced: {},
              RenouncedExplanation: {},
              Current: {},
              CurrentExplanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(citizenshipMultiple(data))).toEqual(data)
  })
})
