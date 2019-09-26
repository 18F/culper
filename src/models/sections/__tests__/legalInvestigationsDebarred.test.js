import { validateModel } from 'models/validate'
import legalInvestigationsDebarred from 'models/sections/legalInvestigationsDebarred'

describe('The legalInvestigationsDebarred section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasDebarment.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalInvestigationsDebarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDebarment must be a valid value', () => {
    const testData = {
      HasDebarment: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasDebarment.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalInvestigationsDebarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasDebarment is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasDebarment: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalInvestigationsDebarred))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasDebarment: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalInvestigationsDebarred))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasDebarment is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasDebarment: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalInvestigationsDebarred))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
