import { unschema } from '../schema'
import { substanceDrugOrdered } from './substance-drug-ordered'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Involved: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            OrderedBy: {},
            Explanation: {},
            ActionTaken: {},
            NoActionTakenExplanation: {},
            DrugType: { value: null },
            TreatmentProvider: {},
            TreatmentProviderAddress: {
              country: null
            },
            TreatmentProviderTelephone: {},
            TreatmentDates: {
              from: {},
              to: {},
              present: null
            },
            TreatmentCompleted: {},
            NoTreatmentExplanation: {}
          }
        }]
      }
    }

    expect(unschema(substanceDrugOrdered(data))).toEqual(data)
  })
})
