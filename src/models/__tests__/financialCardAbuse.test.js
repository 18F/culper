import { validateModel } from 'models/validate'
import financialCardAbuse from '../financialCardAbuse'

describe('The financial card abuse model', () => {
  const sf86Options = {
    requireFinancialCardDisciplinaryDate: true,
  }
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Agency.presence.REQUIRED',
      'Address.presence.REQUIRED',
      'Date.presence.REQUIRED',
      'Reason.presence.REQUIRED',
      'Amount.presence.REQUIRED',
      'Description.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialCardAbuse, sf86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires an amount greater than 0', () => {
    const testData = {
      Amount: {
        value: '0',
      },
    }
    const expectedErrors = ['Amount.hasValue.value.numericality.NUMBER_NOT_GREATER_THAN']

    expect(validateModel(testData, financialCardAbuse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('SF85P', () => {
    it('has required fields', () => {
      const sf85pOptions = {
        requireFinancialCardDisciplinaryDate: false,
      }
      const testData = {}
      const expectedErrors = [
        'Agency.presence.REQUIRED',
        'Address.presence.REQUIRED',
        'Reason.presence.REQUIRED',
        'Amount.presence.REQUIRED',
        'Description.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialCardAbuse, sf85pOptions))
        .toEqual(expect.arrayContaining(expectedErrors))

      expect(validateModel(testData, financialCardAbuse, sf85pOptions))
        .toEqual(expect.not.arrayContaining(['Date.required']))
    })
  })
})
