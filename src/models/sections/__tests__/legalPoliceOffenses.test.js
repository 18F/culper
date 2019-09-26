import { validateModel } from 'models/validate'
import legalPoliceOffenses from 'models/sections/legalPoliceOffenses'

describe('The legalPoliceOffenses section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasOffenses.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalPoliceOffenses))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasOffenses must be a valid value', () => {
    const testData = {
      HasOffenses: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasOffenses.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalPoliceOffenses))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasOffenses is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasOffenses: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalPoliceOffenses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasOffenses: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalPoliceOffenses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasOffenses is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasOffenses: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalPoliceOffenses))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
