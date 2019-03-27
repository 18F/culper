import {
  sectionIsValid,
  sectionIsInvalid,
} from './validation'

const validSections = [
  {
    title: 'Identification',
    url: 'identification',
    subsections: [
      {
        url: 'identification/name',
        name: 'Full name',
        isValid: true,
      },
    ],
  },
  {
    title: 'Foreign activities',
    url: 'foreign',
    subsections: [
      {
        url: 'foreign/passport',
        name: 'U.S. passport information',
        isValid: true,
      },
    ],
  },
]

const invalidSections = [
  {
    title: 'Identification',
    url: 'identification',
    subsections: [
      {
        url: 'identification/name',
        name: 'Full name',
        isValid: true,
      },
    ],
  },
  {
    title: 'Foreign activities',
    url: 'foreign',
    subsections: [
      {
        url: 'foreign/passport',
        name: 'U.S. passport information',
        isValid: false,
      },
    ],
  },
]

describe('Validation helpers', () => {
  describe('sectionIsValid', () => {
    it('returns true if all sections are valid', () => {
      expect(sectionIsValid(validSections)).toBe(true)
    })

    it('returns false if any sections are invalid', () => {
      expect(sectionIsValid(invalidSections)).toBe(false)
    })
  })

  describe('sectionIsInvalid', () => {
    it('returns true if any sections are invalid', () => {
      expect(sectionIsInvalid(invalidSections)).toBe(true)
    })

    it('returns false if no sections are invalid', () => {
      expect(sectionIsInvalid(validSections)).toBe(false)
    })
  })
})
