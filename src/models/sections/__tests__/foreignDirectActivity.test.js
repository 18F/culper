import { validateModel } from 'models/validate'
import foreignDirectActivity from 'models/sections/foreignDirectActivity'

describe('The foreign direct activity section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasInterests.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignDirectActivity))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasInterests must be a valid value', () => {
    const testData = {
      HasInterests: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasInterests.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignDirectActivity))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasInterests is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasInterests: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignDirectActivity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasInterests: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignDirectActivity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasInterests is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasInterests: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignDirectActivity))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
