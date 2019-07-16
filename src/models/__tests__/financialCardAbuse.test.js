import { validateModel } from 'models/validate'
import financialCardAbuse from '../financialCardAbuse'

describe('The financial card abuse model', () => {
  const sf86Options = {
    requireFinancialCardDisciplinaryDate: true,
  }
  it('has required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Agency.required',
      'Address.required',
      'Date.required',
      'Reason.required',
      'Amount.required',
      'Description.required',
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
    const expectedErrors = ['Amount.hasValue']

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
        'Agency.required',
        'Address.required',
        'Reason.required',
        'Amount.required',
        'Description.required',
      ]

      expect(validateModel(testData, financialCardAbuse, sf85pOptions))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
