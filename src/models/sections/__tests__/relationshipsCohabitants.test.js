import { validateModel } from 'models/validate'
import relationshipsCohabitantsModel from 'models/sections/relationshipsCohabitants'

describe('The relationships cohabitants section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasCohabitant.presence.REQUIRED',
    ]

    expect(validateModel(testData, relationshipsCohabitantsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasCohabitant must be a valid value', () => {
    const testData = {
      HasCohabitant: { value: 'test' },
    }

    const expectedErrors = [
      'HasCohabitant.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, relationshipsCohabitantsModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if "HasCohabitant" is "Yes', () => {
    it('CohabitantList is required', () => {
      const testData = {
        HasCohabitant: { value: 'Yes' },
      }

      const expectedErrors = [
        'CohabitantList.presence.REQUIRED',
      ]

      expect(validateModel(testData, relationshipsCohabitantsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CohabitantList must be a valid accordion', () => {
      const testData = {
        HasCohabitant: { value: 'Yes' },
        CohabitantList: [{ Name: 'test' }],
      }

      const expectedErrors = [
        'CohabitantList.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, relationshipsCohabitantsModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if "HasCohabitant" is "No"', () => {
    it('CohabitantList is not required', () => {
      const testData = {
        HasCohabitant: { value: 'No' },
      }

      const expectedErrors = [
        'CohabitantList.presence.REQUIRED',
      ]

      expect(validateModel(testData, relationshipsCohabitantsModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
