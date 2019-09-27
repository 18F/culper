import { validateModel } from 'models/validate'
import foreignBusinessEmployment from 'models/sections/foreignBusinessEmployment'

describe('The foreign business employment section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignEmployment.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignEmployment must be a valid value', () => {
    const testData = {
      HasForeignEmployment: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignEmployment.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignEmployment is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignEmployment: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessEmployment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignEmployment: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessEmployment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignEmployment is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignEmployment: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessEmployment))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
