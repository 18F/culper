import { validateModel } from 'models/validate'
import financialBankruptcy from 'models/sections/financialBankruptcy'

describe('The financial bankruptcy section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasBankruptcy.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasBankruptcy must be a valid value', () => {
    const testData = {
      HasBankruptcy: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasBankruptcy.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasBankruptcy is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasBankruptcy: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialBankruptcy))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasBankruptcy: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, financialBankruptcy))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasBankruptcy is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasBankruptcy: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialBankruptcy))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
