import { unschema } from '../schema'
import { substanceAlcoholOrdered } from './substance-alcohol-ordered'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasBeenOrdered: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Seekers: {},
              OtherSeeker: {},
              ActionTaken: {},
              NoActionTakenExplanation: {},
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

    expect(unschema(substanceAlcoholOrdered(data))).toEqual(data)
  })
})
