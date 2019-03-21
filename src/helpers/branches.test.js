import {
  requiredByForms,
  requireHistoryFederalSection,
  requireMultipleCitizenshipRenounced,
  requireCitizenshipForeignPassportsSection,
  requireForeignMilitaryMaintainsContact,
  requireForeignContactsSection,
  requireForeignActivitiesSection,
  requireForeignBusinessSection,
  requireForeignTravelSection,
  requireFinancialBankruptcySection,
  requireFinancialGamblingSection,
  requireFinancialTaxesSection,
  requireFinancialCardSection,
  requireFinancialCreditSection,
  requireFinancialDelinquentSection,
  requireFinancialNonpaymentSection,
} from './branches'

describe('Branches helper function', () => {
  describe('requiredByForms', () => {
    const testForms = ['SF86', 'SF85P']

    it('returns true if the forms array includes the formType param', () => {
      const testParam = 'SF86'
      expect(requiredByForms(testParam, testForms)).toBe(true)
    })

    it('returns false if the forms array does not include the formType param', () => {
      const testParam = 'SF85'
      expect(requiredByForms(testParam, testForms)).toBe(false)
    })
  })

  describe('requireHistoryFederalSection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireHistoryFederalSection('SF86')).toBe(true)
      expect(requireHistoryFederalSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireHistoryFederalSection('SF85')).toBe(false)
    })
  })

  describe('requireMultipleCitizenshipRenounced', () => {
    it('is required by the SF86', () => {
      expect(requireMultipleCitizenshipRenounced('SF86')).toBe(true)
    })

    it('is not required by the SF85 or SF85P', () => {
      expect(requireMultipleCitizenshipRenounced('SF85')).toBe(false)
      expect(requireMultipleCitizenshipRenounced('SF85P')).toBe(false)
    })
  })

  describe('requireCitizenshipForeignPassportsSection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireCitizenshipForeignPassportsSection('SF86')).toBe(true)
      expect(requireHistoryFederalSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireCitizenshipForeignPassportsSection('SF85')).toBe(false)
    })
  })

  describe('requireForeignMilitaryMaintainsContact', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireForeignMilitaryMaintainsContact('SF86')).toBe(true)
      expect(requireHistoryFederalSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireForeignMilitaryMaintainsContact('SF85')).toBe(false)
    })
  })

  describe('requireForeignContactsSection', () => {
    it('is required by the SF86', () => {
      expect(requireForeignContactsSection('SF86')).toBe(true)
    })

    it('is not required by the SF85 or SF85P', () => {
      expect(requireForeignContactsSection('SF85')).toBe(false)
      expect(requireForeignContactsSection('SF85P')).toBe(false)
    })
  })

  describe('requireForeignActivitiesSection', () => {
    it('is required by the SF86', () => {
      expect(requireForeignActivitiesSection('SF86')).toBe(true)
    })

    it('is not required by the SF85 or SF85P', () => {
      expect(requireForeignActivitiesSection('SF85')).toBe(false)
      expect(requireForeignActivitiesSection('SF85P')).toBe(false)
    })
  })

  describe('requireForeignBusinessSection', () => {
    it('is required by the SF86', () => {
      expect(requireForeignBusinessSection('SF86')).toBe(true)
    })

    it('is not required by the SF85 or SF85P', () => {
      expect(requireForeignBusinessSection('SF85')).toBe(false)
      expect(requireForeignBusinessSection('SF85P')).toBe(false)
    })
  })

  describe('requireForeignTravelSection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireForeignTravelSection('SF86')).toBe(true)
      expect(requireForeignTravelSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireForeignTravelSection('SF85')).toBe(false)
    })
  })

  describe('requireFinancialBankruptcySection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireFinancialBankruptcySection('SF86')).toBe(true)
      expect(requireFinancialBankruptcySection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireFinancialBankruptcySection('SF85')).toBe(false)
    })
  })

  describe('requireFinancialGamblingSection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireFinancialGamblingSection('SF86')).toBe(true)
      expect(requireFinancialGamblingSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireFinancialGamblingSection('SF85')).toBe(false)
    })
  })

  describe('requireFinancialTaxesSection', () => {
    it('is required by the SF86, SF85, and SF85P', () => {
      expect(requireFinancialTaxesSection('SF86')).toBe(true)
      expect(requireFinancialTaxesSection('SF85P')).toBe(true)
      expect(requireFinancialTaxesSection('SF85')).toBe(true)
    })
  })

  describe('requireFinancialCardSection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireFinancialCardSection('SF86')).toBe(true)
      expect(requireFinancialCardSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireFinancialCardSection('SF85')).toBe(false)
    })
  })

  describe('requireFinancialCreditSection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireFinancialCreditSection('SF86')).toBe(true)
      expect(requireFinancialCreditSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireFinancialCreditSection('SF85')).toBe(false)
    })
  })

  describe('requireFinancialDelinquentSection', () => {
    it('is required by the SF86, SF85, and SF85P', () => {
      expect(requireFinancialDelinquentSection('SF86')).toBe(true)
      expect(requireFinancialDelinquentSection('SF85P')).toBe(true)
      expect(requireFinancialDelinquentSection('SF85')).toBe(true)
    })
  })

  describe('requireFinancialNonpaymentSection', () => {
    it('is required by the SF86 and SF85P', () => {
      expect(requireFinancialNonpaymentSection('SF86')).toBe(true)
      expect(requireFinancialNonpaymentSection('SF85P')).toBe(true)
    })

    it('is not required by the SF85', () => {
      expect(requireFinancialNonpaymentSection('SF85')).toBe(false)
    })
  })
})
