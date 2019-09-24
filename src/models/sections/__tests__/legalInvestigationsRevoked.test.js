import { validateModel } from 'models/validate'
import legalInvestigationsRevoked from 'models/sections/legalInvestigationsRevoked'

describe('The legalInvestigationsRevoked section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasRevocations.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalInvestigationsRevoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasRevocations must be a valid value', () => {
    const testData = {
      HasRevocations: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasRevocations.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalInvestigationsRevoked))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasRevocations is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasRevocations: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalInvestigationsRevoked))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasRevocations: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalInvestigationsRevoked))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasRevocations is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasRevocations: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalInvestigationsRevoked))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
