import ForeignDirectInterestValidator from './foreigndirectinterest'

describe('Direct Interest validation', function () {
  it('should validate interest types', function () {
    const tests = [
      {
        props: {
          InterestTypes: { values: [] }
        },
        expected: false
      },
      {
        props: {
          InterestTypes: { values: ['Yourself'] }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignDirectInterestValidator(test.props).validInterestTypes()).toBe(test.expected)
    })
  })

  it('should validate direct interest', function () {
    const tests = [
      {
        props: {
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
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignDirectInterestValidator(test.props).isValid()).toBe(test.expected)
    })
  })
})
