import DivorceValidator from './divorce'
import Location from '../components/Form/Location'

describe('Divorce validation', function () {
  it('validates status', () => {
    const tests = [
      {
        state: {
          Status: 'Divorced'
        },
        expected: true
      },
      {
        state: {
          Status: 'nope'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new DivorceValidator(test.state, null).validStatus()).toBe(test.expected)
    })
  })

  it('validates deceased', () => {
    const tests = [
      {
        state: {
          Status: 'Widowed'
        },
        expected: true
      },
      {
        state: {
          Status: 'Divorced',
          Deceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Status: 'Divorced',
          Deceased: 'Nope'
        },
        expected: false
      },
      {
        state: {
          Status: 'Divorced',
          Deceased: 'Yes',
          DeceasedAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DivorceValidator(test.state, null).validDeceased()).toBe(test.expected)
    })
  })

  it('validates divorced', () => {
    const tests = [
      {
        state: {
          Status: 'Widowed',
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
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
            county: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE
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
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DivorceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
