import { unschema } from '../schema'
import { substanceDrugPurchase } from './substance-drug-purchase'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Involved: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              DrugType: { value: null },
              FirstInvolvement: {},
              RecentInvolvement: {},
              NatureOfInvolvement: {},
              InvolvementWhileEmployed: {},
              InvolvementWithClearance: {},
              InvolvementInFuture: {},
              Reasons: {},
              Explanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(substanceDrugPurchase(data))).toEqual(data)
  })
})
