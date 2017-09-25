import { hideDisciplinaryProcedures } from '../validators/militarydisciplinary'
import { hideExistingConditions } from '../validators/psychological'
import { hideSelectiveService } from '../validators/selectiveservice'

const navigation = [
  {
    name: 'Information about you',
    title: 'Information about you',
    url: 'identification',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      { name: 'Full name', url: 'name' },
      { name: 'Your contact information', url: 'contacts' },
      { name: 'Other names used', url: 'othernames' },
      { name: 'Date of birth', url: 'birthdate' },
      { name: 'Place of birth', url: 'birthplace' },
      { name: 'Social security number', url: 'ssn' },
      { name: 'Your identifying information', url: 'physical' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Relationships',
    title: 'Relationships',
    url: 'relationships',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      {
        name: 'Marital & relationship status',
        url: 'status',
        subsections: [
          { name: 'Marital', url: 'marital' },
          { name: 'Cohabitants', url: 'cohabitant' }
        ]
      },
      { name: 'People who know you well', url: 'people' },
      { name: 'Relatives', url: 'relatives' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Your history',
    title: 'Your history',
    url: 'history',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      { name: 'Where you have lived', url: 'residence' },
      { name: 'Employment activities', url: 'employment' },
      { name: 'Where you went to school', url: 'education' },
      { name: 'Former federal service', url: 'federal' },
      { hidden: true, name: 'Employment record', url: 'employment' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Citizenship',
    title: 'Citizenship',
    url: 'citizenship',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      { name: 'Citizenship Status', url: 'status' },
      { name: 'Dual/Multiple Citizenship', url: 'multiple' },
      { name: 'Foreign Passports', url: 'passports' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Military history',
    title: 'Military history',
    url: 'military',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      { name: 'Selective service record', url: 'selective', hiddenFunc: hideSelectiveService },
      { name: 'U.S. military', url: 'history' },
      { name: 'Disciplinary procedures', url: 'disciplinary', hiddenFunc: hideDisciplinaryProcedures },
      { name: 'Foreign military', url: 'foreign' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Foreign activities',
    title: 'Foreign activities',
    url: 'foreign',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      { name: 'U.S. passport information', url: 'passport' },
      { name: 'Foreign contacts', url: 'contacts' },
      {
        name: 'Foreign activities',
        url: 'activities',
        subsections: [
          { name: 'Direct control', url: 'direct' },
          { name: 'Indirect control', url: 'indirect' },
          { name: 'Real estate purchase', url: 'realestate' },
          { name: 'Foreign benefits', url: 'benefits' },
          { name: 'Foreign national support', url: 'support' }
        ]
      },
      {
        name: 'Foreign business, professional activities, and government contacts',
        url: 'business',
        subsections: [
          { name: 'Support provided', url: 'advice' },
          { name: 'Immediate family foreign support', url: 'family' },
          { name: 'Employment', url: 'employment' },
          { name: 'Other business ventures', url: 'ventures' },
          { name: 'Event participation', url: 'conferences' },
          { name: 'Immediate family contact', url: 'contact' },
          { name: 'Foreign national sponsorship', url: 'sponsorship' },
          { name: 'Held political office', url: 'political' },
          { name: 'Voting', url: 'voting' }
        ]
      },
      { name: 'Foreign countries you have visited', url: 'travel' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Financial record',
    title: 'Financial record',
    url: 'financial',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      { name: 'Bankruptcy', url: 'bankruptcy' },
      { name: 'Gambling', url: 'gambling' },
      { name: 'Taxes', url: 'taxes' },
      { name: 'Employer card abuse', url: 'card' },
      { name: 'Credit counseling', url: 'credit' },
      { name: 'Delinquent payments', url: 'delinquent' },
      { name: 'Non-payment consequence', url: 'nonpayment' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Substance use',
    title: 'Substance use',
    url: 'substance',
    hidden: false,
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      {
        name: 'Illegal use of drugs and drug activity',
        url: 'drugs',
        subsections: [
          { name: 'Usage', url: 'usage' },
          { name: 'Purchase', url: 'purchase' },
          { name: 'Security clearance position', url: 'clearance' },
          { name: 'Public safety position', url: 'publicsafety' },
          { name: 'Misuse', url: 'misuse' },
          { name: 'Mandatory counseling or treatment', url: 'ordered' },
          { name: 'Voluntary counseling or treatment', url: 'voluntary' }
        ]
      },
      {
        name: 'Use of alcohol',
        url: 'alcohol',
        subsections: [
          { name: 'Negative impact', url: 'negative' },
          { name: 'Mandatory counseling or treatment', url: 'ordered' },
          { name: 'Voluntary counseling or treatment', url: 'voluntary' },
          { name: 'Additional instances', url: 'additional' }
        ]
      },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    name: 'Investigative and criminal history',
    title: 'Investigative and criminal history',
    url: 'legal',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      {
        name: 'Police record',
        url: 'police',
        subsections: [
          { exclude: true, name: 'Intro', url: 'intro' },
          { name: 'Offenses', url: 'offenses' },
          { name: 'Additional offenses', url: 'additionaloffenses' },
          { name: 'Domestic violence', url: 'domesticviolence' }
        ]
      },
      {
        name: 'Investigations and clearance record',
        url: 'investigations',
        subsections: [
          { name: 'Ever been investigated', url: 'history' },
          { name: 'Denied', url: 'revoked' },
          { name: 'Debarment', url: 'debarred' }
        ]
      },
      { name: 'Involvement in non-criminal court actions', url: 'court' },
      { hidden: true, name: 'Financial record', url: 'financial' },
      {
        name: 'Use of information technology systems',
        url: 'technology',
        subsections: [
          { name: 'Unauthorized access', url: 'unauthorized' },
          { name: 'Manipulating access', url: 'manipulating' },
          { name: 'Unlawful use', url: 'unlawful' }
        ]
      },
      {
        name: 'Association record',
        url: 'associations',
        subsections: [
          { name: 'Terrorist organization', url: 'terrorist-organization' },
          { name: 'Engaged in terrorism', url: 'engaged-in-terrorism' },
          { name: 'Advocating', url: 'advocating' },
          { name: 'Membership - overthrow', url: 'membership-overthrow' },
          { name: 'Membership - violence or force', url: 'membership-violence-or-force' },
          { name: 'Activities to overthrow', url: 'activities-to-overthrow' },
          { name: 'Terrorism association', url: 'terrorism-association' }
        ]
      },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    title: 'Psychological and emotional health',
    name: 'Psychological and emotional health',
    url: 'psychological',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      { name: 'Competence', url: 'competence' },
      { name: 'Consultations', url: 'consultations' },
      { name: 'Hospitalizations', url: 'hospitalizations' },
      { name: 'Diagnoses', url: 'diagnoses' },
      { name: 'Existing Conditions', url: 'conditions', hiddenFunc: hideExistingConditions },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  },
  {
    title: 'Questionnaire for National Security Positions',
    name: 'Questionnaire for National Security Positions',
    url: 'releases',
    subsections: [
      { name: 'Comments', url: 'comments' },
      { name: 'Release of information/HIPPA', url: 'general' },
      { name: 'Credit reporting disclosure', url: 'credit' }
    ],
    exclude: true
  },
  {
    title: 'Design guideline',
    name: 'Design guideline',
    url: 'design',
    hidden: true,
    exclude: true,
    subsections: [
      { name: 'Headings', url: 'headings' }
    ]
  }
]

export default navigation
