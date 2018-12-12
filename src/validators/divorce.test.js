import DivorceValidator from './divorce'
import Location from '../components/Form/Location'

describe('Divorce validation', function() {
  it('validates status', () => {
    const tests = [
      {
        state: {
          Status: { value: 'Divorced' }
        },
        expected: true
      },
      {
        state: {
          Status: { value: 'nope' }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new DivorceValidator(test.state, null).validStatus()).toBe(
        test.expected
      )
    })
  })

  it('validates deceased', () => {
    const tests = [
      {
        state: {
          Status: { value: 'Widowed' }
        },
        expected: true
      },
      {
        state: {
          Status: { value: 'Divorced' },
          Deceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          Status: { value: 'Divorced' },
          Deceased: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          Status: { value: 'Divorced' },
          Deceased: { value: 'No' },
          DeceasedAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DivorceValidator(test.state, null).validDeceased()).toBe(
        test.expected
      )
    })
  })

  it('validates divorce location', () => {
    const tests = [
      {
        state: {
          Status: { value: 'Widowed' },
          DivorceLocation: {}
        },
        expected: true
      },
      {
        state: {
          Status: { value: 'Divorced' },
          DivorceLocation: {}
        },
        expected: false
      },
      {
        state: {
          Status: { value: 'Divorced' },
          DivorceLocation: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(
        new DivorceValidator(test.state, null).validDivorceLocation()
      ).toBe(test.expected)
    })
  })

  it('validates divorced', () => {
    const tests = [
      {
        state: {
          Status: { value: 'Widowed' },
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr'
          },
          DateDivorced: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Birthdate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          BirthPlace: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          Citizenship: {
            value: ['Germany']
          },
          Telephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            type: 'Domestic',
            extension: ''
          },
          Recognized: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DivorceValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
