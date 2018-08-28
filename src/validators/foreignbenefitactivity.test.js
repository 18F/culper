import ForeignBenefitActivityValidator from './foreignbenefitactivity'

describe('Foreign RealEstate Activity validation', function() {
  it('should validate list of indirect interests', function() {
    const tests = [
      {
        props: {
          HasBenefits: { value: 'Nope' }
        },
        expected: false
      },
      {
        props: {
          HasBenefits: { value: 'No' }
        },
        expected: true
      },
      {
        props: {
          HasBenefits: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        props: {
          HasBenefits: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  InterestTypes: { values: ['Yourself'] },
                  BenefitType: { value: 'Educational' },
                  BenefitFrequency: { value: 'OneTime' },
                  OneTimeBenefit: {
                    Received: {
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    Country: {
                      value: 'Germany'
                    },
                    Value: {
                      value: '2000'
                    },
                    Reason: {
                      value: 'Foo'
                    },
                    Obligated: { value: 'Yes' },
                    ObligatedExplanation: {
                      value: 'Because'
                    }
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignBenefitActivityValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })
})
