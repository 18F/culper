import { validateModel } from 'models/validate'
import foreignBusinessConferences from 'models/sections/foreignBusinessConferences'

describe('The foreign business conferences section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignConferences.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignConferences must be a valid value', () => {
    const testData = {
      HasForeignConferences: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignConferences.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignConferences is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignConferences: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessConferences))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignConferences: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessConferences))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignConferences is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignConferences: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessConferences))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
