import { validateModel } from 'models/validate'
import financialNonPayment from 'models/sections/financialNonPayment'

describe('The financialNonPayment section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasNonpayment.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialNonPayment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasNonpayment must be a valid value', () => {
    const testData = {
      HasNonpayment: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasNonpayment.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialNonPayment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasNonpayment is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasNonpayment: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialNonPayment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasNonpayment: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, financialNonPayment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasNonpayment is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasNonpayment: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialNonPayment))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
