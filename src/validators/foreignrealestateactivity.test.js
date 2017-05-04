import ForeignRealEstateActivityValidator from './foreignrealestateactivity'

describe('Foreign RealEstate Activity validation', function () {
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
          List: []
        },
        expected: false
      },
      {
        props: {
          HasInterests: 'Yes',
          List: [
            {
              RealEstateInterest: {
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
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignRealEstateActivityValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
