import HistoryResidenceValidator, { ResidenceValidator } from './residence'
import Location from '../components/Form/Location'

describe('The HistoryResidenceValidator', () => {
  it('should fail an invalid list of residences', () => {
    const list = [
      {
        Item: {
          Dates: {
            from: {
              day: '1',
              month: '1',
              year: '2010',
            },
            to: {
              day: '1',
              month: '1',
              year: '2012',
            },
            present: false,
          },
          Role: {
            value: 'MilitaryHousing',
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          ReferenceName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          ReferenceLastContact: {
            day: '1',
            month: '1',
            year: '2016',
          },
          ReferenceRelationshipComments: {
            value: '',
          },
          ReferenceRelationship: {
            values: ['Friend'],
          },
          ReferencePhoneEvening: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferencePhoneDay: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferencePhoneMobile: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferenceEmailNotApplicable: {
            applicable: true,
          },
          ReferenceEmail: {
            value: 'user@local.dev',
          },
          ReferenceAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
      },
      {
        Item: {
          Role: {
            value: 'Other',
          },
          RoleOther: {
            value: 'Hello world',
          },
        },
      },
      {
        Item: {
          Role: {
            value: 'Other',
          },
          RoleOther: {
            value: '',
          },
        },
      },
      {
        Item: {
          Role: {},
        },
      },
      {
        Item: {
          Role: {
            value: 'foo',
          },
        },
      },
    ]

    expect(new HistoryResidenceValidator({ List: { items: list, branch: { value: 'No' } } }).isValid()).toBe(false)
  })

  it('should pass a valid list of residences', () => {
    const list = [
      {
        Item: {
          Dates: {
            from: {
              day: '1',
              month: '1',
              year: '2009',
            },
            to: {
              day: '1',
              month: '1',
              year: '2019',
            },
            present: false,
          },
          Role: {
            value: 'MilitaryHousing',
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          ReferenceName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          ReferenceLastContact: {
            day: '1',
            month: '1',
            year: '2016',
          },
          ReferenceRelationshipComments: {
            value: '',
          },
          ReferenceRelationship: {
            values: ['Friend'],
          },
          ReferencePhoneEvening: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferencePhoneDay: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferencePhoneMobile: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferenceEmailNotApplicable: {
            applicable: true,
          },
          ReferenceEmail: {
            value: 'user@local.dev',
          },
          ReferenceAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
      },
    ]

    expect(new HistoryResidenceValidator({ List: { items: list, branch: { value: 'No' } } }).isValid()).toBe(true)
  })
})

describe('Residence component validation', () => {
  it('should validate residence', () => {
    const tests = [
      {
        state: {
          Dates: {
            from: {
              day: '1',
              month: '1',
              year: '2010',
            },
            to: {
              day: '1',
              month: '1',
              year: '2012',
            },
            present: false,
          },
          Role: {
            value: 'MilitaryHousing',
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          ReferenceName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          ReferenceLastContact: {
            day: '1',
            month: '1',
            year: '2016',
          },
          ReferenceRelationshipComments: {
            value: '',
          },
          ReferenceRelationship: {
            values: ['Friend'],
          },
          ReferencePhoneEvening: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferencePhoneDay: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferencePhoneMobile: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferenceEmailNotApplicable: {
            applicable: true,
          },
          ReferenceEmail: {
            value: 'user@local.dev',
          },
          ReferenceAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
        expected: true,
      },
      {
        state: {
          Role: {
            value: 'Other',
          },
          RoleOther: {
            value: 'Hello world',
          },
        },
        expected: false,
      },
      {
        state: {
          Role: {
            value: 'Other',
          },
          RoleOther: {
            value: '',
          },
        },
        expected: false,
      },
      {
        state: {
          Role: {},
        },
        expected: false,
      },
      {
        state: {
          Role: {
            value: 'foo',
          },
        },
        expected: false,
      },
    ]
    tests.forEach((test) => {
      expect(new ResidenceValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
