import { validateModel } from 'models/validate'
import substanceDrugInvolvementsModel from 'models/sections/substanceDrugInvolvements'

describe('The substance drug involvements section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'Involved.presence.REQUIRED',
    ]

    expect(validateModel(testData, substanceDrugInvolvementsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Involved must be a valid value', () => {
    const testData = {
      Involved: { value: 'maybe' },
    }

    const expectedErrors = [
      'Involved.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, substanceDrugInvolvementsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Involved is "Yes', () => {
    it('List is required', () => {
      const testData = {
        Involved: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugInvolvementsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        Involved: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, substanceDrugInvolvementsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes options into the List validator', () => {
      const testData = {
        Involved: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: { value: 'Test drug' },
                FirstInvolvement: { month: 2, year: 1999 },
                RecentInvolvement: { month: 5, year: 2001 },
                NatureOfInvolvement: { value: 'Testing' },
                InvolvementWithClearance: { value: 'No' },
                InvolvementInFuture: { value: 'No' },
                Reasons: { value: 'testing' },
              },
            },
          ],
        },
      }

      const options = {
        requireInvolvementWhileEmployed: false,
      }

      expect(validateModel(testData, substanceDrugInvolvementsModel, options)).toEqual(true)
    })
  })

  describe('if Involved is "No', () => {
    it('List is not required', () => {
      const testData = {
        Involved: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, substanceDrugInvolvementsModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
