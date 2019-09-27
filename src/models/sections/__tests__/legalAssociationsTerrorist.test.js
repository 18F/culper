import { validateModel } from 'models/validate'
import legalAssociationsTerrorist from 'models/sections/legalAssociationsTerrorist'

describe('The legalAssociationsTerrorist section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasTerrorist.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalAssociationsTerrorist))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasTerrorist must be a valid value', () => {
    const testData = {
      HasTerrorist: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasTerrorist.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalAssociationsTerrorist))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasTerrorist is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasTerrorist: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsTerrorist))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasTerrorist: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalAssociationsTerrorist))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasTerrorist is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasTerrorist: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsTerrorist))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
