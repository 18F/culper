import { unschema } from '../schema'
import { legalPoliceDomesticViolence } from './legal-police-domesticviolence'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      List: {
        branch: null,
        items: [{
          Item: {
            Has: {},
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
