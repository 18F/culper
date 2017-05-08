import ForeignBenefitActivityValidator from './foreignbenefitactivity'

describe('Foreign RealEstate Activity validation', function () {
  it('should validate list of indirect interests', function () {
    const tests = [
      {
        props: {
          HasBenefits: 'Nope'
        },
        expected: false
      },
      {
        props: {
          HasBenefits: 'No'
        },
        expected: true
      },
      {
        props: {
          HasBenefits: 'Yes',
          List: []
        },
        expected: false
      },
      {
        props: {
          HasBenefits: 'Yes',
          List: [
            {
              Benefit: {
                InterestTypes: ['Yourself'],
                BenefitType: 'Educational',
                BenefitFrequency: 'OneTime',
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
                  Obligated: 'Yes',
                  ObligatedExplanation: {
                    value: 'Because'
                  }
                }
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignBenefitActivityValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
