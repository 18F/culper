import { validateModel } from 'models/validate'
import financialDelinquent from 'models/sections/financialDelinquent'

describe('The financial delinquent section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasDelinquent.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialDelinquent))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDelinquent must be a valid value', () => {
    const testData = {
      HasDelinquent: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasDelinquent.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialDelinquent))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasDelinquent is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasDelinquent: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialDelinquent))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasDelinquent: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, financialDelinquent))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasDelinquent is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasDelinquent: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialDelinquent))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
