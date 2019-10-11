import { validateModel } from 'models/validate'
import legalAssociationsAdvocating from 'models/sections/legalAssociationsAdvocating'

describe('The legalAssociationsAdvocating section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasAdvocated.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalAssociationsAdvocating))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasAdvocated must be a valid value', () => {
    const testData = {
      HasAdvocated: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasAdvocated.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalAssociationsAdvocating))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasAdvocated is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasAdvocated: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsAdvocating))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasAdvocated: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalAssociationsAdvocating))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasAdvocated is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasAdvocated: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsAdvocating))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
