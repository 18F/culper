import { unschema } from '../schema'
import { financialNonpayment } from './financial-nonpayment'

describe('Schema for financial nonpayment', () => {
  it('can wrap in schema', () => {
    const data = {
      HasNonpayment: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              Infractions: {},
              AccountNumber: {},
              PropertyType: {},
              Amount: {
                value: ''
              },
              AmountEstimated: {},
              Reason: {},
              Status: {},
              Date: {},
              Resolved: {},
              ResolvedNotApplicable: {},
              Description: {}
            }
          }
        ]
      }
    }

    expect(unschema(financialNonpayment(data))).toEqual(data)
  })
})
