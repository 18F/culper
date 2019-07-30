import { validateModel } from 'models/validate'
import financialCardAbuse from '../financialCardAbuse'

describe('The financial card abuse model', () => {
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

    expect(validateModel(testData, financialCardAbuse))
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
})
