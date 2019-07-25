import { validateModel } from 'models/validate'
import financialBankruptcy from '../financialBankruptcy'

describe('The financial bankruptcy model', () => {
  it('has required fields', () => {
    const testData = {
      DateDischargedNotApplicable: {
        applicable: true,
      },
    }
    const expectedErrors = [
      'PetitionType.presence.REQUIRED',
      'CourtAddress.presence.REQUIRED',
      'CourtInvolved.presence.REQUIRED',
      'CourtNumber.presence.REQUIRED',
      'TotalAmount.presence.REQUIRED',
      'DateFiled.presence.REQUIRED',
      'NameDebt.presence.REQUIRED',
      'DateDischarged.presence.REQUIRED',
      'HasDischargeExplanation.presence.REQUIRED',
      'DischargeExplanation.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a valid PetitionType', () => {
    const testData = {
      DateDischargedNotApplicable: {
        applicable: true,
      },
      PetitionType: {
        value: 'InvalidType',
      },
    }

    const expectedErrors = ['PetitionType.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a DateDischarged if applicable', () => {
    const testData = {
      DateDischargedNotApplicable: {
        applicable: true,
      },
    }

    const expectedErrors = ['DateDischarged.presence.REQUIRED']

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DateDischarged must be after DateFiled', () => {
    const testData = {
      DateFiled: { month: 2, year: 2001 },
      DateDischarged: { month: 1, year: 2001 },
    }

    const expectedErrors = ['DateDischarged.date']

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if PetitionType is Chapter13', () => {
    it('requires a Trustee', () => {
      const testData = {
        PetitionType: {
          value: 'Chapter13',
        },
      }

      const expectedErrors = ['Trustee.presence.REQUIRED']

      expect(validateModel(testData, financialBankruptcy))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a TrusteeAddress', () => {
      const testData = {
        PetitionType: {
          value: 'Chapter13',
        },
      }

      const expectedErrors = ['TrusteeAddress.presence.REQUIRED']

      expect(validateModel(testData, financialBankruptcy))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
