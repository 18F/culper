import { unschema } from '../schema'
import { psychologicalExisting } from './psychological-existing'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasCondition: { value: 'Yes' },
      ReceivedTreatment: {},
      Explanation: {},
      TreatmentList: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Condition: {},
              Diagnosed: {
                from: {},
                to: {},
                present: null
              },
              Treatment: {
                Name: {},
                Phone: {},
                Address: {
                  country: null
                }
              },
              TreatmentFacility: {
                Name: {},
                Phone: {},
                Address: {
                  country: null
                }
              },
              Effective: {},
              Explanation: {}
            }
          }
        ]
      },
      DidNotFollow: {},
      DidNotFollowExplanation: {}
    }

    expect(unschema(psychologicalExisting(data))).toEqual(data)
  })
})
