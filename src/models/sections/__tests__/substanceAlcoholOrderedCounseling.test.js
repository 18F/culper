import { validateModel } from 'models/validate'
import substanceAlcoholOrderedCounselingModel from 'models/sections/substanceAlcoholOrderedCounseling'

describe('The substance alcohol ordered counseling section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasBeenOrdered.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceAlcoholOrderedCounselingModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasBeenOrdered must be a valid value', () => {
    const testData = {
      HasBeenOrdered: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasBeenOrdered.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceAlcoholOrderedCounselingModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasBeenOrdered is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasBeenOrdered: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholOrderedCounselingModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasBeenOrdered: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceAlcoholOrderedCounselingModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasBeenOrdered is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasBeenOrdered: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholOrderedCounselingModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
