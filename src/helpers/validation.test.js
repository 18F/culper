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

// FOREIGN
import foreignContacts from 'models/sections/foreignContacts'
import foreignDirectActivity from 'models/sections/foreignDirectActivity'
import foreignIndirectActivity from 'models/sections/foreignIndirectActivity'
import foreignRealEstateActivity from 'models/sections/foreignRealEstateActivity'
import foreignBenefitActivity from 'models/sections/foreignBenefitActivity'
import foreignSupport from 'models/sections/foreignSupport'
import foreignBusinessAdvice from 'models/sections/foreignBusinessAdvice'
import foreignBusinessFamily from 'models/sections/foreignBusinessFamily'
import foreignBusinessEmployment from 'models/sections/foreignBusinessEmployment'
import foreignBusinessVentures from 'models/sections/foreignBusinessVentures'
import foreignBusinessConferences from 'models/sections/foreignBusinessConferences'
import foreignBusinessContact from 'models/sections/foreignBusinessContact'
import foreignBusinessSponsorship from 'models/sections/foreignBusinessSponsorship'
import foreignBusinessPolitical from 'models/sections/foreignBusinessPolitical'
import foreignBusinessVoting from 'models/sections/foreignBusinessVoting'
import foreignTravel from 'models/sections/foreignTravel'

// FINANCIAL
import financialBankruptcy from 'models/sections/financialBankruptcy'
import financialGambling from 'models/sections/financialGambling'
import financialTaxes from 'models/sections/financialTaxes'
import financialCardAbuse from 'models/sections/financialCardAbuse'
import financialCredit from 'models/sections/financialCredit'
import financialDelinquent from 'models/sections/financialDelinquent'
import financialNonPayment from 'models/sections/financialNonPayment'

// SUBSTANCE USE
import substanceDrugUsesModel from 'models/sections/substanceDrugUses'
import substanceDrugInvolvementsModel from 'models/sections/substanceDrugInvolvements'
import substanceDrugClearanceUsesModel from 'models/sections/substanceDrugClearanceUses'
import substanceDrugPublicSafetyUsesModel from 'models/sections/substanceDrugPublicSafetyUses'
import substanceDrugPrescriptionUsesModel from 'models/sections/substanceDrugPrescriptionUses'
import substanceDrugOrderedTreatmentsModel from 'models/sections/substanceDrugOrderedTreatments'
import substanceDrugVoluntaryTreatmentsModel from 'models/sections/substanceDrugVoluntaryTreatments'
import substanceAlcoholNegativeImpactsModel from 'models/sections/substanceAlcoholNegativeImpacts'
import substanceAlcoholOrderedCounselingModel from 'models/sections/substanceAlcoholOrderedCounseling'
import substanceAlcoholVoluntaryCounselingModel from 'models/sections/substanceAlcoholVoluntaryCounseling'
import substanceAlcoholReceivedCounselingModel from 'models/sections/substanceAlcoholReceivedCounseling'

// LEGAL
import legalPoliceOffenses from 'models/sections/legalPoliceOffenses'
import legalPoliceOtherOffenses from 'models/sections/legalPoliceOtherOffenses'
import legalDomesticViolence from 'models/sections/legalDomesticViolence'
import legalInvestigationsHistory from 'models/sections/legalInvestigationsHistory'
import legalInvestigationsRevoked from 'models/sections/legalInvestigationsRevoked'
import legalInvestigationsDebarred from 'models/sections/legalInvestigationsDebarred'
import legalNonCriminalCourtActions from 'models/sections/legalNonCriminalCourtActions'
import legalTechnologyUnauthorized from 'models/sections/legalTechnologyUnauthorized'
import legalTechnologyManipulating from 'models/sections/legalTechnologyManipulating'
import legalTechnologyUnlawful from 'models/sections/legalTechnologyUnlawful'
import legalAssociationsTerrorist from 'models/sections/legalAssociationsTerrorist'
import legalAssociationsEngaged from 'models/sections/legalAssociationsEngaged'
import legalAssociationsAdvocating from 'models/sections/legalAssociationsAdvocating'
import legalAssociationsOverthrow from 'models/sections/legalAssociationsOverthrow'
import legalAssociationsViolence from 'models/sections/legalAssociationsViolence'
import legalAssociationsActivities from 'models/sections/legalAssociationsActivities'
import terrorism from 'models/terrorism'

// PSYCHOLOGICAL
import competence from 'models/competence'
import consultation from 'models/consultation'
import hospitalization from 'models/sections/hospitalization'
import diagnoses from 'models/diagnoses'
import existingConditions from 'models/existingConditions'

// PACKAGE
import packageComments from 'models/sections/packageComments'

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

    describe('when called for FOREIGN_CONTACTS', () => {
      it('returns the foreignContacts model', () => {
        expect(getValidatorForSection(sections.FOREIGN_CONTACTS))
          .toEqual(foreignContacts)
      })
    })

    describe('when called for FOREIGN_ACTIVITIES_DIRECT', () => {
      it('returns the foreignDirectActivity model', () => {
        expect(getValidatorForSection(sections.FOREIGN_ACTIVITIES_DIRECT))
          .toEqual(foreignDirectActivity)
      })
    })

    describe('when called for FOREIGN_ACTIVITIES_INDIRECT', () => {
      it('returns the foreignIndirectActivity model', () => {
        expect(getValidatorForSection(sections.FOREIGN_ACTIVITIES_INDIRECT))
          .toEqual(foreignIndirectActivity)
      })
    })

    describe('when called for FOREIGN_ACTIVITIES_REAL_ESTATE', () => {
      it('returns the foreignRealEstateActivity model', () => {
        expect(getValidatorForSection(sections.FOREIGN_ACTIVITIES_REAL_ESTATE))
          .toEqual(foreignRealEstateActivity)
      })
    })

    describe('when called for FOREIGN_ACTIVITIES_BENEFITS', () => {
      it('returns the foreignBenefitActivity model', () => {
        expect(getValidatorForSection(sections.FOREIGN_ACTIVITIES_BENEFITS))
          .toEqual(foreignBenefitActivity)
      })
    })

    describe('when called for FOREIGN_ACTIVITIES_SUPPORT', () => {
      it('returns the foreignSupport model', () => {
        expect(getValidatorForSection(sections.FOREIGN_ACTIVITIES_SUPPORT))
          .toEqual(foreignSupport)
      })
    })

    describe('when called for FOREIGN_BUSINESS_ADVICE', () => {
      it('returns the foreignBusinessAdvice model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_ADVICE))
          .toEqual(foreignBusinessAdvice)
      })
    })

    describe('when called for FOREIGN_BUSINESS_FAMILY', () => {
      it('returns the foreignBusinessFamily model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_FAMILY))
          .toEqual(foreignBusinessFamily)
      })
    })

    describe('when called for FOREIGN_BUSINESS_EMPLOYMENT', () => {
      it('returns the foreignBusinessEmployment model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_EMPLOYMENT))
          .toEqual(foreignBusinessEmployment)
      })
    })

    describe('when called for FOREIGN_BUSINESS_VENTURES', () => {
      it('returns the foreignBusinessVentures model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_VENTURES))
          .toEqual(foreignBusinessVentures)
      })
    })

    describe('when called for FOREIGN_BUSINESS_CONFERENCES', () => {
      it('returns the foreignBusinessConferences model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_CONFERENCES))
          .toEqual(foreignBusinessConferences)
      })
    })

    describe('when called for FOREIGN_BUSINESS_CONTACT', () => {
      it('returns the foreignBusinessContact model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_CONTACT))
          .toEqual(foreignBusinessContact)
      })
    })

    describe('when called for FOREIGN_BUSINESS_SPONSORSHIP', () => {
      it('returns the foreignBusinessSponsorship model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_SPONSORSHIP))
          .toEqual(foreignBusinessSponsorship)
      })
    })

    describe('when called for FOREIGN_BUSINESS_POLITICAL', () => {
      it('returns the foreignBusinessPolitical model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_POLITICAL))
          .toEqual(foreignBusinessPolitical)
      })
    })

    describe('when called for FOREIGN_BUSINESS_VOTING', () => {
      it('returns the foreignBusinessVoting model', () => {
        expect(getValidatorForSection(sections.FOREIGN_BUSINESS_VOTING))
          .toEqual(foreignBusinessVoting)
      })
    })

    describe('when called for FOREIGN_TRAVEL', () => {
      it('returns the foreignTravel model', () => {
        expect(getValidatorForSection(sections.FOREIGN_TRAVEL))
          .toEqual(foreignTravel)
      })
    })

    describe('when called for FINANCIAL_BANKRUPTCY', () => {
      it('returns the financialBankruptcy model', () => {
        expect(getValidatorForSection(sections.FINANCIAL_BANKRUPTCY))
          .toEqual(financialBankruptcy)
      })
    })

    describe('when called for FINANCIAL_GAMBLING', () => {
      it('returns the financialGambling model', () => {
        expect(getValidatorForSection(sections.FINANCIAL_GAMBLING))
          .toEqual(financialGambling)
      })
    })

    describe('when called for FINANCIAL_TAXES', () => {
      it('returns the financialTaxes model', () => {
        expect(getValidatorForSection(sections.FINANCIAL_TAXES))
          .toEqual(financialTaxes)
      })
    })

    describe('when called for FINANCIAL_CARD', () => {
      it('returns the financialCardAbuse model', () => {
        expect(getValidatorForSection(sections.FINANCIAL_CARD))
          .toEqual(financialCardAbuse)
      })
    })

    describe('when called for FINANCIAL_CREDIT', () => {
      it('returns the financialCredit model', () => {
        expect(getValidatorForSection(sections.FINANCIAL_CREDIT))
          .toEqual(financialCredit)
      })
    })

    describe('when called for FINANCIAL_DELINQUENT', () => {
      it('returns the financialDelinquent model', () => {
        expect(getValidatorForSection(sections.FINANCIAL_DELINQUENT))
          .toEqual(financialDelinquent)
      })
    })

    describe('when called for FINANCIAL_NONPAYMENT', () => {
      it('returns the financialNonPayment model', () => {
        expect(getValidatorForSection(sections.FINANCIAL_NONPAYMENT))
          .toEqual(financialNonPayment)
      })
    })

    describe('when called for SUBSTANCE_USE_DRUGS_USAGE', () => {
      it('returns the substanceDrugUsesModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_DRUGS_USAGE))
          .toEqual(substanceDrugUsesModel)
      })
    })

    describe('when called for SUBSTANCE_USE_DRUGS_PURCHASE', () => {
      it('returns the substanceDrugInvolvementsModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_DRUGS_PURCHASE))
          .toEqual(substanceDrugInvolvementsModel)
      })
    })

    describe('when called for SUBSTANCE_USE_DRUGS_CLEARANCE', () => {
      it('returns the substanceDrugClearanceUsesModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_DRUGS_CLEARANCE))
          .toEqual(substanceDrugClearanceUsesModel)
      })
    })

    describe('when called for SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY', () => {
      it('returns the substanceDrugPublicSafetyUsesModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY))
          .toEqual(substanceDrugPublicSafetyUsesModel)
      })
    })

    describe('when called for SUBSTANCE_USE_DRUGS_MISUSE', () => {
      it('returns the substanceDrugPrescriptionUsesModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_DRUGS_MISUSE))
          .toEqual(substanceDrugPrescriptionUsesModel)
      })
    })

    describe('when called for SUBSTANCE_USE_DRUGS_ORDERED', () => {
      it('returns the substanceDrugOrderedTreatmentsModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_DRUGS_ORDERED))
          .toEqual(substanceDrugOrderedTreatmentsModel)
      })
    })

    describe('when called for SUBSTANCE_USE_DRUGS_VOLUNTARY', () => {
      it('returns the substanceDrugVoluntaryTreatmentsModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_DRUGS_VOLUNTARY))
          .toEqual(substanceDrugVoluntaryTreatmentsModel)
      })
    })

    describe('when called for SUBSTANCE_USE_ALCOHOL_NEGATIVE', () => {
      it('returns the substanceAlcoholNegativeImpactsModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE))
          .toEqual(substanceAlcoholNegativeImpactsModel)
      })
    })

    describe('when called for SUBSTANCE_USE_ALCOHOL_ORDERED', () => {
      it('returns the substanceAlcoholOrderedCounselingModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_ALCOHOL_ORDERED))
          .toEqual(substanceAlcoholOrderedCounselingModel)
      })
    })

    describe('when called for SUBSTANCE_USE_ALCOHOL_VOLUNTARY', () => {
      it('returns the substanceAlcoholVoluntaryCounselingModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY))
          .toEqual(substanceAlcoholVoluntaryCounselingModel)
      })
    })

    describe('when called for SUBSTANCE_USE_ALCOHOL_ADDITIONAL', () => {
      it('returns the substanceAlcoholReceivedCounselingModel model', () => {
        expect(getValidatorForSection(sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL))
          .toEqual(substanceAlcoholReceivedCounselingModel)
      })
    })

    describe('when called for LEGAL_POLICE_OFFENSES', () => {
      it('returns the legalPoliceOffenses model', () => {
        expect(getValidatorForSection(sections.LEGAL_POLICE_OFFENSES))
          .toEqual(legalPoliceOffenses)
      })
    })

    describe('when called for LEGAL_POLICE_ADDITIONAL_OFFENSES', () => {
      it('returns the legalPoliceOtherOffenses model', () => {
        expect(getValidatorForSection(sections.LEGAL_POLICE_ADDITIONAL_OFFENSES))
          .toEqual(legalPoliceOtherOffenses)
      })
    })

    describe('when called for LEGAL_POLICE_DOMESTIC_VIOLENCE', () => {
      it('returns the legalDomesticViolence model', () => {
        expect(getValidatorForSection(sections.LEGAL_POLICE_DOMESTIC_VIOLENCE))
          .toEqual(legalDomesticViolence)
      })
    })

    describe('when called for LEGAL_INVESTIGATIONS_HISTORY', () => {
      it('returns the legalInvestigationsHistory model', () => {
        expect(getValidatorForSection(sections.LEGAL_INVESTIGATIONS_HISTORY))
          .toEqual(legalInvestigationsHistory)
      })
    })

    describe('when called for LEGAL_INVESTIGATIONS_REVOKED', () => {
      it('returns the legalInvestigationsRevoked model', () => {
        expect(getValidatorForSection(sections.LEGAL_INVESTIGATIONS_REVOKED))
          .toEqual(legalInvestigationsRevoked)
      })
    })

    describe('when called for LEGAL_INVESTIGATIONS_DEBARRED', () => {
      it('returns the legalInvestigationsDebarred model', () => {
        expect(getValidatorForSection(sections.LEGAL_INVESTIGATIONS_DEBARRED))
          .toEqual(legalInvestigationsDebarred)
      })
    })

    describe('when called for LEGAL_COURT', () => {
      it('returns the legalNonCriminalCourtActions model', () => {
        expect(getValidatorForSection(sections.LEGAL_COURT))
          .toEqual(legalNonCriminalCourtActions)
      })
    })

    describe('when called for LEGAL_TECHNOLOGY_UNAUTHORIZED', () => {
      it('returns the legalTechnologyUnauthorized model', () => {
        expect(getValidatorForSection(sections.LEGAL_TECHNOLOGY_UNAUTHORIZED))
          .toEqual(legalTechnologyUnauthorized)
      })
    })

    describe('when called for LEGAL_TECHNOLOGY_MANIPULATING', () => {
      it('returns the legalTechnologyManipulating model', () => {
        expect(getValidatorForSection(sections.LEGAL_TECHNOLOGY_MANIPULATING))
          .toEqual(legalTechnologyManipulating)
      })
    })

    describe('when called for LEGAL_TECHNOLOGY_UNLAWFUL', () => {
      it('returns the legalTechnologyUnlawful model', () => {
        expect(getValidatorForSection(sections.LEGAL_TECHNOLOGY_UNLAWFUL))
          .toEqual(legalTechnologyUnlawful)
      })
    })

    describe('when called for LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION', () => {
      it('returns the legalAssociationsTerrorist model', () => {
        expect(getValidatorForSection(sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION))
          .toEqual(legalAssociationsTerrorist)
      })
    })

    describe('when called for LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM', () => {
      it('returns the legalAssociationsEngaged model', () => {
        expect(getValidatorForSection(sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM))
          .toEqual(legalAssociationsEngaged)
      })
    })

    describe('when called for LEGAL_ASSOCIATIONS_ADVOCATING', () => {
      it('returns the legalAssociationsAdvocating model', () => {
        expect(getValidatorForSection(sections.LEGAL_ASSOCIATIONS_ADVOCATING))
          .toEqual(legalAssociationsAdvocating)
      })
    })

    describe('when called for LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW', () => {
      it('returns the legalAssociationsOverthrow model', () => {
        expect(getValidatorForSection(sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW))
          .toEqual(legalAssociationsOverthrow)
      })
    })

    describe('when called for LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE', () => {
      it('returns the legalAssociationsViolence model', () => {
        expect(getValidatorForSection(sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE))
          .toEqual(legalAssociationsViolence)
      })
    })

    describe('when called for LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW', () => {
      it('returns the legalAssociationsActivities model', () => {
        expect(getValidatorForSection(sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW))
          .toEqual(legalAssociationsActivities)
      })
    })

    describe('when called for LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION', () => {
      it('returns the terrorism model', () => {
        expect(getValidatorForSection(sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION))
          .toEqual(terrorism)
      })
    })

    describe('when called for PSYCHOLOGICAL_COMPETENCE', () => {
      it('returns the competence model', () => {
        expect(getValidatorForSection(sections.PSYCHOLOGICAL_COMPETENCE))
          .toEqual(competence)
      })
    })

    describe('when called for PSYCHOLOGICAL_CONSULTATIONS', () => {
      it('returns the consultation model', () => {
        expect(getValidatorForSection(sections.PSYCHOLOGICAL_CONSULTATIONS))
          .toEqual(consultation)
      })
    })

    describe('when called for PSYCHOLOGICAL_HOSPITALIZATIONS', () => {
      it('returns the hospitalization model', () => {
        expect(getValidatorForSection(sections.PSYCHOLOGICAL_HOSPITALIZATIONS))
          .toEqual(hospitalization)
      })
    })

    describe('when called for PSYCHOLOGICAL_DIAGNOSES', () => {
      it('returns the diagnoses model', () => {
        expect(getValidatorForSection(sections.PSYCHOLOGICAL_DIAGNOSES))
          .toEqual(diagnoses)
      })
    })

    describe('when called for PSYCHOLOGICAL_CONDITIONS', () => {
      it('returns the existingConditions model', () => {
        expect(getValidatorForSection(sections.PSYCHOLOGICAL_CONDITIONS))
          .toEqual(existingConditions)
      })
    })

    describe('when called for REVIEW_AND_SUBMIT_COMMENTS', () => {
      it('returns the packageComments model', () => {
        expect(getValidatorForSection(sections.REVIEW_AND_SUBMIT_COMMENTS))
          .toEqual(packageComments)
      })
    })
  })
})
