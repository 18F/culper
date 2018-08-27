import { unschema } from '../schema'
import { foreignActivitiesDirect } from './foreign-activities-direct'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasInterests: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              InterestTypes: {},
              InterestType: {},
              Acquired: {},
              HowAcquired: {},
              Cost: {
                value: ''
              },
              CostEstimated: {},
              Value: {
                value: ''
              },
              ValueEstimated: {},
              Relinquished: {},
              RelinquishedNotApplicable: {},
              Explanation: {},
              CoOwners: {
                List: {
                  branch: null,
                  items: [
                    {
                      Item: {
                        Has: { value: 'No' },
                        Name: {},
                        Address: {
                          country: null
                        },
                        Countries: {},
                        RelationshipNature: {}
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    }

    expect(unschema(foreignActivitiesDirect(data))).toEqual(data)
  })
})
