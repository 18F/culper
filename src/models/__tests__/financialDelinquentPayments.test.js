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

  it('Date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Date: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, financialDelinquentPayments, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be in the future', () => {
    const testData = {
      Date: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, financialDelinquentPayments))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('SF86', () => {
    const options = {
      requireFinancialDelinquentName: true,
      requireFinancialDelinquentInfraction: true,
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
      requireFinancialDelinquentName: false,
      requireFinancialDelinquentInfraction: false,
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
