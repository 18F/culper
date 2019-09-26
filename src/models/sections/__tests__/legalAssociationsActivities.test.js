import { validateModel } from 'models/validate'
import legalAssociationsActivities from 'models/sections/legalAssociationsActivities'

describe('The legalAssociationsActivities section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasActivities.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalAssociationsActivities))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasActivities must be a valid value', () => {
    const testData = {
      HasActivities: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasActivities.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalAssociationsActivities))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasActivities is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasActivities: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsActivities))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasActivities: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalAssociationsActivities))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasActivities is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasActivities: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsActivities))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
