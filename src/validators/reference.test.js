import ReferenceValidator from './reference'
import Location from '../components/Form/Location'

describe('Reference component validation', function () {
  it('should validate reference', function () {
    const tests = [
      {
        state: {
          FullName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          LastContact: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Relationship: ['Friend'],
          Phone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          },
          Email: {
            value: 'user@local.dev'
          },
          EmailNotApplicable: {
            applicable: true
          },
          Address: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
          FullName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          LastContact: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Relationship: ['Other'],
          RelationshipOther: {
            value: 'Acquaintance'
          },
          Phone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          },
          Email: {
            value: 'user@local.dev'
          },
          EmailNotApplicable: {
            applicable: true
          },
          Address: {
            country: 'United States',
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
      expect(new ReferenceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

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
          Relationship: ['SomethingElse'],
          RelationshipOther: {
            value: 'Test'
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ReferenceValidator(test.state, null).validRelationship()).toBe(test.expected)
    })
  })
})
