import { validateModel } from 'models/validate'
import foreignBusinessVentures from 'models/sections/foreignBusinessVentures'

describe('The foreign business ventures section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignVentures.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignVentures must be a valid value', () => {
    const testData = {
      HasForeignVentures: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignVentures.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignVentures is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignVentures: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessVentures))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignVentures: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessVentures))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignVentures is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignVentures: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessVentures))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
