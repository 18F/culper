import { validateModel } from 'models/validate'
import relationshipsMarital from 'models/sections/relationshipsMarital'

describe('The relationships marital section', () => {
  describe('Status', () => {
    it('requires a status', () => {
      const testData = {}
      const expectedErrors = ['Status.required']

      expect(validateModel(testData, relationshipsMarital))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid status', () => {
      const testData = {
        Status: { value: 'Invalid' },
      }
      const expectedErrors = ['Status.hasValue']

      expect(validateModel(testData, relationshipsMarital))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates with a valid status', () => {
      const testData = {
        Status: { value: 'Married' },
      }
      const unexpectedErrors = ['Status.hasValue']

      expect(validateModel(testData, relationshipsMarital))
        .toEqual(expect.not.arrayContaining(unexpectedErrors))
    })
  })

  describe('CivilUnion', () => {
    it('requires a value if Status is valid married value', () => {
      const testData = {
        Status: { value: 'Married' },
      }
      const expectedErrors = ['CivilUnion.required']

      expect(validateModel(testData, relationshipsMarital))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('is not required if Status is not valid married value', () => {
      const testData = {
        Status: { value: 'NeverMarried' },
      }
      const unexpectedErrors = ['CivilUnion.required']

      expect(validateModel(testData, relationshipsMarital))
        .toEqual(expect.not.arrayContaining(unexpectedErrors))
    })

    it('validates civil union', () => {
      const testData = {
        Status: { value: 'Married' },
        DivorcedList: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Status: { value: 'Widowed' },
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  suffix: 'Jr',
                },
                DateDivorced: {
                  day: '1',
                  month: '1',
                  year: '2016',
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
                Citizenship: {
                  value: ['Germany'],
                },
                Telephone: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: '',
                },
                Recognized: {
                  day: '1',
                  month: '1',
                  year: '2016',
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
        CivilUnion: {
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
          Location: {
            country: { value: 'United States' },
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE,
          },
          BirthPlace: {
            country: { value: 'United States' },
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE,
          },
          EmailNotApplicable: { applicable: false },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          Telephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          SSN: {
            first: '111',
            middle: '11',
            last: '1111',
            applicable: true,
          },
          EnteredCivilUnion: {
            month: '2',
            day: '2',
            year: '2016',
          },
          Divorced: { value: 'Yes' },
          Separated: { value: 'No' },
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    suffix: 'Jr',
                  },
                  MaidenName: { value: 'Yes' },
                  DatesUsed: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                    },
                    present: false,
                  },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
          Citizenship: {
            value: ['Germany', 'United States'],
          },
          ForeignBornDocument: {
            DocumentType: 'FS240',
            DocumentExpirationNotApplicable: { applicable: false },
            DocumentNumber: {
              value: 'A1234',
            },
          },
        },
      }

      expect(validateModel(testData, relationshipsMarital)).toEqual(true)
    })
  })

  describe('DivorcedList', () => {
    it('requires DivorcedList if applicant is divorced', () => {
      const testData = {
        Status: { value: 'Divorced', },
      }
      const expectedErrors = ['DivorcedList.required']

      expect(validateModel(testData, relationshipsMarital))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires DivorcedList if applicant is married, but was divorced', () => {
      const testData = {
        Status: { value: 'Married' },
        CivilUnion: {
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
          Location: {
            country: { value: 'United States' },
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE,
          },
          BirthPlace: {
            country: { value: 'United States' },
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE,
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
          Telephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          SSN: {
            first: '111',
            middle: '11',
            last: '1111',
            applicable: true,
          },
          Divorced: { value: 'Yes' },
          Separated: { value: 'No' },
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    suffix: 'Jr',
                  },
                  MaidenName: { value: 'Yes' },
                  DatesUsed: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                    },
                    present: false,
                  },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
          Citizenship: {
            value: ['Germany', 'United States'],
          },
          ForeignBornDocument: {
            DocumentType: 'FS240',
            DocumentExpirationNotApplicable: { applicable: false },
            DocumentNumber: {
              value: 'A1234',
            },
          },
        },
      }

      const expectedErrors = ['DivorcedList.required']

      expect(validateModel(testData, relationshipsMarital))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a divorced list', () => {
      const testData = {
        Status: { value: 'Widowed' },
        DivorcedList: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Status: { value: 'Widowed' },
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  suffix: 'Jr',
                },
                DateDivorced: {
                  day: '1',
                  month: '1',
                  year: '2016',
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
                Citizenship: {
                  value: ['Germany'],
                },
                Telephone: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: '',
                },
                Recognized: {
                  day: '1',
                  month: '1',
                  year: '2016',
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
      expect(validateModel(testData, relationshipsMarital)).toEqual(true)
    })
  })
})
