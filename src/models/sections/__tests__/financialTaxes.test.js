import { validateModel } from 'models/validate'
import financialTaxes from 'models/sections/financialTaxes'

describe('The financialTaxes section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasTaxes.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasTaxes must be a valid value', () => {
    const testData = {
      HasTaxes: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasTaxes.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasTaxes is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasTaxes: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialTaxes))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasTaxes: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, financialTaxes))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasTaxes is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasTaxes: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialTaxes))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
