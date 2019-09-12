import { validateModel } from 'models/validate'
import identificationOtherNames from 'models/sections/identificationOtherNames'

describe('The identification other names section', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'HasOtherNames.presence.REQUIRED',
      'HasOtherNames.hasValue.MISSING_VALUE',
      'List.presence.REQUIRED',
    ]

    expect(validateModel(testData, identificationOtherNames))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('HasOtherNames', () => {
    it('requires branch to be answered', () => {
      const testData = {
        HasOtherNames: { value: '' },
        List: {},
      }
      const expectedErrors = ['HasOtherNames.hasValue.MISSING_VALUE']

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid value', () => {
      const testData = {
        HasOtherNames: { value: 'Invalid' },
        List: {},
      }
      const expectedErrors = ['HasOtherNames.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a valid value', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {},
      }

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.not.arrayContaining(['HasOtherNames.hasValue.value.inclusion.INCLUSION']))
    })
  })

  describe('OtherNames List', () => {
    it('does not validate an empty list', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [],
        },
      }
      const expectedErrors = ['List.accordion.MISSING_ITEMS']

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('does not validate an incomplete name', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Name: {
                  first: '',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  suffix: 'Jr',
                },
                MaidenName: {
                  value: 'Foo',
                },
                DatesUsed: {
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
                  value: 'Testing',
                },
              },
            },
          ],
        },
      }
      const expectedErrors = [
        'List.accordion.0.Name.model.first.presence.REQUIRED',
        'List.accordion.0.Name.model.first.length.LENGTH_TOO_SHORT',
        'List.accordion.0.MaidenName.hasValue.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DatesUsed from date cannot be before applicant birthdate', () => {
      const applicantBirthdate = { month: 1, day: 2, year: 1980 }
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DatesUsed: {
                  from: { month: 1, year: 1970, day: 2 },
                },
              },
            },
          ],
        },
      }

      const expectedErrors = [
        'List.accordion.0.DatesUsed.daterange.from.date.date.datetime.DATE_TOO_EARLY',
      ]

      expect(validateModel(testData, identificationOtherNames, { applicantBirthdate }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DatesUsed to date cannot be in the future', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DatesUsed: {
                  to: { month: 1, year: 2050, day: 2 },
                },
              },
            },
          ],
        },
      }

      const expectedErrors = [
        'List.accordion.0.DatesUsed.daterange.to.date.date.datetime.DATE_TOO_LATE',
      ]

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a complete name', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
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
                MaidenName: {
                  value: 'No',
                },
                DatesUsed: {
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
                },
                Reason: {
                  value: 'Testing',
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, identificationOtherNames)).toEqual(true)
    })
  })
})
