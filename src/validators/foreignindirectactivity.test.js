import ForeignIndirectActivityValidator from './foreignindirectactivity'

describe('Foreign Indirect Activity validation', function() {
  it('should validate list of indirect interests', function() {
    const tests = [
      // {
      //   props: {
      //     HasInterests: { value: 'Nope' }
      //   },
      //   expected: false
      // },
      // {
      //   props: {
      //     HasInterests: { value: 'No' }
      //   },
      //   expected: true
      // },
      // {
      //   props: {
      //     HasInterests: { value: 'Yes' },
      //     List: {
      //       branch: { value: '' },
      //       items: []
      //     }
      //   },
      //   expected: false
      // },
      {
        props: {
          HasInterests: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  InterestTypes: { values: ['Yourself'] },
                  InterestType: {
                    value: 'Some type'
                  },
                  Acquired: {
                    day: '1',
                    month: '1',
                    year: '2016'
                  },
                  Firstname: {
                    value: 'John'
                  },
                  Lastname: {
                    value: 'Doe'
                  },
                  Relationship: {
                    value: 'A person'
                  },
                  HowAcquired: {
                    value: 'foo'
                  },
                  Cost: {
                    value: '100'
                  },
                  Value: {
                    value: '100'
                  },
                  Sold: {
                    day: '1',
                    month: '1',
                    year: '2016'
                  },
                  SoldNotApplicable: {
                    applicable: true
                  },
                  Explanation: {
                    value: 'Bar'
                  },
                  CoOwners: {
                    List: {
                      items: [{ Item: { Has: { value: 'No' } } }]
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
      expect(new ForeignIndirectActivityValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })
})
