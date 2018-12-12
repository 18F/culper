import PersonValidator from './person'
import Location from '../components/Form/Location'

describe('Person validator', function() {
  it('should validate relationship', function() {
    const tests = [
      {
        data: {
          Relationship: {}
        },
        expected: false
      },
      {
        data: {
          Relationship: {
            values: ['Friend']
          }
        },
        expected: true
      },
      {
        data: {
          Relationship: {
            values: []
          }
        },
        expected: false
      },
      {
        data: {
          Relationship: {
            values: ['What']
          }
        },
        expected: false
      },
      {
        data: {
          Relationship: {
            values: ['Other']
          },
          RelationshipOther: {
            value: 'Other relationship'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PersonValidator(test.data).validRelationship()).toBe(
        test.expected
      )
    })
  })

  it('should validate person', function() {
    const tests = [
      {
        data: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr'
          },
          Relationship: {
            values: ['Friend']
          },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2005'
            },
            to: {
              month: '1',
              day: '1',
              year: '2017'
            },
            present: false
          },
          Rank: {
            value: 'Some rank'
          },
          MobileTelephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: ''
          },
          OtherTelephone: {
            noNumber: '',
            number: '7031112223',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: ''
          },
          Email: {
            value: 'test@local.dev'
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
      expect(new PersonValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
