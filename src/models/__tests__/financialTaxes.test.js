import { validateModel } from 'models/validate'
import financialTaxes from 'models/financialTaxes'

describe('The financial taxes model', () => {
  it('errors on required fields', () => {
    const testData = {
      DateNotApplicable: {
        applicable: true,
      },
    }
    const expectedErrors = [
      'Failure.required',
      'Year.required',
      'Reason.required',
      'Agency.required',
      'TaxType.required',
      'Amount.required',
      'Date.required',
      'Description.required',
    ]

    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Failure must have an accepted value', () => {
    const testData = {
      Failure: {
        value: 'Invalid',
      },
    }
    const expectedErrors = ['Failure.hasValue']

    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be after Year', () => {
    const testData = {
      Year: { year: 2015 },
      Date: { month: 5, year: 2014 },
    }
    const expectedErrors = ['Date.date']

    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date doesnt error if not applicable is selected', () => {
    const testData = {
      DateNotApplicable: {
        applicable: false,
      },
    }
    const unexpectedError = ['Date.required']
    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.not.arrayContaining(unexpectedError))
  })
})
