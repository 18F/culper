import { unschema } from '../schema'
import { foreignActivitiesSupport } from './foreign-activities-support'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignSupport: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              Address: {
                country: null
              },
              Relationship: {},
              Amount: {
                value: ''
              },
              AmountEstimated: {},
              Frequency: {},
              Citizenship: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignActivitiesSupport(data))).toEqual(data)
  })
})
