import { validateModel } from 'models/validate'
import historyResidence from 'models/sections/historyResidence'

describe('The history residence section', () => {
  it('should fail an empty list', () => {
    const testData = {}
    const expectedErrors = ['List.required']

    expect(validateModel(testData, historyResidence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('should fail an invalid list of residences', () => {
    const testData = {
      List: {
        branch: { value: '' },
        items: [
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
        ],
      },
    }
    const expectedErrors = ['List.accordion']
    expect(validateModel(testData, historyResidence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('should pass a valid list of residences', () => {
    const testData = {
      List: {
        branch: { value: 'No' },
        items: [
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
        ],
      },
    }

    expect(validateModel(testData, historyResidence)).toEqual(true)
  })
})
