import { validateModel } from 'models/validate'
import foreignBusinessContact from 'models/sections/foreignBusinessContact'

describe('The foreign business contact section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignContact.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignContact must be a valid value', () => {
    const testData = {
      HasForeignContact: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignContact.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignContact is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignContact: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignContact: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignContact is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignContact: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
