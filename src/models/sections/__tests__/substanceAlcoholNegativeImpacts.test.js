import { validateModel } from 'models/validate'
import substanceAlcoholNegativeImpactsModel from 'models/sections/substanceAlcoholNegativeImpacts'

describe('The substance alcohol negative impacts section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasImpacts.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceAlcoholNegativeImpactsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasImpacts must be a valid value', () => {
    const testData = {
      HasImpacts: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasImpacts.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceAlcoholNegativeImpactsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasImpacts is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasImpacts: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholNegativeImpactsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasImpacts: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceAlcoholNegativeImpactsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasImpacts is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasImpacts: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholNegativeImpactsModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
