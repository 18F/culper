import { validateModel } from 'models/validate'
import foreignBenefitActivity from 'models/sections/foreignBenefitActivity'

describe('The foreign benefit activity section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasBenefits.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBenefitActivity))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasBenefits must be a valid value', () => {
    const testData = {
      HasBenefits: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasBenefits.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBenefitActivity))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasBenefits is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasBenefits: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBenefitActivity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasBenefits: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBenefitActivity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasBenefits is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasBenefits: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBenefitActivity))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
