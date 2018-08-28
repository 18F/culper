import { unschema } from '../schema'
import { financialTaxes } from './financial-taxes'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasTaxes: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Failure: {},
              Year: {
                value: ''
              },
              YearEstimated: {},
              Reason: {},
              Agency: {},
              TaxType: {},
              Amount: {
                value: ''
              },
              AmountEstimated: {},
              Date: {},
              DateNotApplicable: {},
              Description: {}
            }
          }
        ]
      }
    }

    expect(unschema(financialTaxes(data))).toEqual(data)
  })
})
