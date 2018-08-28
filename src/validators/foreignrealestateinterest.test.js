import ForeignRealEstateInterestValidator from './foreignrealestateinterest'
import Location from '../components/Form/Location'

describe('RealEstate Interest validation', function() {
  it('should validate interest types', function() {
    const tests = [
      {
        props: {
          InterestTypes: {
            values: []
          }
        },
        expected: false
      },
      {
        props: {
          InterestTypes: {
            values: ['Yourself']
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(
        new ForeignRealEstateInterestValidator(test.props).validInterestTypes()
      ).toBe(test.expected)
    })
  })

  it('should validate realestate interest', function() {
    const tests = [
      {
        props: {
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
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignRealEstateInterestValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })
})
