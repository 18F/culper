import ForeignDirectActivityValidator from './foreigndirectactivity'

describe('Foreign Direct Activity validation', function () {
  it('should validate list of direct interests', function () {
    const tests = [
      {
        props: {
          HasInterests: { value: 'Nope' }
        },
        expected: false
      },
      {
        props: {
          HasInterests: { value: 'No' }
        },
        expected: true
      },
      {
        props: {
          HasInterests: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
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
                  HowAcquired: {
                    value: 'foo'
                  },
                  Cost: {
                    value: '100'
                  },
                  Value: {
                    value: '100'
                  },
                  Relinquished: {
                    day: '1',
                    month: '1',
                    year: '2016'
                  },
                  ReqlinquishedNotApplicable: {
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
      expect(new ForeignDirectActivityValidator(test.props).isValid()).toBe(test.expected)
    })
  })
})
