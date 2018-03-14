import { unschema } from '../schema'
import { legalPoliceDomesticViolence } from './legal-police-domesticviolence'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasDomesticViolence: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            Explanation: {},
            Issued: {},
            CourtName: {},
            CourtAddress: {
              country: null
            }
          }
        }]
      }
    }

    expect(unschema(legalPoliceDomesticViolence(data))).toEqual(data)
  })
})
