import { validateModel } from 'models/validate'
import financialCredit from 'models/sections/financialCredit'

describe('The financial credit counseling section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasCreditCounseling.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialCredit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasCreditCounseling must be a valid value', () => {
    const testData = {
      HasCreditCounseling: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasCreditCounseling.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialCredit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasCreditCounseling is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasCreditCounseling: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialCredit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasCreditCounseling: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, financialCredit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasCreditCounseling is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasCreditCounseling: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialCredit))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
