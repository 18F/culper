import { validateModel } from 'models/validate'
import substanceDrugVoluntaryTreatmentsModel from 'models/sections/substanceDrugVoluntaryTreatments'

describe('The substance drug uses section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'TreatmentVoluntary.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceDrugVoluntaryTreatmentsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentVoluntary must be a valid value', () => {
    const testData = {
      TreatmentVoluntary: { value: 'maybe' },
    }

    const expectedErrors = [
      'TreatmentVoluntary.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceDrugVoluntaryTreatmentsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if TreatmentVoluntary is "Yes', () => {
    it('List is required', () => {
      const testData = {
        TreatmentVoluntary: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugVoluntaryTreatmentsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        TreatmentVoluntary: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceDrugVoluntaryTreatmentsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if TreatmentVoluntary is "No', () => {
    it('List is not required', () => {
      const testData = {
        TreatmentVoluntary: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugVoluntaryTreatmentsModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
