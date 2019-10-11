import { validateModel } from 'models/validate'
import citizenshipMultiple from 'models/sections/citizenshipMultiple'

describe('The citizenship multiple section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasMultiple.presence.REQUIRED',
    ]

    expect(validateModel(testData, citizenshipMultiple))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasMultiple must be a valid value', () => {
    const testData = {
      HasMultiple: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasMultiple.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, citizenshipMultiple))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasMultiple is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipMultiple))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, citizenshipMultiple))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must have at least 2 items', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: {
          items: [
            {
              Item: {
                Country: { value: 'United States' },
                Dates: {
                  from: { year: 2000, day: 2, month: 4 },
                  present: true,
                },
              },
            },
          ],
        },
      }

      const expectedErrors = [
        'List.accordion.items.length.LENGTH_TOO_SHORT',
      ]

      expect(validateModel(testData, citizenshipMultiple))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasMultiple is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasMultiple: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipMultiple))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
