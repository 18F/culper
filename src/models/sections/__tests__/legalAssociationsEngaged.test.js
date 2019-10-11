import { validateModel } from 'models/validate'
import legalAssociationsEngaged from 'models/sections/legalAssociationsEngaged'

describe('The legalAssociationsEngaged section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasEngaged.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalAssociationsEngaged))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasEngaged must be a valid value', () => {
    const testData = {
      HasEngaged: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasEngaged.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalAssociationsEngaged))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasEngaged is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasEngaged: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsEngaged))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasEngaged: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalAssociationsEngaged))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasEngaged is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasEngaged: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsEngaged))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
