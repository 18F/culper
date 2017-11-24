import { unschema } from '../schema'
import { substanceDrugUsage } from './substance-drug-usage'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      UsedDrugs: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            DrugType: {},
            FirstUse: {},
            RecentUse: {},
            NatureOfUse: {},
            UseWhileEmployed: {},
            UseWithClearance: {},
            UseInFuture: {},
            Explanation: {}
          }
        }]
      }
    }

    expect(unschema(substanceDrugUsage(data))).toEqual(data)
  })
})
