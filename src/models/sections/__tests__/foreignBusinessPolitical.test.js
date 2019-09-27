import { validateModel } from 'models/validate'
import foreignBusinessPolitical from 'models/sections/foreignBusinessPolitical'

describe('The foreign business political section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignPolitical.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignPolitical must be a valid value', () => {
    const testData = {
      HasForeignPolitical: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignPolitical.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignPolitical is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignPolitical: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessPolitical))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignPolitical: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessPolitical))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignPolitical is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignPolitical: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessPolitical))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
