import { unschema } from '../schema'
import { substanceAlcoholAdditional } from './substance-alcohol-additional'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      ReceivedTreatment: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              TreatmentProviderName: {},
              TreatmentProviderAddress: {
                country: null
              },
              AgencyName: {},
              AgencyAddress: {
                country: null
              },
              UseSameAddress: {},
              TreatmentBeganDate: {},
              TreatmentEndDate: {},
              PresentTreatmentEndDate: {},
              CompletedTreatment: {},
              NoCompletedTreatmentExplanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(substanceAlcoholAdditional(data))).toEqual(data)
  })
})
