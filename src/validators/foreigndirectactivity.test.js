import ForeignDirectActivityValidator from './foreigndirectactivity'

describe('Foreign Direct Activity validation', function () {
  it('should validate list of direct interests', function () {
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
              DirectInterest: {
                InterestTypes: ['Yourself'],
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
      expect(new ForeignDirectActivityValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
