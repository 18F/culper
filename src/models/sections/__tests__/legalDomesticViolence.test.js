import { validateModel } from 'models/validate'
import legalDomesticViolence from 'models/sections/legalDomesticViolence'

describe('The legal domestic violence section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasDomesticViolence.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalDomesticViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDomesticViolence must be a valid value', () => {
    const testData = {
      HasDomesticViolence: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasDomesticViolence.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalDomesticViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasDomesticViolence is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasDomesticViolence: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalDomesticViolence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasDomesticViolence: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalDomesticViolence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasDomesticViolence is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasDomesticViolence: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalDomesticViolence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
