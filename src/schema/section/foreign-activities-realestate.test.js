import { unschema } from '../schema'
import { foreignActivitiesRealestate } from './foreign-activities-realestate'

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
              RealEstateType: {},
              Address: {
                country: null
              },
              Acquired: {},
              HowAcquired: {},
              Cost: {
                value: ''
              },
              CostEstimated: {},
              Sold: {},
              SoldNotApplicable: {},
              Value: {
                value: ''
              },
              ValueEstimated: {},
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

    expect(unschema(foreignActivitiesRealestate(data))).toEqual(data)
  })
})
