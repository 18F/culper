import { validateModel } from 'models/validate'
import identificationOtherNames from 'models/sections/identificationOtherNames'

describe('The identification other names section', () => {
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'HasOtherNames.required',
      'List.required',
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
      const expectedErrors = ['HasOtherNames.hasValue']

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid value', () => {
      const testData = {
        HasOtherNames: { value: 'Invalid' },
        List: {},
      }
      const expectedErrors = ['HasOtherNames.hasValue']

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a valid value', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {},
      }

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.not.arrayContaining(['HasOtherNames.hasValue']))
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
      const expectedErrors = ['List.accordion']

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
      const expectedErrors = ['List.accordion']

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
