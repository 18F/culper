import { validateModel } from 'models/validate'
import relationshipsRelatives from 'models/sections/relationshipsRelatives'

describe('The relationships relatives section', () => {
  it('validates relationships realtives', () => {
    const testData = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Relation: {
                value: 'Mother',
              },
              Name: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                suffix: 'Jr',
              },
              Birthdate: {
                day: '1',
                month: '1',
                year: '2010',
              },
              Birthplace: {
                city: 'Arlington',
                state: 'VA',
                country: { value: ['United States'] },
                layout: Location.BIRTHPLACE_WITHOUT_COUNTY,
              },
              Citizenship: {
                value: ['United States'],
              },
              MaidenName: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                suffix: 'Jr',
              },
              Aliases: {
                items: [
                  {
                    Item: {
                      Has: {
                        value: 'Yes',
                      },
                      Name: {
                        first: 'Foo',
                        firstInitialOnly: false,
                        middle: 'J',
                        middleInitialOnly: true,
                        noMiddleName: false,
                        last: 'Bar',
                        suffix: 'Jr',
                      },
                      MaidenName: { value: 'No' },
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
                      Reason: {
                        value: 'The reason',
                      },
                    },
                  },
                  { Item: { Has: { value: 'No' } } },
                ],
              },
              IsDeceased: { value: 'No' },
              Address: {
                country: { value: 'United States' },
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'VA',
                zipcode: '22202',
                layout: Location.ADDRESS,
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
            },
          },
          {
            Item: {
              Relation: {
                value: 'Father',
              },
              Name: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                suffix: 'Jr',
              },
              Birthdate: {
                day: '1',
                month: '1',
                year: '2010',
              },
              Birthplace: {
                city: 'Arlington',
                state: 'VA',
                country: { value: ['United States'] },
                layout: Location.BIRTHPLACE_WITHOUT_COUNTY,
              },
              Citizenship: {
                value: ['United States'],
              },
              MaidenName: {
                first: 'Foo',
                firstInitialOnly: false,
                middle: 'J',
                middleInitialOnly: true,
                noMiddleName: false,
                last: 'Bar',
                suffix: 'Jr',
              },
              Aliases: {
                items: [
                  {
                    Item: {
                      Has: {
                        value: 'Yes',
                      },
                      Name: {
                        first: 'Foo',
                        firstInitialOnly: false,
                        middle: 'J',
                        middleInitialOnly: true,
                        noMiddleName: false,
                        last: 'Bar',
                        suffix: 'Jr',
                      },
                      MaidenName: { value: 'No' },
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
                      Reason: {
                        value: 'The reason',
                      },
                    },
                  },
                  { Item: { Has: { value: 'No' } } },
                ],
              },
              IsDeceased: { value: 'No' },
              Address: {
                country: { value: 'United States' },
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'VA',
                zipcode: '22202',
                layout: Location.ADDRESS,
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
            },
          },
        ],
      },
    }

    expect(validateModel(testData, relationshipsRelatives))
      .toEqual(true)
  })
})
