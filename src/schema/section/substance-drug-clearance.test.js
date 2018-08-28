import { unschema } from '../schema'
import { substanceDrugClearance } from './substance-drug-clearance'

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

    expect(unschema(substanceDrugClearance(data))).toEqual(data)
  })
})
