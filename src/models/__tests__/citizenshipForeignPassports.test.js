import { validateModel } from 'models/validate'
import citizenshipForeignPassports from 'models/sections/citizenshipForeignPassports'

describe('The citizenship foreign passports section', () => {
  it('requires valid passport', () => {
    const testData = {
      Passports: {
        items: [
          {
            Item: {},
          },
        ],
      },
    }
    const expectedErrors = ['Passports.branchCollection']
    expect(validateModel(testData, citizenshipForeignPassports))
      .toEqual(expectedErrors)
  })

  it('validates when there are no foreign passports', () => {
    const testData = {
      Passports: {
        items: [
          {
            Item: {
              Has: { value: 'No' },
            },
          },
        ],
      },
    }
    expect(validateModel(testData, citizenshipForeignPassports))
      .toEqual(true)
  })

  it('validates list of valid foreign passports', () => {
    const testData = {
      Passports: {
        items: [
          {
            Item: {
              Has: { value: 'No' },
              Country: {
                value: 'United States',
              },
              Issued: {
                day: '1',
                month: '1',
                year: '2016',
              },
              Location: {
                country: { value: 'United States' },
                city: 'Arlington',
                layout: Location.CITY_COUNTRY,
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
              Number: {
                value: 'number',
              },
              Expiration: {
                day: '1',
                month: '1',
                year: '2016',
              },
              Used: { value: 'Yes' },
              Countries: {
                branch: {},
                items: [
                  {
                    Item: {
                      Country: {
                        value: 'United States',
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
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }

    expect(validateModel(testData, citizenshipForeignPassports))
      .toEqual(true)
  })
})
