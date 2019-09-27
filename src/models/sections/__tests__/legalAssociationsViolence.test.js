import { validateModel } from 'models/validate'
import legalAssociationsViolence from 'models/sections/legalAssociationsViolence'

describe('The legalAssociationsViolence section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasViolence.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalAssociationsViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasViolence must be a valid value', () => {
    const testData = {
      HasViolence: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasViolence.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalAssociationsViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasViolence is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasViolence: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsViolence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasViolence: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalAssociationsViolence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasViolence is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasViolence: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsViolence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
