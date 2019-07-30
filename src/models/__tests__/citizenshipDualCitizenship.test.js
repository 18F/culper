import { validateModel } from 'models/validate'
import citizenshipDualCitizenship from 'models/sections/citizenshipDualCitizenship'

describe('The citizenship dual citizenship section', () => {
  describe('HasMultiple', () => {
    it('is required', () => {
      const testData = {}
      const expectedErrors = ['HasMultiple.required']

      expect(validateModel(testData, citizenshipDualCitizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('errors on invalid value', () => {
      const testData = {
        HasMultiple: { value: 'Invalid' },
      }
      const expectedErrors = ['HasMultiple.hasValue']

      expect(validateModel(testData, citizenshipDualCitizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates on valid value', () => {
      const testData = {
        HasMultiple: { value: 'No' },
      }

      expect(validateModel(testData, citizenshipDualCitizenship)).toEqual(true)
    })
  })

  describe('List', () => {
    it('requires a List if HasMultiple', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
      }
      const expectedErrors = ['List.required']

      expect(validateModel(testData, citizenshipDualCitizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid List', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: {
          items: [],
        },
      }
      const expectedErrors = ['List.accordion']

      expect(validateModel(testData, citizenshipDualCitizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires at least two citizenships in the List', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Country: { value: ['Cambodia'] },
                Dates: {
                  from: {
                    month: '12',
                    day: '12',
                    year: '2000',
                  },
                  to: {
                    month: '12',
                    day: '12',
                    year: '2018',
                  },
                },
                How: { value: 'Foreign born' },
                Renounced: { value: 'No' },
                RenouncedExplanation: { value: 'Never tried' },
                Current: { value: 'Yes' },
                CurrentExplanation: { value: 'Yes, I do' },
              },
            },
          ],
        },
      }
      const expectedErrors = ['List.accordion']

      expect(validateModel(testData, citizenshipDualCitizenship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a valid List', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Country: { value: ['Cambodia'] },
                Dates: {
                  from: {
                    month: '12',
                    day: '12',
                    year: '2000',
                  },
                  to: {
                    month: '12',
                    day: '12',
                    year: '2018',
                  },
                },
                How: { value: 'Foreign born' },
                Renounced: { value: 'No' },
                RenouncedExplanation: { value: 'Never tried' },
                Current: { value: 'Yes' },
                CurrentExplanation: { value: 'Yes, I do' },
              },
            },
            {
              Item: {
                Country: { value: ['Cambodia'] },
                Dates: {
                  from: {
                    month: '12',
                    day: '12',
                    year: '2000',
                  },
                  to: {
                    month: '12',
                    day: '12',
                    year: '2018',
                  },
                },
                How: { value: 'Foreign born' },
                Renounced: { value: 'No' },
                RenouncedExplanation: { value: 'Never tried' },
                Current: { value: 'Yes' },
                CurrentExplanation: { value: 'Yes, I do' },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, citizenshipDualCitizenship))
        .toEqual(true)
    })
  })
})
