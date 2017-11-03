export const sectionData = (section, subsection, application = {}) => {
  if (!section || !subsection || !application) {
    return null
  }

  const wrap = (obj) => {
    return obj || {}
  }

  switch (`${section}/${subsection}`) {
    case 'identification/birthdate':
      return wrap(application.Identification).ApplicantBirthDate
    case 'identification/birthplace':
      return wrap(application.Identification).ApplicantBirthPlace
    case 'identification/contacts':
      return wrap(application.Identification).Contacts
    case 'identification/name':
      return wrap(application.Identification).ApplicantName
    case 'identification/othernames':
      return wrap(application.Identification).OtherNames
    case 'identification/physical':
      return wrap(application.Identification).Physical
    case 'identification/ssn':
      return wrap(application.Identification).ApplicantSSN

    case 'financial/bankruptcy':
      return wrap(application.Financial).Bankruptcy
    case 'financial/gambling':
      return wrap(application.Financial).Gambling
    case 'financial/taxes':
      return wrap(application.Financial).Taxes
    case 'financial/card':
      return wrap(application.Financial).Card
    case 'financial/credit':
      return wrap(application.Financial).Credit
    case 'financial/delinquent':
      return wrap(application.Financial).Delinquent
    case 'financial/nonpayment':
      return wrap(application.Financial).Nonpayment

    case 'history/education':
      return wrap(application.History).Education
    case 'history/employment':
      return wrap(application.History).Employment
    case 'history/federal':
      return wrap(application.History).Federal
    case 'history/residence':
      return wrap(application.History).Residence

    case 'relationships/status/marital':
      return wrap(application.Relationships).Marital
    case 'relationships/status/cohabitant':
      return wrap(application.Relationships).Cohabitants
    case 'relationships/people':
      return wrap(application.Relationships).People
    case 'relationships/relatives':
      return wrap(application.Relationships).Relatives

    case 'citizenship/multiple':
      return wrap(application.Citizenship).Multiple
    case 'citizenship/passports':
      return wrap(application.Citizenship).Passports
    case 'citizenship/status':
      return wrap(application.Citizenship).Status

    case 'military/selective':
      return wrap(application.Military).Selective
    case 'military/history':
      return wrap(application.Military).History
    case 'military/disciplinary':
      return wrap(application.Military).Disciplinary
    case 'military/foreign':
      return wrap(application.Military).Foreign

    case 'foreign/activities/benefits':
      return wrap(application.Foreign).BenefitActivity
    case 'foreign/activities/direct':
      return wrap(application.Foreign).DirectActivity
    case 'foreign/activities/indirect':
      return wrap(application.Foreign).IndirectActivity
    case 'foreign/activities/realestate':
      return wrap(application.Foreign).RealEstateActivity
    case 'foreign/activities/support':
      return wrap(application.Foreign).Support
    case 'foreign/business/advice':
      return wrap(application.Foreign).Advice
    case 'foreign/business/conferences':
      return wrap(application.Foreign).Conferences
    case 'foreign/business/contact':
      return wrap(application.Foreign).Contact
    case 'foreign/business/employment':
      return wrap(application.Foreign).Employment
    case 'foreign/business/family':
      return wrap(application.Foreign).Family
    case 'foreign/business/political':
      return wrap(application.Foreign).Political
    case 'foreign/business/sponsorship':
      return wrap(application.Foreign).Sponsorship
    case 'foreign/business/ventures':
      return wrap(application.Foreign).Ventures
    case 'foreign/business/voting':
      return wrap(application.Foreign).Voting
    case 'foreign/contacts':
      return wrap(application.Foreign).Contacts
    case 'foreign/passport':
      return wrap(application.Foreign).Passport
    case 'foreign/travel':
      return wrap(application.Foreign).Travel

    case 'substance/alcohol/additional':
      return wrap(application.SubstanceUse).ReceivedCounselings
    case 'substance/alcohol/negative':
      return wrap(application.SubstanceUse).NegativeImpacts
    case 'substance/alcohol/ordered':
      return wrap(application.SubstanceUse).OrderedCounselings
    case 'substance/alcohol/voluntary':
      return wrap(application.SubstanceUse).VoluntaryCounselings
    case 'substance/drugs/clearance':
      return wrap(application.SubstanceUse).DrugClearanceUses
    case 'substance/drugs/misuse':
      return wrap(application.SubstanceUse).PrescriptionUses
    case 'substance/drugs/ordered':
      return wrap(application.SubstanceUse).OrderedTreatments
    case 'substance/drugs/publicsafety':
      return wrap(application.SubstanceUse).DrugPublicSafetyUses
    case 'substance/drugs/purchase':
      return wrap(application.SubstanceUse).DrugInvolvements
    case 'substance/drugs/usage':
      return wrap(application.SubstanceUse).DrugUses
    case 'substance/drugs/voluntary':
      return wrap(application.SubstanceUse).VoluntaryTreatments

    case 'legal/associations/activities-to-overthrow':
      return wrap(application.Legal).ActivitiesToOverthrow
    case 'legal/associations/advocating':
      return wrap(application.Legal).Advocating
    case 'legal/associations/engaged-in-terrorism':
      return wrap(application.Legal).EngagedInTerrorism
    case 'legal/associations/membership-overthrow':
      return wrap(application.Legal).MembershipOverthrow
    case 'legal/associations/membership-violence-or-force':
      return wrap(application.Legal).MembershipViolence
    case 'legal/associations/terrorism-association':
      return wrap(application.Legal).TerrorismAssociation
    case 'legal/associations/terrorist-organization':
      return wrap(application.Legal).TerroristOrganization
    case 'legal/court':
      return wrap(application.Legal).NonCriminalCourtActions
    case 'legal/investigations/debarred':
      return wrap(application.Legal).Debarred
    case 'legal/investigations/history':
      return wrap(application.Legal).History
    case 'legal/investigations/revoked':
      return wrap(application.Legal).Revoked
    case 'legal/police/additionaloffenses':
      return wrap(application.Legal).PoliceOtherOffenses
    case 'legal/police/domesticviolence':
      return wrap(application.Legal).PoliceDomesticViolence
    case 'legal/police/offenses':
      return wrap(application.Legal).PoliceOffenses
    case 'legal/technology/manipulating':
      return wrap(application.Legal).Manipulating
    case 'legal/technology/unauthorized':
      return wrap(application.Legal).Unauthorized
    case 'legal/technology/unlawful':
      return wrap(application.Legal).Unlawful

    case 'psycholigical/competence':
      return wrap(application.Psychological).Competence
    case 'psycholigical/conditions':
      return wrap(application.Psychological).ExistingConditions
    case 'psycholigical/consultations':
      return wrap(application.Psychological).Consultations
    case 'psycholigical/diagnoses':
      return wrap(application.Psychological).Diagnoses
    case 'psycholigical/hospitalizations':
      return wrap(application.Psychological).Hospitalizations
    case 'submission/releases':
      return wrap(application.Submission).Releases
  }

  return null
}
