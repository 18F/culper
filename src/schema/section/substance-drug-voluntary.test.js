import { unschema } from '../schema'
import { substanceDrugVoluntary } from './substance-drug-voluntary'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Involved: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
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

    expect(unschema(substanceDrugVoluntary(data))).toEqual(data)
  })
})
