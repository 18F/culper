import { validateModel } from 'models/validate'
import historyResidence from 'models/sections/historyResidence'

import { today } from 'helpers/date'

describe('The history residence section', () => {
  it('should fail an empty list', () => {
    const testData = {}
    const expectedErrors = ['List.presence.REQUIRED']

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
    const expectedErrors = ['List.accordion.INVALID_BRANCH']
    expect(validateModel(testData, historyResidence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('residence list must cover the required duration', () => {
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

    const expectedErrors = ['List.durationCoverage.INCOMPLETE_DURATION']
    expect(validateModel(testData, historyResidence, { requireYears: 3 }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a minimum of 2 years if applicant is not old enough to meet the required years', () => {
    const testData = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Dates: {
                from: today.minus({ years: 2 }).toObject(),
                to: {},
                present: true,
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

    const applicantBirthdate = today.minus({
      years: 19,
    }).toObject()

    expect(validateModel(testData, historyResidence, { requireYears: 10, applicantBirthdate }))
      .toEqual(true)
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
                  year: '2005',
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2016',
                },
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
              Dates: {
                from: {
                  month: '1',
                  day: '28',
                  year: '2016',
                },
                present: true,
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

    expect(validateModel(testData, historyResidence, { requireYears: 10 })).toEqual(true)
  })
})
