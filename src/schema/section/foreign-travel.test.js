import { unschema } from '../schema'
import { foreignTravel } from './foreign-travel'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignTravelOutside: { value: 'Yes' },
      HasForeignTravelOfficial: { value: 'No' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Country: {},
              Days: {},
              Purpose: {},
              Questioned: {},
              QuestionedExplanation: {},
              Encounter: {},
              EncounterExplanation: {},
              Contacted: {},
              ContactedExplanation: {},
              Counter: {},
              CounterExplanation: {},
              Interest: {},
              InterestExplanation: {},
              Sensitive: {},
              SensitiveExplanation: {},
              Threatened: {},
              ThreatenedExplanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignTravel(data))).toEqual(data)
  })
})
