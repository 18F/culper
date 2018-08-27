import { unschema } from '../schema'
import { foreignActivitiesIndirect } from './foreign-activities-indirect'

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
              Firstname: {},
              Lastname: {},
              Relationship: {},
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
              Sold: {},
              SoldNotApplicable: {},
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

    expect(unschema(foreignActivitiesIndirect(data))).toEqual(data)
  })
})
