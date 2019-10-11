import { validateModel } from 'models/validate'
import legalInvestigationsHistory from 'models/sections/legalInvestigationsHistory'

describe('The legalInvestigationsHistory section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasHistory.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalInvestigationsHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasHistory must be a valid value', () => {
    const testData = {
      HasHistory: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasHistory.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalInvestigationsHistory))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasHistory is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasHistory: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalInvestigationsHistory))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasHistory: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalInvestigationsHistory))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasHistory is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasHistory: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalInvestigationsHistory))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
