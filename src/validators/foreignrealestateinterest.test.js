import ForeignRealEstateInterestValidator from './foreignrealestateinterest'

describe('RealEstate Interest validation', function () {
  it('should validate interest types', function () {
    const tests = [
      {
        props: {
          InterestTypes: []
        },
        expected: false
      },
      {
        props: {
          InterestTypes: ['Yourself']
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignRealEstateInterestValidator(null, test.props).validInterestTypes()).toBe(test.expected)
    })
  })

  it('should validate direct interest', function () {
    const tests = [
      {
        props: {
          InterestTypes: ['Yourself'],
          RealEstateType: {
            value: 'Bar'
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          Sold: {
            day: '1',
            month: '1',
            year: '2016'
          },
          SoldNotApplicable: {
            applicable: true
          },
          CoOwners: {
            List: [{ Has: 'No' }]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignRealEstateInterestValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
