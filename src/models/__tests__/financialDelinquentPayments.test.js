import { validateModel } from 'models/validate'
import financialDelinquentPayments from '../financialDelinquentPayments'

describe('The financial delinquent payments model', () => {
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
        'Name.required',
        'Infractions.required',
        'AccountNumber.required',
        'PropertyType.required',
        'Amount.required',
        'Reason.required',
        'Status.required',
        'Date.required',
        'Resolved.required',
        'CourtName.required',
        'CourtAddress.required',
        'Description.required',
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
      const expectedErrors = ['Infractions.array']

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
        'Name.required',
        'Infractions.required',
      ]

      expect(validateModel(testData, financialDelinquentPayments, options))
        .toEqual(expect.not.arrayContaining(unexpectedError))
    })
  })
})
