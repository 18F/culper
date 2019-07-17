import { validateModel } from 'models/validate'
import financialCreditCounseling from 'models/financialCreditCounseling'

describe('The financial credit counseling model', () => {
  it('errors for required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Explanation.presence.REQUIRED',
      'Name.presence.REQUIRED',
      'Telephone.presence.REQUIRED',
      'Location.presence.REQUIRED',
      'Description.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialCreditCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('needs to have a phone number', () => {
    const testData = {
      Telephone: {
        number: '1234567890',
      },
    }

    const expectedErrors = ['Telephone.model']

    expect(validateModel(testData, financialCreditCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
