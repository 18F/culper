import { unschema } from '../schema'
import { legalAssociationsAdvocating } from './legal-associations-advocating'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasAdvocated: { value: 'Yes' },
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

    expect(unschema(legalAssociationsAdvocating(data))).toEqual(data)
  })
})
