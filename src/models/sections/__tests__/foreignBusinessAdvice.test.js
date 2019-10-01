import { validateModel } from 'models/validate'
import foreignBusinessAdvice from 'models/sections/foreignBusinessAdvice'

describe('The foreign business advice section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignAdvice.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignAdvice must be a valid value', () => {
    const testData = {
      HasForeignAdvice: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignAdvice.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignAdvice is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignAdvice: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessAdvice))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignAdvice: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessAdvice))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignAdvice is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignAdvice: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessAdvice))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
