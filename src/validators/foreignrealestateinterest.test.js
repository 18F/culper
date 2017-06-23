import ForeignRealEstateInterestValidator from './foreignrealestateinterest'
import Location from '../components/Form/Location'

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
            street: '123 Some rd',
            city: 'Arlington',
            country: 'United States',
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
