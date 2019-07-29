import { validateModel } from 'models/validate'
import financialNonpayment from 'models/financialNonpayment'

describe('The financial nonpayment model', () => {
  it('errors when required fields arent filled', () => {
    const testData = {
      ResolvedNotApplicable: {
        applicable: true,
      },
    }
    const expectedErrors = [
      'Name.presence.REQUIRED',
      'Infractions.presence.REQUIRED',
      'AccountNumber.presence.REQUIRED',
      'PropertyType.presence.REQUIRED',
      'Amount.presence.REQUIRED',
      'Reason.presence.REQUIRED',
      'Status.presence.REQUIRED',
      'Date.presence.REQUIRED',
      'Resolved.presence.REQUIRED',
      'Description.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialNonpayment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Infractions only accepts valid values', () => {
    const testData = {
      Infractions: {
        value: 'Invalid',
      },
    }
    const expectedErrors = [
      'Infractions.array.MISSING_ITEMS',
    ]

    expect(validateModel(testData, financialNonpayment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Amount needs to be greater than 0', () => {
    const testData = {
      Amount: {
        value: 0,
      },
    }
    const expectedErrors = ['Amount.hasValue.MISSING_VALUE']

    expect(validateModel(testData, financialNonpayment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Resolved must be after Date', () => {
    const testData = {
      Date: { month: 1, year: 2015 },
      Resolved: { month: 5, year: 2014 },
    }
    const expectedErrors = ['Resolved.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, financialNonpayment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('does not need Resolved date if its not applicable', () => {
    const testData = {
      ResolvedNotApplicable: {
        applicable: false,
      },
    }
    const unexpectedErrors = ['Resolved.presence.REQUIRED']

    expect(validateModel(testData, financialNonpayment))
      .toEqual(expect.not.arrayContaining(unexpectedErrors))
  })
})
