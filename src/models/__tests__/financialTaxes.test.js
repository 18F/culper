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
      'Failure.presence.REQUIRED',
      'Year.presence.REQUIRED',
      'Reason.presence.REQUIRED',
      'Agency.presence.REQUIRED',
      'TaxType.presence.REQUIRED',
      'Amount.presence.REQUIRED',
      'Date.presence.REQUIRED',
      'Description.presence.REQUIRED',
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
    const expectedErrors = [
      'Failure.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be after Year', () => {
    const testData = {
      Year: { year: 2015 },
      Date: { month: 5, year: 2014 },
    }
    const expectedErrors = ['Date.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date doesnt error if not applicable is selected', () => {
    const testData = {
      DateNotApplicable: {
        applicable: false,
      },
    }
    const unexpectedError = ['Date.presence.REQUIRED']
    expect(validateModel(testData, financialTaxes))
      .toEqual(expect.not.arrayContaining(unexpectedError))
  })
})
