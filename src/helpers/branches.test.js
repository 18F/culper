import {
  requiredByForms,
  requireHistoryFederalSection,
  requireMultipleCitizenshipRenounced,
  requireCitizenshipForeignPassportsSection,
  requireForeignMilitaryMaintainsContact,
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
})
