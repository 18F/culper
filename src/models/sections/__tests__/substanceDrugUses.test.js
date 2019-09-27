import { validateModel } from 'models/validate'
import substanceDrugUsesModel from 'models/sections/substanceDrugUses'

describe('The substance drug uses section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'UsedDrugs.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceDrugUsesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('UsedDrugs must be a valid value', () => {
    const testData = {
      UsedDrugs: { value: 'maybe' },
    }

    const expectedErrors = [
      'UsedDrugs.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceDrugUsesModel))
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

      expect(validateModel(testData, substanceDrugUsesModel))
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

      expect(validateModel(testData, substanceDrugUsesModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes options into the List validator', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: { value: 'Steroids' },
                FirstUse: { month: 2, year: 1999 },
                RecentUse: { month: 5, year: 2001 },
                NatureOfUse: { value: 'Testing' },
                UseWithClearance: { value: 'No' },
                UseWhileEmployed: { value: 'Yes' },
              },
            },
          ],
        },
      }

      const options = {
        requireUseInFuture: false,
      }

      expect(validateModel(testData, substanceDrugUsesModel, options)).toEqual(true)
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

      expect(validateModel(testData, substanceDrugUsesModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
