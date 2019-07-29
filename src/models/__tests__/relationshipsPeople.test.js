import { validateModel } from 'models/validate'
import relationshipsPeople from 'models/sections/relationshipsPeople'

describe('The people who know you well section', () => {
  it('should validate people', () => {
    const testData = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                suffix: 'Jr',
              },
              Relationship: {
                values: ['Friend'],
              },
              Dates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2009',
                },
                present: true,
              },
              Rank: {
                value: 'Some rank',
              },
              MobileTelephone: {
                noNumber: '',
                number: '7031112222',
                numberType: 'Home',
                type: 'Domestic',
                timeOfDay: 'Both',
                extension: '',
              },
              OtherTelephone: {
                noNumber: '',
                number: '7031112223',
                numberType: 'Home',
                type: 'Domestic',
                timeOfDay: 'Both',
                extension: '',
              },
              Email: {
                value: 'test@local.dev',
              },
              Address: {
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
              Name: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                suffix: 'Jr',
              },
              Relationship: {
                values: ['Friend'],
              },
              Dates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010',
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2012',
                },
                present: false,
              },
              Rank: {
                value: 'Some rank',
              },
              MobileTelephone: {
                noNumber: '',
                number: '7031112222',
                numberType: 'Home',
                type: 'Domestic',
                timeOfDay: 'Both',
                extension: '',
              },
              OtherTelephone: {
                noNumber: '',
                number: '7031112223',
                numberType: 'Home',
                type: 'Domestic',
                timeOfDay: 'Both',
                extension: '',
              },
              Email: {
                value: 'test@local.dev',
              },
              Address: {
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
              Name: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                suffix: 'Jr',
              },
              Relationship: {
                values: ['Friend'],
              },
              Dates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010',
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2012',
                },
                present: false,
              },
              Rank: {
                value: 'Some rank',
              },
              MobileTelephone: {
                noNumber: '',
                number: '7031112222',
                numberType: 'Home',
                type: 'Domestic',
                timeOfDay: 'Both',
                extension: '',
              },
              OtherTelephone: {
                noNumber: '',
                number: '7031112223',
                numberType: 'Home',
                type: 'Domestic',
                timeOfDay: 'Both',
                extension: '',
              },
              Email: {
                value: 'test@local.dev',
              },
              Address: {
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

    expect(validateModel(testData, relationshipsPeople))
      .toEqual(true)
  })
})
