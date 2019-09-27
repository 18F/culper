import { validateModel } from 'models/validate'
import substanceDrugOrderedTreatmentsModel from 'models/sections/substanceDrugOrderedTreatments'

describe('The substance drug ordered treatments section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'TreatmentOrdered.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceDrugOrderedTreatmentsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentOrdered must be a valid value', () => {
    const testData = {
      TreatmentOrdered: { value: 'maybe' },
    }

    const expectedErrors = [
      'TreatmentOrdered.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceDrugOrderedTreatmentsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if TreatmentOrdered is "Yes', () => {
    it('List is required', () => {
      const testData = {
        TreatmentOrdered: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugOrderedTreatmentsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        TreatmentOrdered: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceDrugOrderedTreatmentsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if TreatmentOrdered is "No', () => {
    it('List is not required', () => {
      const testData = {
        TreatmentOrdered: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugOrderedTreatmentsModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
