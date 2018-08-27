import { unschema } from '../schema'
import { legalTechnologyUnauthorized } from './legal-technology-unauthorized'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasUnauthorized: { value: 'Yes' },
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

    expect(unschema(legalTechnologyUnauthorized(data))).toEqual(data)
  })
})
