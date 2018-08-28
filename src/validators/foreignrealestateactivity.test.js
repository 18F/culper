import ForeignRealEstateActivityValidator from './foreignrealestateactivity'
import Location from '../components/Form/Location'

describe('Foreign RealEstate Activity validation', function() {
  it('should validate list of indirect interests', function() {
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
            branch: { value: 'No' },
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
                  InterestTypes: {
                    values: ['Yourself']
                  },
                  RealEstateType: {
                    value: 'Bar'
                  },
                  Address: {
                    street: '123 Some rd',
                    city: 'Arlington',
                    country: { value: 'United States' },
                    layout: Location.STREET_CITY_COUNTRY
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
      expect(new ForeignRealEstateActivityValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })
})
