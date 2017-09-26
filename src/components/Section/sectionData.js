export const sectionData = (section, subsection, application = {}) => {
  if (!section || !subsection || !application) {
    return null
  }

  switch (`${section}/${subsection}`) {
    case 'identification/birthdate':
      return application.Identification.ApplicantBirthDate
    case 'identification/birthplace':
      return application.Identification.ApplicantBirthPlace
    case 'identification/contacts':
      return application.Identification.Contacts
    case 'identification/name':
      return application.Identification.ApplicantName
    case 'identification/othernames':
      return application.Identification.OtherNames
    case 'identification/physical':
      return application.Identification.Physical
    case 'identification/ssn':
      return application.Identification.ApplicantSSN

    case 'financial/bankruptcy':
      return application.Financial.Bankruptcy
    case 'financial/gambling':
      return application.Financial.Gambling
    case 'financial/taxes':
      return application.Financial.Taxes
    case 'financial/card':
      return application.Financial.Card
    case 'financial/credit':
      return application.Financial.Credit
    case 'financial/delinquent':
      return application.Financial.Delinquent
    case 'financial/nonpayment':
      return application.Financial.Nonpayment

    case 'history/education':
      return application.History.Education
    case 'history/employment':
      return application.History.Employment
    case 'history/federal':
      return application.History.Federal
    case 'history/residence':
      return application.History.Residence

    case 'relationships/status/marital':
      return application.Relationships.Marital
    case 'relationships/status/cohabitant':
      return application.Relationships.Cohabitants
    case 'relationships/people':
      return application.Relationships.People
    case 'relationships/relatives':
      return application.Relationships.Relatives

    case 'citizenship/multiple':
      return application.Citizenships.Multiple
    case 'citizenship/passports':
      return application.Citizenships.Passports
    case 'citizenship/status':
      return application.Citizenships.Status

    case 'military/selective':
      return application.Military.Selective
    case 'military/history':
      return application.Military.History
    case 'military/disciplinary':
      return application.Military.Disciplinary
    case 'military/foreign':
      return application.Military.Foreign

    case 'foreign/activities/benefits':
      return application.Foreign.BenefitActivity
    case 'foreign/activities/direct':
      return application.Foreign.DirectActivity
    case 'foreign/activities/indirect':
      return application.Foreign.IndirectActivity
    case 'foreign/activities/realestate':
      return application.Foreign.RealEstateActivity
    case 'foreign/activities/support':
      return application.Foreign.Support
    case 'foreign/business/advice':
      return application.Foreign.Advice
    case 'foreign/business/conferences':
      return application.Foreign.Conferences
    case 'foreign/business/contact':
      return application.Foreign.Contact
    case 'foreign/business/employment':
      return application.Foreign.Employment
    case 'foreign/business/family':
      return application.Foreign.Family
    case 'foreign/business/political':
      return application.Foreign.Political
    case 'foreign/business/sponsorship':
      return application.Foreign.Sponsorship
    case 'foreign/business/ventures':
      return application.Foreign.Ventures
    case 'foreign/business/voting':
      return application.Foreign.Voting
    case 'foreign/contacts':
      return application.Foreign.Contacts
    case 'foreign/passport':
      return application.Foreign.Passport
    case 'foreign/travel':
      return application.Foreign.Travel

    case 'substance/alcohol/additional':
      return application.SubstanceUse.ReceivedCounselings
    case 'substance/alcohol/negative':
      return application.SubstanceUse.NegativeImpacts
    case 'substance/alcohol/ordered':
      return application.SubstanceUse.OrderedCounselings
    case 'substance/alcohol/voluntary':
      return application.SubstanceUse.VoluntaryCounselings
    case 'substance/drugs/clearance':
      return application.SubstanceUse.DrugClearanceUses
    case 'substance/drugs/misuse':
      return application.SubstanceUse.PrescriptionUses
    case 'substance/drugs/ordered':
      return application.SubstanceUse.OrderedTreatments
    case 'substance/drugs/publicsafety':
      return application.SubstanceUse.DrugPublicSafetyUses
    case 'substance/drugs/purchase':
      return application.SubstanceUse.DrugInvolvements
    case 'substance/drugs/usage':
      return application.SubstanceUse.DrugUses
    case 'substance/drugs/voluntary':
      return application.SubstanceUse.VoluntaryTreatments

    case 'legal/associations/activities-to-overthrow':
      return application.Legal.ActivitiesToOverthrow
    case 'legal/associations/advocating':
      return application.Legal.Advocating
    case 'legal/associations/engaged-in-terrorism':
      return application.Legal.EngagedInTerrorism
    case 'legal/associations/membership-overthrow':
      return application.Legal.MembershipOverthrow
    case 'legal/associations/membership-violence-or-force':
      return application.Legal.MembershipViolence
    case 'legal/associations/terrorism-association':
      return application.Legal.TerrorismAssociation
    case 'legal/associations/terrorist-organization':
      return application.Legal.TerroristOrganization
    case 'legal/court':
      return application.Legal.NonCriminalCourtActions
    case 'legal/investigations/debarred':
      return application.Legal.Debarred
    case 'legal/investigations/history':
      return application.Legal.History
    case 'legal/investigations/revoked':
      return application.Legal.Revoked
    case 'legal/police/additionaloffenses':
      return application.Legal.PoliceOtherOffenses
    case 'legal/police/domesticviolence':
      return application.Legal.PoliceDomesticViolence
    case 'legal/police/offenses':
      return application.Legal.PoliceOffenses
    case 'legal/technology/manipulating':
      return application.Legal.Manipulating
    case 'legal/technology/unauthorized':
      return application.Legal.Unauthorized
    case 'legal/technology/unlawful':
      return application.Legal.Unlawful

    case 'psycholigical/competence':
      return application.Psychological.Competence
    case 'psycholigical/conditions':
      return application.Psychological.ExistingConditions
    case 'psycholigical/consultations':
      return application.Psychological.Consultations
    case 'psycholigical/diagnoses':
      return application.Psychological.Diagnoses
    case 'psycholigical/hospitalizations':
      return application.Psychological.Hospitalizations
  }

  return null
}
