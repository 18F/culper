import { validateModel } from 'models/validate'
import legalPoliceOtherOffenses from 'models/sections/legalPoliceOtherOffenses'

describe('The legalPoliceOtherOffenses section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasOtherOffenses.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalPoliceOtherOffenses))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasOtherOffenses must be a valid value', () => {
    const testData = {
      HasOtherOffenses: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasOtherOffenses.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, legalPoliceOtherOffenses))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasOtherOffenses is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasOtherOffenses: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalPoliceOtherOffenses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasOtherOffenses: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalPoliceOtherOffenses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasOtherOffenses is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasOtherOffenses: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalPoliceOtherOffenses))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
