import { unschema } from '../schema'
import { legalTechnologyUnlawful } from './legal-technology-unlawful'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasUnlawful: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Date: {},
              Incident: {},
              Location: {
                country: null
              },
              Action: {}
            }
          }
        ]
      }
    }

    expect(unschema(legalTechnologyUnlawful(data))).toEqual(data)
  })
})
