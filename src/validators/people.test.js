import { PersonValidator } from './people'

describe('Person validator', function () {
  it('should validate relationship', function () {
    const tests = [
      {
        state: {
          Relationship: ['Friend']
        },
        expected: true
      },
      {
        state: {
          Relationship: null
        },
        expected: false
      },
      {
        state: {
          Relationship: []
        },
        expected: false
      },
      {
        state: {
          Relationship: ['What']
        },
        expected: false
      },
      {
        state: {
          Relationship: ['Other'],
          RelationshipOther: {
            value: 'Other relationship'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PersonValidator(test.state, null).validRelationship()).toBe(test.expected)
    })
  })

  it('should validate person', function () {
    const tests = [
      {
        state: {
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
          Relationship: ['Friend'],
          KnownDates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
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
            timeOfDay: 'Both',
            extension: ''
          },
          OtherTelephone: {
            noNumber: '',
            number: '7031112223',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          },
          Email: {
            value: 'test@local.dev'
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PersonValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
