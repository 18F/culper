import { validateModel } from 'models/validate'
import relationshipsCohabitants from 'models/sections/relationshipsCohabitants'

describe('The cohabitants section model', () => {
  describe('HasCohabitant', () => {
    it('is required', () => {
      const testData = {}
      const expectedErrors = [
        'HasCohabitant.required',
      ]

      expect(validateModel(testData, relationshipsCohabitants))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('errors on invalid value', () => {
      const testData = {
        HasCohabitant: { value: 'Invalid' },
      }
      const expectedErrors = [
        'HasCohabitant.hasValue',
      ]

      expect(validateModel(testData, relationshipsCohabitants))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates on valid value', () => {
      const testData = {
        HasCohabitant: { value: 'No' },
      }

      expect(validateModel(testData, relationshipsCohabitants)).toEqual(true)
    })
  })

  describe('CohabitantList', () => {
    it('requires a CohabitantList if HasCohabitant', () => {
      const testData = {
        HasCohabitant: { value: 'Yes' },
      }

      const expectedErrors = [
        'CohabitantList.required',
      ]

      expect(validateModel(testData, relationshipsCohabitants))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates the CohabitantList', () => {
      const testData = {
        HasCohabitant: { value: 'Yes' },
        CohabitantList: {
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
                Birthdate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                BirthPlace: {
                  country: { value: 'United States' },
                  city: 'Arlington',
                  county: 'Arlington',
                  state: 'VA',
                  layout: Location.BIRTHPLACE,
                },
                SSN: {
                  first: '111',
                  middle: '11',
                  last: '1111',
                  applicable: true,
                },
                OtherNames: {
                  items: [
                    {
                      Item: {
                        Has: { value: 'No' },
                      },
                    },
                  ],
                },
                CohabitationBegan: {
                  day: 5,
                  month: 2,
                  year: 2018,
                },
                Citizenship: {
                  value: ['Germany', 'United States'],
                },
                ForeignBornDocument: {
                  DocumentType: { value: 'FS240' },
                  DocumentExpirationNotApplicable: { applicable: true },
                  DocumentNumber: {
                    value: 'A1234',
                  },
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, relationshipsCohabitants))
        .toEqual(true)
    })
  })
})
