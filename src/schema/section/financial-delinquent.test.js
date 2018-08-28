import { unschema } from '../schema'
import { financialDelinquent } from './financial-delinquent'

describe('Schema for financial delinquent', () => {
  it('can wrap in schema', () => {
    const data = {
      HasDelinquent: { value: 'Yes' },
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
              CourtName: {},
              CourtAddress: {
                country: null
              },
              Description: {}
            }
          }
        ]
      }
    }

    expect(unschema(financialDelinquent(data))).toEqual(data)
  })
})
