import { validateModel } from 'models/validate'
import legalTechnologyUnauthorized from 'models/sections/legalTechnologyUnauthorized'

describe('The legalTechnologyUnauthorized section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasUnauthorized.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalTechnologyUnauthorized))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasUnauthorized must be a valid value', () => {
    const testData = {
      HasUnauthorized: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasUnauthorized.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalTechnologyUnauthorized))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasUnauthorized is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasUnauthorized: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalTechnologyUnauthorized))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasUnauthorized: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalTechnologyUnauthorized))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasUnauthorized is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasUnauthorized: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalTechnologyUnauthorized))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
