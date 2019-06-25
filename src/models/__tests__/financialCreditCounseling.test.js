import { validateModel } from 'models/validate'
import financialCreditCounseling from 'models/financialCreditCounseling'

describe('The financial credit counseling model', () => {
  it('errors for required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Explanation.required',
      'Name.required',
      'Telephone.required',
      'Location.required',
      'Description.required',
    ]

    expect(validateModel(testData, financialCreditCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
