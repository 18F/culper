import { validateModel } from 'models/validate'
import legalNonCriminalCourtActions from 'models/sections/legalNonCriminalCourtActions'

describe('The legalNonCriminalCourtActions section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasCourtActions.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalNonCriminalCourtActions))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasCourtActions must be a valid value', () => {
    const testData = {
      HasCourtActions: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasCourtActions.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalNonCriminalCourtActions))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasCourtActions is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasCourtActions: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalNonCriminalCourtActions))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasCourtActions: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalNonCriminalCourtActions))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasCourtActions is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasCourtActions: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalNonCriminalCourtActions))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
