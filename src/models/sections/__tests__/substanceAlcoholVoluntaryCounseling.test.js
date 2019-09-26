import { validateModel } from 'models/validate'
import substanceAlcoholVoluntaryCounselingModel from 'models/sections/substanceAlcoholVoluntaryCounseling'

describe('The substance alcohol voluntary counseling section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'SoughtTreatment.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceAlcoholVoluntaryCounselingModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('SoughtTreatment must be a valid value', () => {
    const testData = {
      SoughtTreatment: { value: 'maybe' },
    }

    const expectedErrors = [
      'SoughtTreatment.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceAlcoholVoluntaryCounselingModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if SoughtTreatment is "Yes', () => {
    it('List is required', () => {
      const testData = {
        SoughtTreatment: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholVoluntaryCounselingModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        SoughtTreatment: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceAlcoholVoluntaryCounselingModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if SoughtTreatment is "No', () => {
    it('List is not required', () => {
      const testData = {
        SoughtTreatment: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholVoluntaryCounselingModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
