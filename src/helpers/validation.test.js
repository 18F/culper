import * as sections from 'constants/sections'

// IDENTIFICATION
import identificationName from 'models/sections/identificationName'
import identificationDateOfBirth from 'models/sections/identificationDateOfBirth'
import identificationPlaceOfBirth from 'models/sections/identificationPlaceOfBirth'
import identificationSSN from 'models/sections/identificationSSN'
import identificationOtherNames from 'models/sections/identificationOtherNames'
import identificationContactInfo from 'models/sections/identificationContactInfo'
import identificationPhysical from 'models/sections/identificationPhysical'

// HISTORY
import historyResidence from 'models/sections/historyResidence'
import historyEmployment from 'models/sections/historyEmployment'
import historyEducation from 'models/sections/historyEducation'
import historyFederal from 'models/sections/historyFederalService'

// RELATIONSHIPS
import relationshipsMaritalModel from 'models/sections/relationshipsMarital'
import relationshipsCohabitantsModel from 'models/sections/relationshipsCohabitants'
import relationshipsPeopleModel from 'models/sections/relationshipsPeople'
import relationshipsRelativesModel from 'models/sections/relationshipsRelatives'

// CITIZENSHIP
import usPassport from 'models/usPassport'
import citizenshipStatus from 'models/citizenshipStatus'
import citizenshipMultiple from 'models/sections/citizenshipMultiple'
import citizenshipPassports from 'models/sections/citizenshipPassports'

// MILITARY
import selectiveService from 'models/selectiveService'
import militaryHistory from 'models/militaryHistory'
import militaryDisciplinary from 'models/sections/militaryDisciplinary'
import militaryForeign from 'models/sections/militaryForeign'

import {
  sectionIsValid,
  sectionIsInvalid,
  validateSection,
  getValidatorForSection,
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

  describe('getValidatorForSection', () => {
    describe('when called for IDENTIFICATION_NAME', () => {
      it('returns the identificationName model', () => {
        expect(getValidatorForSection(sections.IDENTIFICATION_NAME))
          .toEqual(identificationName)
      })
    })

    describe('when called for IDENTIFICATION_BIRTH_DATE', () => {
      it('returns the identificationDateOfBirth model', () => {
        expect(getValidatorForSection(sections.IDENTIFICATION_BIRTH_DATE))
          .toEqual(identificationDateOfBirth)
      })
    })

    describe('when called for IDENTIFICATION_BIRTH_PLACE', () => {
      it('returns the identificationPlaceOfBirth model', () => {
        expect(getValidatorForSection(sections.IDENTIFICATION_BIRTH_PLACE))
          .toEqual(identificationPlaceOfBirth)
      })
    })

    describe('when called for IDENTIFICATION_SSN', () => {
      it('returns the identificationSSN model', () => {
        expect(getValidatorForSection(sections.IDENTIFICATION_SSN))
          .toEqual(identificationSSN)
      })
    })

    describe('when called for IDENTIFICATION_OTHER_NAMES', () => {
      it('returns the identificationOtherNames model', () => {
        expect(getValidatorForSection(sections.IDENTIFICATION_OTHER_NAMES))
          .toEqual(identificationOtherNames)
      })
    })

    describe('when called for IDENTIFICATION_CONTACTS', () => {
      it('returns the identificationContactInfo model', () => {
        expect(getValidatorForSection(sections.IDENTIFICATION_CONTACTS))
          .toEqual(identificationContactInfo)
      })
    })

    describe('when called for IDENTIFICATION_PHYSICAL', () => {
      it('returns the identificationPhysical model', () => {
        expect(getValidatorForSection(sections.IDENTIFICATION_PHYSICAL))
          .toEqual(identificationPhysical)
      })
    })

    describe('when called for HISTORY_RESIDENCE', () => {
      it('returns the historyResidence model', () => {
        expect(getValidatorForSection(sections.HISTORY_RESIDENCE))
          .toEqual(historyResidence)
      })
    })

    describe('when called for HISTORY_EMPLOYMENT', () => {
      it('returns the historyEmployment model', () => {
        expect(getValidatorForSection(sections.HISTORY_EMPLOYMENT))
          .toEqual(historyEmployment)
      })
    })

    describe('when called for HISTORY_EDUCATION', () => {
      it('returns the historyEducation model', () => {
        expect(getValidatorForSection(sections.HISTORY_EDUCATION))
          .toEqual(historyEducation)
      })
    })

    describe('when called for HISTORY_FEDERAL', () => {
      it('returns the historyFederal model', () => {
        expect(getValidatorForSection(sections.HISTORY_FEDERAL))
          .toEqual(historyFederal)
      })
    })

    describe('when called for RELATIONSHIPS_STATUS_MARITAL', () => {
      it('returns the relationshipsMaritalModel model', () => {
        expect(getValidatorForSection(sections.RELATIONSHIPS_STATUS_MARITAL))
          .toEqual(relationshipsMaritalModel)
      })
    })

    describe('when called for RELATIONSHIPS_STATUS_COHABITANTS', () => {
      it('returns the relationshipsCohabitantsModel model', () => {
        expect(getValidatorForSection(sections.RELATIONSHIPS_STATUS_COHABITANTS))
          .toEqual(relationshipsCohabitantsModel)
      })
    })

    describe('when called for RELATIONSHIPS_PEOPLE', () => {
      it('returns the relationshipsPeopleModel model', () => {
        expect(getValidatorForSection(sections.RELATIONSHIPS_PEOPLE))
          .toEqual(relationshipsPeopleModel)
      })
    })

    describe('when called for RELATIONSHIPS_RELATIVES', () => {
      it('returns the relationshipsRelativesModel model', () => {
        expect(getValidatorForSection(sections.RELATIONSHIPS_RELATIVES))
          .toEqual(relationshipsRelativesModel)
      })
    })

    describe('when called for CITIZENSHIP_US_PASSPORT', () => {
      it('returns the usPassport model', () => {
        expect(getValidatorForSection(sections.CITIZENSHIP_US_PASSPORT))
          .toEqual(usPassport)
      })
    })

    describe('when called for CITIZENSHIP_STATUS', () => {
      it('returns the citizenshipStatus model', () => {
        expect(getValidatorForSection(sections.CITIZENSHIP_STATUS))
          .toEqual(citizenshipStatus)
      })
    })

    describe('when called for CITIZENSHIP_MULTIPLE', () => {
      it('returns the citizenshipMultiple model', () => {
        expect(getValidatorForSection(sections.CITIZENSHIP_MULTIPLE))
          .toEqual(citizenshipMultiple)
      })
    })

    describe('when called for CITIZENSHIP_PASSPORTS', () => {
      it('returns the citizenshipPassports model', () => {
        expect(getValidatorForSection(sections.CITIZENSHIP_PASSPORTS))
          .toEqual(citizenshipPassports)
      })
    })

    describe('when called for MILITARY_SELECTIVE', () => {
      it('returns the selectiveService model', () => {
        expect(getValidatorForSection(sections.MILITARY_SELECTIVE))
          .toEqual(selectiveService)
      })
    })

    describe('when called for MILITARY_HISTORY', () => {
      it('returns the militaryHistory model', () => {
        expect(getValidatorForSection(sections.MILITARY_HISTORY))
          .toEqual(militaryHistory)
      })
    })

    describe('when called for MILITARY_DISCIPLINARY', () => {
      it('returns the militaryDisciplinary model', () => {
        expect(getValidatorForSection(sections.MILITARY_DISCIPLINARY))
          .toEqual(militaryDisciplinary)
      })
    })

    describe('when called for MILITARY_FOREIGN', () => {
      it('returns the militaryForeign model', () => {
        expect(getValidatorForSection(sections.MILITARY_FOREIGN))
          .toEqual(militaryForeign)
      })
    })
  })
})
