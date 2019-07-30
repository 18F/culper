import { validateModel } from 'models/validate'
import financialDelinquentPayments from '../financialDelinquentPayments'

describe('The financial delinquent payments model', () => {
  it('Resolved must be after Date', () => {
    const testData = {
      Date: { month: 1, year: 2015 },
      Resolved: { month: 5, year: 2014 },
    }
    const expectedErrors = ['Resolved.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, financialDelinquentPayments))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('SF86', () => {
    const options = {
      requiredFinancialDelinquentName: true,
      requiredFinancialDelinquentInfraction: true,
    }
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
        'CourtName.presence.REQUIRED',
        'CourtAddress.presence.REQUIRED',
        'Description.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialDelinquentPayments, options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('only accepts valid infraction types', () => {
      const testData = {
        Infractions: {
          values: ['InvalidType'],
        },
      }
      const expectedErrors = [
        'Infractions.array.0.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, financialDelinquentPayments, options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('SF85', () => {
    const options = {
      requiredFinancialDelinquentName: false,
      requiredFinancialDelinquentInfraction: false,
    }
    it('does not require a name nor infraction for the delinquent payment item', () => {
      const testData = {
        ResolvedNotApplicable: {
          applicable: true,
        },
      }
      const unexpectedError = [
        'Name.presence.REQUIRED',
        'Infractions.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialDelinquentPayments, options))
        .toEqual(expect.not.arrayContaining(unexpectedError))
    })
  })
})
