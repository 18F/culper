import { unschema } from '../schema'
import { legalAssociationsEngagedInTerrorism } from './legal-associations-engaged-in-terrorism'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasEngaged: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Reasons: {},
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

    expect(unschema(legalAssociationsEngagedInTerrorism(data))).toEqual(data)
  })
})
