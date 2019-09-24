import { validateModel } from 'models/validate'
import financialGambling from 'models/sections/financialGambling'

describe('The financial gambling section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasGamblingDebt.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialGambling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasGamblingDebt must be a valid value', () => {
    const testData = {
      HasGamblingDebt: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasGamblingDebt.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialGambling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasGamblingDebt is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasGamblingDebt: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialGambling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasGamblingDebt: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, financialGambling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasGamblingDebt is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasGamblingDebt: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialGambling))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
