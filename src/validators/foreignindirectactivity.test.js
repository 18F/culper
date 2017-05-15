import ForeignIndirectActivityValidator from './foreignindirectactivity'

describe('Foreign Indirect Activity validation', function () {
  it('should validate list of indirect interests', function () {
    const tests = [
      {
        props: {
          HasInterests: 'Nope'
        },
        expected: false
      },
      {
        props: {
          HasInterests: 'No'
        },
        expected: true
      },
      {
        props: {
          HasInterests: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasInterests: 'Yes',
          List: [
            {
              IndirectInterest: {
                InterestTypes: ['Yourself'],
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
                  List: [{ Has: 'No' }]
                }
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignIndirectActivityValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
