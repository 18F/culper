import { unschema } from '../schema'
import { substanceAlcoholVoluntary } from './substance-alcohol-voluntary'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      SoughtTreatment: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              CounselingDates: {
                from: {},
                to: {},
                present: null
              },
              TreatmentProviderName: {},
              TreatmentProviderAddress: {
                country: null
              },
              TreatmentProviderTelephone: {},
              CompletedTreatment: {},
              NoCompletedTreatmentExplanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(substanceAlcoholVoluntary(data))).toEqual(data)
  })
})
