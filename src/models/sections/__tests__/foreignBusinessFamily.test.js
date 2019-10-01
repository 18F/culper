import { validateModel } from 'models/validate'
import foreignBusinessFamily from 'models/sections/foreignBusinessFamily'

describe('The foreign business family section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignFamily.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignFamily must be a valid value', () => {
    const testData = {
      HasForeignFamily: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignFamily.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignFamily is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignFamily: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessFamily))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignFamily: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessFamily))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignFamily is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignFamily: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessFamily))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
