import { validateModel } from 'models/validate'
import legalAssociationsOverthrow from 'models/sections/legalAssociationsOverthrow'

describe('The legalAssociationsOverthrow section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasOverthrow.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalAssociationsOverthrow))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasOverthrow must be a valid value', () => {
    const testData = {
      HasOverthrow: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasOverthrow.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalAssociationsOverthrow))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasOverthrow is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasOverthrow: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsOverthrow))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasOverthrow: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalAssociationsOverthrow))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasOverthrow is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasOverthrow: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalAssociationsOverthrow))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
