import { validateModel } from 'models/validate'
import substanceDrugPrescriptionUsesModel from 'models/sections/substanceDrugPrescriptionUses'

describe('The substance drug prescription uses section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'MisusedDrugs.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceDrugPrescriptionUsesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('MisusedDrugs must be a valid value', () => {
    const testData = {
      MisusedDrugs: { value: 'maybe' },
    }

    const expectedErrors = [
      'MisusedDrugs.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceDrugPrescriptionUsesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if MisusedDrugs is "Yes', () => {
    it('List is required', () => {
      const testData = {
        MisusedDrugs: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugPrescriptionUsesModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        MisusedDrugs: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceDrugPrescriptionUsesModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes options into the List validator', () => {
      const testData = {
        MisusedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                PrescriptionName: { value: 'test drug' },
                InvolvementDates: {
                  from: { day: 2, month: 5, year: 2000 },
                  to: { day: 6, month: 10, year: 2000 },
                },
                Reason: { value: 'testing' },
                UseWithClearance: { value: 'No' },
              },
            },
          ],
        },
      }

      const options = {
        requireUseWhileEmployed: false,
      }

      expect(validateModel(testData, substanceDrugPrescriptionUsesModel, options)).toEqual(true)
    })
  })

  describe('if MisusedDrugs is "No', () => {
    it('List is not required', () => {
      const testData = {
        MisusedDrugs: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugPrescriptionUsesModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
