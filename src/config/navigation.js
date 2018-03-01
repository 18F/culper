import * as validators from '../validators'

const navigation = [
  {
    name: 'Information about you',
    title: 'Information about you',
    url: 'identification',
    store: 'Identification',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      { name: 'Full name', url: 'name', store: 'ApplicantName', validator: validators.IdentificationNameValidator },
      { name: 'Other names used', url: 'othernames', store: 'OtherNames', validator: validators.IdentificationOtherNamesValidator },
      { name: 'Your contact information', url: 'contacts', store: 'Contacts', validator: validators.IdentificationContactInformationValidator },
      { name: 'Date of birth', url: 'birthdate', store: 'ApplicantBirthDate', validator: validators.IdentificationBirthDateValidator },
      { name: 'Place of birth', url: 'birthplace', store: 'ApplicantBirthPlace', validator: validators.IdentificationBirthPlaceValidator },
      { name: 'Social security number', url: 'ssn', store: 'ApplicantSSN', validator: validators.IdentificationSSNValidator },
      { name: 'Your identifying information', url: 'physical', store: 'Physical', validator: validators.IdentificationPhysicalValidator },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Relationships',
    title: 'Relationships',
    url: 'relationships',
    store: 'Relationships',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      {
        name: 'Marital & relationship status',
        url: 'status',
        subsections: [
          { name: 'Marital', url: 'marital', store: 'Marital', validator: validators.MaritalValidator },
          { name: 'Cohabitants', url: 'cohabitant', store: 'Cohabitants', validator: validators.CohabitantsValidator }
        ]
      },
      { name: 'People who know you well', url: 'people', store: 'People', validator: validators.PeopleValidator },
      { name: 'Relatives', url: 'relatives', store: 'Relatives', validator: validators.RelativesValidator },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Your history',
    title: 'Your history',
    url: 'history',
    store: 'History',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      { name: 'Where you have lived', url: 'residence', store: 'Residence', validator: validators.HistoryResidenceValidator },
      { name: 'Employment activities', url: 'employment', store: 'Employment', validator: validators.HistoryEmploymentValidator },
      { name: 'Where you went to school', url: 'education', store: 'Education', validator: validators.HistoryEducationValidator },
      { name: 'Former federal service', url: 'federal', store: 'Federal', validator: validators.FederalServiceValidator },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Citizenship',
    title: 'Citizenship',
    url: 'citizenship',
    store: 'Citizenship',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      { name: 'Citizenship status', url: 'status', store: 'Status', validator: validators.CitizenshipValidator },
      { name: 'Dual/multiple citizenship', url: 'multiple', store: 'Multiple', validator: validators.CitizenshipMultipleValidator },
      { name: 'Foreign passports', url: 'passports', store: 'Passports', validator: validators.CitizenshipPassportsValidator },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Military history',
    title: 'Military history',
    url: 'military',
    store: 'Military',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      { name: 'Selective service record', url: 'selective', store: 'Selective', validator: validators.SelectiveServiceValidator, hiddenFunc: validators.hideSelectiveService },
      { name: 'U.S. military', url: 'history', store: 'History', validator: validators.MilitaryHistoryValidator },
      { name: 'Disciplinary procedures', url: 'disciplinary', store: 'Disciplinary', validator: validators.MilitaryDisciplinaryValidator, hiddenFunc: validators.hideDisciplinaryProcedures },
      { name: 'Foreign military', url: 'foreign', store: 'Foreign', validator: validators.MilitaryForeignValidator },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Foreign activities',
    title: 'Foreign activities',
    url: 'foreign',
    store: 'Foreign',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      { name: 'U.S. passport information', url: 'passport', store: 'Passport', validator: validators.PassportValidator },
      { name: 'Foreign contacts', url: 'contacts', store: 'Contacts', validator: validators.ForeignContactsValidator },
      {
        name: 'Foreign activities',
        url: 'activities',
        subsections: [
          { name: 'Direct control', url: 'direct', store: 'DirectActivity', validator: validators.ForeignDirectActivityValidator },
          { name: 'Indirect control', url: 'indirect', store: 'IndirectActivity', validator: validators.ForeignIndirectActivityValidator },
          { name: 'Real estate purchase', url: 'realestate', store: 'RealEstateActivity', validator: validators.ForeignRealEstateActivityValidator },
          { name: 'Foreign benefits', url: 'benefits', store: 'BenefitActivity', validator: validators.ForeignBenefitActivityValidator },
          { name: 'Foreign national support', url: 'support', store: 'Support', validator: validators.ForeignActivitiesSupportValidator }
        ]
      },
      {
        name: 'Foreign business, professional activities, and government contacts',
        url: 'business',
        subsections: [
          { name: 'Support provided', url: 'advice', store: 'Advice', validator: validators.ForeignBusinessAdviceValidator },
          { name: 'Immediate family foreign support', url: 'family', store: 'Family', validator: validators.ForeignBusinessFamilyValidator },
          { name: 'Employment', url: 'employment', store: 'Employment', validator: validators.ForeignBusinessEmploymentValidator },
          { name: 'Other business ventures', url: 'ventures', store: 'Ventures', validator: validators.ForeignBusinessVenturesValidator },
          { name: 'Event participation', url: 'conferences', store: 'Conferences', validator: validators.ForeignBusinessConferencesValidator },
          { name: 'Immediate family contact', url: 'contact', store: 'Contact', validator: validators.ForeignBusinessContactValidator },
          { name: 'Foreign national sponsorship', url: 'sponsorship', store: 'Sponsorship', validator: validators.ForeignBusinessSponsorshipValidator },
          { name: 'Held political office', url: 'political', store: 'Political', validator: validators.ForeignBusinessPoliticalValidator },
          { name: 'Voting', url: 'voting', store: 'Voting', validator: validators.ForeignBusinessVotingValidator }
        ]
      },
      { name: 'Foreign countries you have visited', url: 'travel', store: 'Travel', validator: validators.ForeignTravelValidator },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Financial record',
    title: 'Financial record',
    url: 'financial',
    store: 'Financial',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      { name: 'Bankruptcy', url: 'bankruptcy', store: 'Bankruptcy', validator: validators.BankruptcyValidator },
      { name: 'Gambling', url: 'gambling', store: 'Gambling', validator: validators.GamblingValidator },
      { name: 'Taxes', url: 'taxes', store: 'Taxes', validator: validators.TaxesValidator },
      { name: 'Employer card abuse', url: 'card', store: 'Card', validator: validators.CardAbuseValidator },
      { name: 'Credit counseling', url: 'credit', store: 'Credit', validator: validators.CreditValidator },
      { name: 'Delinquent payments', url: 'delinquent', store: 'Delinquent', validator: validators.DelinquentValidator },
      { name: 'Non-payment consequence', url: 'nonpayment', store: 'Nonpayment', validator: validators.NonpaymentValidator },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Substance use',
    title: 'Substance use',
    url: 'substance',
    store: 'Substance',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      {
        name: 'Illegal use of drugs and drug activity',
        url: 'drugs',
        subsections: [
          { name: 'Usage', url: 'usage', store: 'DrugUses', validator: validators.DrugUsesValidator },
          { name: 'Purchase', url: 'purchase', store: 'DrugInvolvements', validator: validators.DrugInvolvementsValidator },
          { name: 'Security clearance position', url: 'clearance', store: 'DrugClearanceUses', validator: validators.DrugClearanceUsesValidator },
          { name: 'Public safety position', url: 'publicsafety', store: 'DrugPublicSafetyUses', validator: validators.DrugPublicSafetyUsesValidator },
          { name: 'Misuse', url: 'misuse', store: 'PrescriptionUses', validator: validators.DrugPrescriptionUsesValidator },
          { name: 'Mandatory counseling or treatment', url: 'ordered', store: 'OrderedTreatments', validator: validators.DrugOrderedTreatmentsValidator },
          { name: 'Voluntary counseling or treatment', url: 'voluntary', store: 'VoluntaryTreatments', validator: validators.DrugVoluntaryTreatmentsValidator }
        ]
      },
      {
        name: 'Use of alcohol',
        url: 'alcohol',
        subsections: [
          { name: 'Negative impact', url: 'negative', store: 'NegativeImpacts', validator: validators.AlcoholNegativeImpactsValidator },
          { name: 'Mandatory counseling or treatment', url: 'ordered', store: 'OrderedCounselings', validator: validators.AlcoholOrderedCounselingsValidator },
          { name: 'Voluntary counseling or treatment', url: 'voluntary', store: 'VoluntaryCounselings', validator: validators.AlcoholVoluntaryCounselingsValidator },
          { name: 'Additional instances', url: 'additional', store: 'ReceivedCounselings', validator: validators.AlcoholReceivedCounselingsValidator }
        ]
      },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Investigative and criminal history',
    title: 'Investigative and criminal history',
    url: 'legal',
    store: 'Legal',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      {
        name: 'Police record',
        url: 'police',
        subsections: [
          { exclude: true, name: 'Introduction', url: 'intro' },
          { name: 'Offenses', url: 'offenses', store: 'PoliceOffenses', validator: validators.PoliceOffensesValidator },
          { name: 'Additional offenses', url: 'additionaloffenses', store: 'PoliceOtherOffenses', validator: validators.PoliceOtherOffensesValidator },
          { name: 'Domestic violence', url: 'domesticviolence', store: 'PoliceDomesticViolence', validator: validators.DomesticViolenceValidator }
        ]
      },
      {
        name: 'Investigations and clearance record',
        url: 'investigations',
        subsections: [
          { name: 'Ever been investigated', url: 'history', store: 'History', validator: validators.LegalInvestigationsHistoryValidator },
          { name: 'Denied', url: 'revoked', store: 'Revoked', validator: validators.LegalInvestigationsRevokedValidator },
          { name: 'Debarment', url: 'debarred', store: 'Debarred', validator: validators.LegalInvestigationsDebarredValidator }
        ]
      },
      { name: 'Involvement in non-criminal court actions', url: 'court', store: 'NonCriminalCourtActions', validator: validators.LegalNonCriminalCourtActionsValidator },
      {
        name: 'Use of information technology systems',
        url: 'technology',
        subsections: [
          { name: 'Unauthorized access', url: 'unauthorized', store: 'Unauthorized', validator: validators.LegalTechnologyUnauthorizedValidator },
          { name: 'Manipulating access', url: 'manipulating', store: 'Manipulating', validator: validators.LegalTechnologyManipulatingValidator },
          { name: 'Unlawful use', url: 'unlawful', store: 'Unlawful', validator: validators.LegalTechnologyUnlawfulValidator }
        ]
      },
      {
        name: 'Association record',
        url: 'associations',
        subsections: [
          { name: 'Terrorist organization', url: 'terrorist-organization', store: 'TerroristOrganization', validator: validators.LegalAssociationsTerroristValidator },
          { name: 'Engaged in terrorism', url: 'engaged-in-terrorism', store: 'EngagedInTerrorism', validator: validators.LegalAssociationsEngagedValidator },
          { name: 'Advocating', url: 'advocating', store: 'Advocating', validator: validators.LegalAssociationsAdvocatingValidator },
          { name: 'Membership - overthrow', url: 'membership-overthrow', store: 'MembershipOverthrow', validator: validators.LegalAssociationsOverthrowValidator },
          { name: 'Membership - violence or force', url: 'membership-violence-or-force', store: 'MembershipViolence', validator: validators.LegalAssociationsViolenceValidator },
          { name: 'Activities to overthrow', url: 'activities-to-overthrow', store: 'ActivitiesToOverthrow', validator: validators.LegalAssociationsActivitiesValidator },
          { name: 'Terrorism association', url: 'terrorism-association', store: 'TerrorismAssociation', validator: validators.LegalAssociationsTerrorismValidator }
        ]
      },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    title: 'Psychological and emotional health',
    name: 'Psychological and emotional health',
    url: 'psychological',
    store: 'Psychological',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: [
      { exclude: true, name: 'Introduction', url: 'intro' },
      { name: 'Competence', url: 'competence', store: 'Competence', validator: validators.CompetenceValidator },
      { name: 'Consultations', url: 'consultations', store: 'Consultations', validator: validators.ConsultationValidator },
      { name: 'Hospitalizations', url: 'hospitalizations', store: 'Hospitalizations', validator: validators.HospitalizationsValidator },
      { name: 'Diagnoses', url: 'diagnoses', store: 'Diagnoses', validator: validators.DiagnosesValidator },
      { name: 'Existing Conditions', url: 'conditions', store: 'ExistingConditions', validator: validators.ExistingConditionsValidator, hiddenFunc: validators.hideExistingConditions },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    title: 'Review and submit',
    name: 'Review and submit',
    url: 'package',
    showNumber: false,
    exclude: true,
    subsections: [
      {
        name: 'Review',
        url: 'review',
        locked: validators.formIsLocked
      },
      {
        name: 'Submit',
        url: 'submit',
        locked: (store) => {
          const hasErrors = (store) => {
            let errors = 0

            navigationWalker((path, child) => {
              if (path.length && path[0].store && child.store && child.validator) {
                if (child.excluded || child.hidden || (child.hiddenFunc && child.hiddenFunc(store))) {
                  return
                }

                const sectionName = path[0].url
                const data = (store[path[0].store] || {})[child.store] || {}

                let subsectionName = child.url
                if (path.length > 1) {
                  for (let i = path.length - 1; i > 0; i--) {
                    subsectionName = `${path[i].url}/${subsectionName}`
                  }
                }

                let valid = null
                try {
                  valid = new child.validator(data, data).isValid()
                } catch (e) {
                  valid = null
                }

                if (valid !== true) {
                  errors++
                }
              }
            })

            return errors > 0
          }

          return validators.formIsLocked(store) || hasErrors(store)
        }
      },
      {
        name: 'Print',
        url: 'print',
        locked: (store) => { return !validators.formIsLocked(store) }
      }
    ]
  }
]

export default navigation

export const navigationWalker = (action) => {
  navigation.forEach(section => { walk(section, action) })
}

export const walk = (section, action, path = []) => {
  if (!section.subsections || !action) {
    return
  }

  section.subsections.forEach(subsection => {
    walk(subsection, action, path.concat(section))
    action(path.concat(section), subsection)
  })
}
