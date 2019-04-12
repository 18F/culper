const sectionData = (section, subsection, application = {}) => {
  if (!section || !subsection || !application) {
    return []
  }

  const wrap = obj => obj || {}

  switch (`${section.toLowerCase()}/${subsection.toLowerCase()}`) {
    case 'identification/birthdate':
      return [
        {
          path: 'identification/birthdate',
          data: wrap(application.Identification).ApplicantBirthDate,
        },
      ]
    case 'identification/birthplace':
      return [
        {
          path: 'identification/birthplace',
          data: wrap(application.Identification).ApplicantBirthPlace,
        },
      ]
    case 'identification/contacts':
      return [
        {
          path: 'identification/contacts',
          data: wrap(application.Identification).Contacts,
        },
      ]
    case 'identification/name':
      return [
        {
          path: 'identification/name',
          data: wrap(application.Identification).ApplicantName,
        },
      ]
    case 'identification/othernames':
      return [
        {
          path: 'identification/othernames',
          data: wrap(application.Identification).OtherNames,
        },
      ]
    case 'identification/physical':
      return [
        {
          path: 'identification/physical',
          data: wrap(application.Identification).Physical,
        },
      ]
    case 'identification/ssn':
      return [
        {
          path: 'identification/ssn',
          data: wrap(application.Identification).ApplicantSSN,
        },
      ]
    case 'identification/intro':
    case 'identification/review':
      return [
        {
          path: 'identification/birthdate',
          data: wrap(application.Identification).ApplicantBirthDate,
        },
        {
          path: 'identification/birthplace',
          data: wrap(application.Identification).ApplicantBirthPlace,
        },
        {
          path: 'identification/contacts',
          data: wrap(application.Identification).Contacts,
        },
        {
          path: 'identification/name',
          data: wrap(application.Identification).ApplicantName,
        },
        {
          path: 'identification/othernames',
          data: wrap(application.Identification).OtherNames,
        },
        {
          path: 'identification/physical',
          data: wrap(application.Identification).Physical,
        },
        {
          path: 'identification/ssn',
          data: wrap(application.Identification).ApplicantSSN,
        },
      ]

    case 'financial/bankruptcy':
      return [
        {
          path: 'financial/bankruptcy',
          data: wrap(application.Financial).Bankruptcy,
        },
      ]
    case 'financial/gambling':
      return [
        {
          path: 'financial/gambling',
          data: wrap(application.Financial).Gambling,
        },
      ]
    case 'financial/taxes':
      return [
        { path: 'financial/taxes', data: wrap(application.Financial).Taxes },
      ]
    case 'financial/card':
      return [
        { path: 'financial/card', data: wrap(application.Financial).Card },
      ]
    case 'financial/credit':
      return [
        { path: 'financial/credit', data: wrap(application.Financial).Credit },
      ]
    case 'financial/delinquent':
      return [
        {
          path: 'financial/delinquent',
          data: wrap(application.Financial).Delinquent,
        },
      ]
    case 'financial/nonpayment':
      return [
        {
          path: 'financial/nonpayment',
          data: wrap(application.Financial).Nonpayment,
        },
      ]
    case 'financial/intro':
    case 'financial/review':
      return [
        {
          path: 'financial/bankruptcy',
          data: wrap(application.Financial).Bankruptcy,
        },
        {
          path: 'financial/gambling',
          data: wrap(application.Financial).Gambling,
        },
        { path: 'financial/taxes', data: wrap(application.Financial).Taxes },
        { path: 'financial/card', data: wrap(application.Financial).Card },
        { path: 'financial/credit', data: wrap(application.Financial).Credit },
        {
          path: 'financial/delinquent',
          data: wrap(application.Financial).Delinquent,
        },
        {
          path: 'financial/nonpayment',
          data: wrap(application.Financial).Nonpayment,
        },
      ]

    case 'history/education':
      return [
        { path: 'history/education', data: wrap(application.History).Education },
      ]
    case 'history/employment':
      return [
        {
          path: 'history/employment',
          data: wrap(application.History).Employment,
        },
      ]
    case 'history/federal':
      return [
        { path: 'history/federal', data: wrap(application.History).Federal },
      ]
    case 'history/residence':
      return [
        { path: 'history/residence', data: wrap(application.History).Residence },
      ]
    case 'history/intro':
    case 'history/review':
      return [
        {
          path: 'history/education',
          data: wrap(application.History).Education,
        },
        {
          path: 'history/employment',
          data: wrap(application.History).Employment,
        },
        { path: 'history/federal', data: wrap(application.History).Federal },
        {
          path: 'history/residence',
          data: wrap(application.History).Residence,
        },
      ]

    case 'relationships/status/marital':
      return [
        {
          path: 'relationships/status/marital',
          data: wrap(application.Relationships).Marital,
        },
      ]
    case 'relationships/status/cohabitant':
      return [
        {
          path: 'relationships/status/cohabitant',
          data: wrap(application.Relationships).Cohabitants,
        },
      ]
    case 'relationships/people':
      return [
        {
          path: 'relationships/people',
          data: wrap(application.Relationships).People,
        },
      ]
    case 'relationships/relatives':
      return [
        {
          path: 'relationships/relatives',
          data: wrap(application.Relationships).Relatives,
        },
      ]
    case 'relationships/intro':
    case 'relationships/review':
      return [
        {
          path: 'relationships/status/marital',
          data: wrap(application.Relationships).Marital,
        },
        {
          path: 'relationships/status/cohabitant',
          data: wrap(application.Relationships).Cohabitants,
        },
        {
          path: 'relationships/people',
          data: wrap(application.Relationships).People,
        },
        {
          path: 'relationships/relatives',
          data: wrap(application.Relationships).Relatives,
        },
      ]
    // TODO: there are inconsistencies for which section U.S. Passport
    // is in. We want it to eventually be in Citizenship from Foreign.
    case 'citizenship/passport':
      return [
        { path: 'foreign/passport', data: wrap(application.Foreign).Passport },
      ]
    case 'citizenship/multiple':
      return [
        {
          path: 'citizenship/multiple',
          data: wrap(application.Citizenship).Multiple,
        },
      ]
    case 'citizenship/passports':
      return [
        {
          path: 'citizenship/passports',
          data: wrap(application.Citizenship).Passports,
        },
      ]
    case 'citizenship/status':
      return [
        {
          path: 'citizenship/status',
          data: wrap(application.Citizenship).Status,
        },
      ]
    case 'citizenship/intro':
    case 'citizenship/review':
      return [
        {
          path: 'citizenship/multiple',
          data: wrap(application.Citizenship).Multiple,
        },
        {
          path: 'citizenship/passports',
          data: wrap(application.Citizenship).Passports,
        },
        {
          path: 'citizenship/status',
          data: wrap(application.Citizenship).Status,
        },
      ]

    case 'military/selective':
      return [
        {
          path: 'military/selective',
          data: wrap(application.Military).Selective,
        },
      ]
    case 'military/history':
      return [
        { path: 'military/history', data: wrap(application.Military).History },
      ]
    case 'military/disciplinary':
      return [
        {
          path: 'military/disciplinary',
          data: wrap(application.Military).Disciplinary,
        },
      ]
    case 'military/foreign':
      return [
        { path: 'military/foreign', data: wrap(application.Military).Foreign },
      ]
    case 'military/intro':
    case 'military/review':
      return [
        {
          path: 'military/selective',
          data: wrap(application.Military).Selective,
        },
        { path: 'military/history', data: wrap(application.Military).History },
        {
          path: 'military/disciplinary',
          data: wrap(application.Military).Disciplinary,
        },
        { path: 'military/foreign', data: wrap(application.Military).Foreign },
      ]

    case 'foreign/activities/benefits':
      return [
        {
          path: 'foreign/activities/benefits',
          data: wrap(application.Foreign).BenefitActivity,
        },
      ]
    case 'foreign/activities/direct':
      return [
        {
          path: 'foreign/activities/direct',
          data: wrap(application.Foreign).DirectActivity,
        },
      ]
    case 'foreign/activities/indirect':
      return [
        {
          path: 'foreign/activities/indirect',
          data: wrap(application.Foreign).IndirectActivity,
        },
      ]
    case 'foreign/activities/realestate':
      return [
        {
          path: 'foreign/activities/realestate',
          data: wrap(application.Foreign).RealEstateActivity,
        },
      ]
    case 'foreign/activities/support':
      return [
        {
          path: 'foreign/activities/support',
          data: wrap(application.Foreign).Support,
        },
      ]
    case 'foreign/business/advice':
      return [
        {
          path: 'foreign/business/advice',
          data: wrap(application.Foreign).Advice,
        },
      ]
    case 'foreign/business/conferences':
      return [
        {
          path: 'foreign/business/conferences',
          data: wrap(application.Foreign).Conferences,
        },
      ]
    case 'foreign/business/contact':
      return [
        {
          path: 'foreign/business/contact',
          data: wrap(application.Foreign).Contact,
        },
      ]
    case 'foreign/business/employment':
      return [
        {
          path: 'foreign/business/employment',
          data: wrap(application.Foreign).Employment,
        },
      ]
    case 'foreign/business/family':
      return [
        {
          path: 'foreign/business/family',
          data: wrap(application.Foreign).Family,
        },
      ]
    case 'foreign/business/political':
      return [
        {
          path: 'foreign/business/political',
          data: wrap(application.Foreign).Political,
        },
      ]
    case 'foreign/business/sponsorship':
      return [
        {
          path: 'foreign/business/sponsorship',
          data: wrap(application.Foreign).Sponsorship,
        },
      ]
    case 'foreign/business/ventures':
      return [
        {
          path: 'foreign/business/ventures',
          data: wrap(application.Foreign).Ventures,
        },
      ]
    case 'foreign/business/voting':
      return [
        {
          path: 'foreign/business/voting',
          data: wrap(application.Foreign).Voting,
        },
      ]
    case 'foreign/contacts':
      return [
        { path: 'foreign/contacts', data: wrap(application.Foreign).Contacts },
      ]
    case 'foreign/travel':
      return [
        { path: 'foreign/travel', data: wrap(application.Foreign).Travel },
      ]
    case 'foreign/intro':
    case 'foreign/review':
      return [
        {
          path: 'foreign/activities/benefits',
          data: wrap(application.Foreign).BenefitActivity,
        },
        {
          path: 'foreign/activities/direct',
          data: wrap(application.Foreign).DirectActivity,
        },
        {
          path: 'foreign/activities/indirect',
          data: wrap(application.Foreign).IndirectActivity,
        },
        {
          path: 'foreign/activities/realestate',
          data: wrap(application.Foreign).RealEstateActivity,
        },
        {
          path: 'foreign/activities/support',
          data: wrap(application.Foreign).Support,
        },
        {
          path: 'foreign/business/advice',
          data: wrap(application.Foreign).Advice,
        },
        {
          path: 'foreign/business/conferences',
          data: wrap(application.Foreign).Conferences,
        },
        {
          path: 'foreign/business/contact',
          data: wrap(application.Foreign).Contact,
        },
        {
          path: 'foreign/business/employment',
          data: wrap(application.Foreign).Employment,
        },
        {
          path: 'foreign/business/family',
          data: wrap(application.Foreign).Family,
        },
        {
          path: 'foreign/business/political',
          data: wrap(application.Foreign).Political,
        },
        {
          path: 'foreign/business/sponsorship',
          data: wrap(application.Foreign).Sponsorship,
        },
        {
          path: 'foreign/business/ventures',
          data: wrap(application.Foreign).Ventures,
        },
        {
          path: 'foreign/business/voting',
          data: wrap(application.Foreign).Voting,
        },
        { path: 'foreign/contacts', data: wrap(application.Foreign).Contacts },
        { path: 'foreign/passport', data: wrap(application.Foreign).Passport },
        { path: 'foreign/travel', data: wrap(application.Foreign).Travel },
      ]

    case 'substance/alcohol/additional':
      return [
        {
          path: 'substance/alcohol/additional',
          data: wrap(application.Substance).ReceivedCounselings,
        },
      ]
    case 'substance/alcohol/negative':
      return [
        {
          path: 'substance/alcohol/negative',
          data: wrap(application.Substance).NegativeImpacts,
        },
      ]
    case 'substance/alcohol/ordered':
      return [
        {
          path: 'substance/alcohol/ordered',
          data: wrap(application.Substance).OrderedCounselings,
        },
      ]
    case 'substance/alcohol/voluntary':
      return [
        {
          path: 'substance/alcohol/voluntary',
          data: wrap(application.Substance).VoluntaryCounselings,
        },
      ]
    case 'substance/drugs/clearance':
      return [
        {
          path: 'substance/drugs/clearance',
          data: wrap(application.Substance).DrugClearanceUses,
        },
      ]
    case 'substance/drugs/misuse':
      return [
        {
          path: 'substance/drugs/misuse',
          data: wrap(application.Substance).PrescriptionUses,
        },
      ]
    case 'substance/drugs/ordered':
      return [
        {
          path: 'substance/drugs/ordered',
          data: wrap(application.Substance).OrderedTreatments,
        },
      ]
    case 'substance/drugs/publicsafety':
      return [
        {
          path: 'substance/drugs/publicsafety',
          data: wrap(application.Substance).DrugPublicSafetyUses,
        },
      ]
    case 'substance/drugs/purchase':
      return [
        {
          path: 'substance/drugs/purchase',
          data: wrap(application.Substance).DrugInvolvements,
        },
      ]
    case 'substance/drugs/usage':
      return [
        {
          path: 'substance/drugs/usage',
          data: wrap(application.Substance).DrugUses,
        },
      ]
    case 'substance/drugs/voluntary':
      return [
        {
          path: 'substance/drugs/voluntary',
          data: wrap(application.Substance).VoluntaryTreatments,
        },
      ]
    case 'substance/intro':
    case 'substance/review':
      return [
        {
          path: 'substance/alcohol/additional',
          data: wrap(application.Substance).ReceivedCounselings,
        },
        {
          path: 'substance/alcohol/negative',
          data: wrap(application.Substance).NegativeImpacts,
        },
        {
          path: 'substance/alcohol/ordered',
          data: wrap(application.Substance).OrderedCounselings,
        },
        {
          path: 'substance/alcohol/voluntary',
          data: wrap(application.Substance).VoluntaryCounselings,
        },
        {
          path: 'substance/drugs/clearance',
          data: wrap(application.Substance).DrugClearanceUses,
        },
        {
          path: 'substance/drugs/misuse',
          data: wrap(application.Substance).PrescriptionUses,
        },
        {
          path: 'substance/drugs/ordered',
          data: wrap(application.Substance).OrderedTreatments,
        },
        {
          path: 'substance/drugs/publicsafety',
          data: wrap(application.Substance).DrugPublicSafetyUses,
        },
        {
          path: 'substance/drugs/purchase',
          data: wrap(application.Substance).DrugInvolvements,
        },
        {
          path: 'substance/drugs/usage',
          data: wrap(application.Substance).DrugUses,
        },
        {
          path: 'substance/drugs/voluntary',
          data: wrap(application.Substance).VoluntaryTreatments,
        },
      ]

    case 'legal/associations/activities-to-overthrow':
      return [
        {
          path: 'legal/associations/activities-to-overthrow',
          data: wrap(application.Legal).ActivitiesToOverthrow,
        },
      ]
    case 'legal/associations/advocating':
      return [
        {
          path: 'legal/associations/advocating',
          data: wrap(application.Legal).Advocating,
        },
      ]
    case 'legal/associations/engaged-in-terrorism':
      return [
        {
          path: 'legal/associations/engaged-in-terrorism',
          data: wrap(application.Legal).EngagedInTerrorism,
        },
      ]
    case 'legal/associations/membership-overthrow':
      return [
        {
          path: 'legal/associations/membership-overthrow',
          data: wrap(application.Legal).MembershipOverthrow,
        },
      ]
    case 'legal/associations/membership-violence-or-force':
      return [
        {
          path: 'legal/associations/membership-violence-or-force',
          data: wrap(application.Legal).MembershipViolence,
        },
      ]
    case 'legal/associations/terrorism-association':
      return [
        {
          path: 'legal/associations/terrorism-association',
          data: wrap(application.Legal).TerrorismAssociation,
        },
      ]
    case 'legal/associations/terrorist-organization':
      return [
        {
          path: 'legal/associations/terrorist-organization',
          data: wrap(application.Legal).TerroristOrganization,
        },
      ]
    case 'legal/court':
      return [
        {
          path: 'legal/court',
          data: wrap(application.Legal).NonCriminalCourtActions,
        },
      ]
    case 'legal/investigations/debarred':
      return [
        {
          path: 'legal/investigations/debarred',
          data: wrap(application.Legal).Debarred,
        },
      ]
    case 'legal/investigations/history':
      return [
        {
          path: 'legal/investigations/history',
          data: wrap(application.Legal).History,
        },
      ]
    case 'legal/investigations/revoked':
      return [
        {
          path: 'legal/investigations/revoked',
          data: wrap(application.Legal).Revoked,
        },
      ]
    case 'legal/police/additionaloffenses':
      return [
        {
          path: 'legal/police/additionaloffenses',
          data: wrap(application.Legal).PoliceOtherOffenses,
        },
      ]
    case 'legal/police/domesticviolence':
      return [
        {
          path: 'legal/police/domesticviolence',
          data: wrap(application.Legal).PoliceDomesticViolence,
        },
      ]
    case 'legal/police/offenses':
      return [
        {
          path: 'legal/police/offenses',
          data: wrap(application.Legal).PoliceOffenses,
        },
      ]
    case 'legal/technology/manipulating':
      return [
        {
          path: 'legal/technology/manipulating',
          data: wrap(application.Legal).Manipulating,
        },
      ]
    case 'legal/technology/unauthorized':
      return [
        {
          path: 'legal/technology/unauthorized',
          data: wrap(application.Legal).Unauthorized,
        },
      ]
    case 'legal/technology/unlawful':
      return [
        {
          path: 'legal/technology/unlawful',
          data: wrap(application.Legal).Unlawful,
        },
      ]
    case 'legal/police/intro':
      return [
        {
          path: 'legal/police/additionaloffenses',
          data: wrap(application.Legal).PoliceOtherOffenses,
        },
        {
          path: 'legal/police/domesticviolence',
          data: wrap(application.Legal).PoliceDomesticViolence,
        },
        {
          path: 'legal/police/offenses',
          data: wrap(application.Legal).PoliceOffenses,
        },
      ]
    case 'legal/intro':
    case 'legal/review':
      return [
        {
          path: 'legal/associations/activities-to-overthrow',
          data: wrap(application.Legal).ActivitiesToOverthrow,
        },
        {
          path: 'legal/associations/advocating',
          data: wrap(application.Legal).Advocating,
        },
        {
          path: 'legal/associations/engaged-in-terrorism',
          data: wrap(application.Legal).EngagedInTerrorism,
        },
        {
          path: 'legal/associations/membership-overthrow',
          data: wrap(application.Legal).MembershipOverthrow,
        },
        {
          path: 'legal/associations/membership-violence-or-force',
          data: wrap(application.Legal).MembershipViolence,
        },
        {
          path: 'legal/associations/terrorism-association',
          data: wrap(application.Legal).TerrorismAssociation,
        },
        {
          path: 'legal/associations/terrorist-organization',
          data: wrap(application.Legal).TerroristOrganization,
        },
        {
          path: 'legal/court',
          data: wrap(application.Legal).NonCriminalCourtActions,
        },
        {
          path: 'legal/investigations/debarred',
          data: wrap(application.Legal).Debarred,
        },
        {
          path: 'legal/investigations/history',
          data: wrap(application.Legal).History,
        },
        {
          path: 'legal/investigations/revoked',
          data: wrap(application.Legal).Revoked,
        },
        {
          path: 'legal/police/additionaloffenses',
          data: wrap(application.Legal).PoliceOtherOffenses,
        },
        {
          path: 'legal/police/domesticviolence',
          data: wrap(application.Legal).PoliceDomesticViolence,
        },
        {
          path: 'legal/police/offenses',
          data: wrap(application.Legal).PoliceOffenses,
        },
        {
          path: 'legal/technology/manipulating',
          data: wrap(application.Legal).Manipulating,
        },
        {
          path: 'legal/technology/unauthorized',
          data: wrap(application.Legal).Unauthorized,
        },
        {
          path: 'legal/technology/unlawful',
          data: wrap(application.Legal).Unlawful,
        },
      ]

    case 'psychological/competence':
      return [
        {
          path: 'psychological/competence',
          data: wrap(application.Psychological).Competence,
        },
      ]
    case 'psychological/conditions':
      return [
        {
          path: 'psychological/conditions',
          data: wrap(application.Psychological).ExistingConditions,
        },
      ]
    case 'psychological/consultations':
      return [
        {
          path: 'psychological/consultations',
          data: wrap(application.Psychological).Consultations,
        },
      ]
    case 'psychological/diagnoses':
      return [
        {
          path: 'psychological/diagnoses',
          data: wrap(application.Psychological).Diagnoses,
        },
      ]
    case 'psychological/hospitalizations':
      return [
        {
          path: 'psychological/hospitalizations',
          data: wrap(application.Psychological).Hospitalizations,
        },
      ]
    case 'psychological/intro':
    case 'psychological/review':
      return [
        {
          path: 'psychological/competence',
          data: wrap(application.Psychological).Competence,
        },
        {
          path: 'psychological/conditions',
          data: wrap(application.Psychological).ExistingConditions,
        },
        {
          path: 'psychological/consultations',
          data: wrap(application.Psychological).Consultations,
        },
        {
          path: 'psychological/diagnoses',
          data: wrap(application.Psychological).Diagnoses,
        },
        {
          path: 'psychological/hospitalizations',
          data: wrap(application.Psychological).Hospitalizations,
        },
      ]

    case 'submission/releases':
      return [
        {
          path: 'submission/releases',
          data: wrap(application.Submission).Releases,
        },
      ]
    default:
      return []
  }
}

export default sectionData
