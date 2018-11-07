import { unschema } from '../schema'
import { foreignActivitiesBenefits } from './foreign-activities-benefits'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasBenefits: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              InterestTypes: {},
              BenefitType: {},
              OtherBenefitType: {},
              BenefitFrequency: {},
              OneTimeBenefit: {
                Began: {},
                End: {},
                Frequency: {},
                OtherFrequency: {},
                Received: {},
                Country: {},
                Value: {
                  value: ''
                },
                ValueEstimated: {},
                Reason: {},
                Obligated: {},
                ObligatedExplanation: {}
              },
              FutureBenefit: {
                Began: {},
                End: {},
                Frequency: {},
                OtherFrequency: {},
                Received: {},
                Country: {},
                Value: {
                  value: ''
                },
                ValueEstimated: {},
                Reason: {},
                Obligated: {},
                ObligatedExplanation: {}
              },
              ContinuingBenefit: {
                Began: {},
                End: {},
                Frequency: {},
                OtherFrequency: {},
                Received: {},
                Country: {},
                Value: {
                  value: ''
                },
                ValueEstimated: {},
                Reason: {},
                Obligated: {},
                ObligatedExplanation: {}
              },
              OtherBenefit: {
                Began: {},
                End: {},
                Frequency: {},
                OtherFrequency: {},
                Received: {},
                Country: {},
                Value: {
                  value: ''
                },
                ValueEstimated: {},
                Reason: {},
                Obligated: {},
                ObligatedExplanation: {}
              }
            }
          }
        ]
      }
    }

    expect(unschema(foreignActivitiesBenefits(data))).toEqual(data)
  })
})
