import { validateModel } from 'models/validate'
import substanceAlcoholReceivedCounselingModel from 'models/sections/substanceAlcoholReceivedCounseling'

describe('The substance alcohol received counseling section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'ReceivedTreatment.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceAlcoholReceivedCounselingModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ReceivedTreatment must be a valid value', () => {
    const testData = {
      ReceivedTreatment: { value: 'maybe' },
    }

    const expectedErrors = [
      'ReceivedTreatment.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceAlcoholReceivedCounselingModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if ReceivedTreatment is "Yes', () => {
    it('List is required', () => {
      const testData = {
        ReceivedTreatment: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholReceivedCounselingModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        ReceivedTreatment: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceAlcoholReceivedCounselingModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if ReceivedTreatment is "No', () => {
    it('List is not required', () => {
      const testData = {
        ReceivedTreatment: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceAlcoholReceivedCounselingModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
