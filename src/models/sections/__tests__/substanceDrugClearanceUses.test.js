import { validateModel } from 'models/validate'
import substanceDrugClearanceUsesModel from 'models/sections/substanceDrugClearanceUses'

describe('The substance drug clearance uses section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'UsedDrugs.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceDrugClearanceUsesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('SoughtTreatment must be a valid value', () => {
    const testData = {
      UsedDrugs: { value: 'maybe' },
    }

    const expectedErrors = [
      'UsedDrugs.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceDrugClearanceUsesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if UsedDrugs is "Yes', () => {
    it('List is required', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugClearanceUsesModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceDrugClearanceUsesModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if UsedDrugs is "No', () => {
    it('List is not required', () => {
      const testData = {
        UsedDrugs: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugClearanceUsesModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
