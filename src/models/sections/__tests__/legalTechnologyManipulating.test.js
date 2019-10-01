import { validateModel } from 'models/validate'
import legalTechnologyManipulating from 'models/sections/legalTechnologyManipulating'

describe('The legalTechnologyManipulating section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasManipulating.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalTechnologyManipulating))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasManipulating must be a valid value', () => {
    const testData = {
      HasManipulating: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasManipulating.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalTechnologyManipulating))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasManipulating is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasManipulating: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalTechnologyManipulating))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasManipulating: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalTechnologyManipulating))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasManipulating is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasManipulating: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalTechnologyManipulating))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
