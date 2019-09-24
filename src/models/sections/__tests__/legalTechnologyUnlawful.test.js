import { validateModel } from 'models/validate'
import legalTechnologyUnlawful from 'models/sections/legalTechnologyUnlawful'

describe('The legalTechnologyUnlawful section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasUnlawful.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalTechnologyUnlawful))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasUnlawful must be a valid value', () => {
    const testData = {
      HasUnlawful: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasUnlawful.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalTechnologyUnlawful))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasUnlawful is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasUnlawful: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalTechnologyUnlawful))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasUnlawful: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalTechnologyUnlawful))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasUnlawful is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasUnlawful: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalTechnologyUnlawful))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
