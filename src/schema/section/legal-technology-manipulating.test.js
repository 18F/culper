import { unschema } from '../schema'
import { legalTechnologyManipulating } from './legal-technology-manipulating'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasManipulating: { value: 'Yes' },
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

    expect(unschema(legalTechnologyManipulating(data))).toEqual(data)
  })
})
