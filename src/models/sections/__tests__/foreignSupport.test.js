import { validateModel } from 'models/validate'
import foreignSupport from 'models/sections/foreignSupport'

describe('The foreign support section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignSupport.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignSupport must be a valid value', () => {
    const testData = {
      HasForeignSupport: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignSupport.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignSupport is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignSupport: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignSupport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignSupport: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignSupport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignSupport is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignSupport: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignSupport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
