import LocationValidator from './location'
import Layouts from '../components/Form/Location/Layouts'

describe('the location component', function () {
  it('should validate locations', function () {
    const tests = [
      {
        data: {
          city: 'A-Town',
          state: 'VA',
          county: 'Arlington',
          country: 'United States',
          layout: Layouts.BIRTHPLACE
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany',
          layout: Layouts.BIRTHPLACE
        },
        expected: true
      },
      {
        data: {
          city: 'A-Town',
          state: 'VA',
          country: 'United States',
          layout: Layouts.BIRTHPLACE_WITHOUT_COUNTY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany States',
          layout: Layouts.BIRTHPLACE_WITHOUT_COUNTY
        },
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          country: 'United States',
          layout: Layouts.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
        },
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          layout: Layouts.STATE_CITY
        },
        expected: true
      },
      {
        data: {
          street: '123 Some rd',
          city: 'Arlington',
          country: 'Germany',
          layout: Layouts.STREET_CITY_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany',
          layout: Layouts.CITY_COUNTRY
        },
        expected: true
      },
      {
        data: {
          city: 'Munich',
          country: 'Germany',
          layout: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).isValid(test.fields)).toBe(test.expected)
    })
  })

  it('should validate fields', function () {
    const tests = [
      {
        data: {
          city: 'Arlington'
        },
        fields: ['city'],
        expected: true
      },
      {
        data: {
          city: 'Arlington',
          state: 'VA',
          county: 'Thecountry',
          country: 'United States'
        },
        fields: ['city', 'state', 'county', 'country'],
        expected: true
      },
      {
        data: {},
        fields: [],
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new LocationValidator(test.data).validFields(test.fields)).toBe(test.expected)
    })
  })
})
