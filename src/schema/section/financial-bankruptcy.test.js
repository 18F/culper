import { unschema } from '../schema'
import { financialBankruptcy } from './financial-bankruptcy'

describe('Schema for financial bankruptcy', () => {
  it('can wrap in schema', () => {
    const data = {
      HasBankruptcy: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              PetitionType: {},
              CourtAddress: {
                country: null
              },
              CourtInvolved: {},
              CourtNumber: {},
              NameDebt: {},
              TotalAmount: {
                value: ''
              },
              DateFiled: {},
              DateDischarged: {},
              DateDischargedNotApplicable: {},
              HasDischargeExplanation: {},
              DischargeExplanation: {},
              Trustee: {},
              TrusteeAddress: {
                country: null
              }
            }
          }
        ]
      }
    }

    expect(unschema(financialBankruptcy(data))).toEqual(data)
  })
})
