import { unschema } from '../schema'
import { substanceDrugPublicSafety } from './substance-drug-publicsafety'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      UsedDrugs: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Description: {},
              InvolvementDates: {
                from: {},
                to: {},
                present: null
              },
              EstimatedUse: {}
            }
          }
        ]
      }
    }

    expect(unschema(substanceDrugPublicSafety(data))).toEqual(data)
  })
})
