import { validateModel } from 'models/validate'
import foreignContacts from 'models/sections/foreignContacts'

describe('The foreign contacts section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignContacts.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignContacts))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignContacts must be a valid value', () => {
    const testData = {
      HasForeignContacts: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignContacts.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignContacts))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignContacts is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignContacts: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignContacts))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignContacts: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignContacts))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignContacts is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignContacts: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignContacts))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
