import * as sections from 'constants/sections'

import {
  sectionIsValid,
  sectionIsInvalid,
  validateSection,
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
  describe('validateSection', () => {
    it('doesn’t crash if called incorrectly', () => {
      expect(validateSection('blah')).toEqual(false)
    })

    it('catches and returns false if no validator is found', () => {
      expect(validateSection({ key: 'invalid' })).toEqual(false)
    })

    it('calls the validator function for the given section', () => {
      expect(validateSection({ key: sections.IDENTIFICATION_NAME })).toBeTruthy()
    })
  })

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
