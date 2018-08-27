import { unschema } from '../schema'
import { legalAssociationsActivitiesToOverthrow } from './legal-associations-activities-to-overthrow'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasActivities: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Reasons: {},
              Dates: {
                from: {},
                to: {},
                present: null
              }
            }
          }
        ]
      }
    }

    expect(unschema(legalAssociationsActivitiesToOverthrow(data))).toEqual(data)
  })
})
