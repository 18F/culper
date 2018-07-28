import * as validators from '../../../validators/index'

const navigation = {
  name: 'Investigative and criminal history',
  title: 'Investigative and criminal history',
  url: 'legal',
  store: 'Legal',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'Police record',
      url: 'police',
      subsections: [
        { exclude: true, name: 'Introduction', url: 'intro' },
        {
          name: 'Offenses',
          url: 'offenses',
          store: 'PoliceOffenses',
          validator: validators.PoliceOffensesValidator
        },
        {
          name: 'Additional offenses',
          url: 'additionaloffenses',
          store: 'PoliceOtherOffenses',
          validator: validators.PoliceOtherOffensesValidator
        },
        {
          name: 'Domestic violence',
          url: 'domesticviolence',
          store: 'PoliceDomesticViolence',
          validator: validators.DomesticViolenceValidator
        }
      ]
    },
    {
      name: 'Investigations and clearance record',
      url: 'investigations',
      subsections: [
        {
          name: 'Ever been investigated',
          url: 'history',
          store: 'History',
          validator: validators.LegalInvestigationsHistoryValidator
        },
        {
          name: 'Denied',
          url: 'revoked',
          store: 'Revoked',
          validator: validators.LegalInvestigationsRevokedValidator
        },
        {
          name: 'Debarment',
          url: 'debarred',
          store: 'Debarred',
          validator: validators.LegalInvestigationsDebarredValidator
        }
      ]
    },
    {
      name: 'Involvement in non-criminal court actions',
      url: 'court',
      store: 'NonCriminalCourtActions',
      validator: validators.LegalNonCriminalCourtActionsValidator
    },
    {
      name: 'Use of information technology systems',
      url: 'technology',
      subsections: [
        {
          name: 'Unauthorized access',
          url: 'unauthorized',
          store: 'Unauthorized',
          validator: validators.LegalTechnologyUnauthorizedValidator
        },
        {
          name: 'Manipulating access',
          url: 'manipulating',
          store: 'Manipulating',
          validator: validators.LegalTechnologyManipulatingValidator
        },
        {
          name: 'Unlawful use',
          url: 'unlawful',
          store: 'Unlawful',
          validator: validators.LegalTechnologyUnlawfulValidator
        }
      ]
    },
    {
      name: 'Association record',
      url: 'associations',
      subsections: [
        {
          name: 'Terrorist organization',
          url: 'terrorist-organization',
          store: 'TerroristOrganization',
          validator: validators.LegalAssociationsTerroristValidator
        },
        {
          name: 'Engaged in terrorism',
          url: 'engaged-in-terrorism',
          store: 'EngagedInTerrorism',
          validator: validators.LegalAssociationsEngagedValidator
        },
        {
          name: 'Advocating',
          url: 'advocating',
          store: 'Advocating',
          validator: validators.LegalAssociationsAdvocatingValidator
        },
        {
          name: 'Membership - overthrow',
          url: 'membership-overthrow',
          store: 'MembershipOverthrow',
          validator: validators.LegalAssociationsOverthrowValidator
        },
        {
          name: 'Membership - violence or force',
          url: 'membership-violence-or-force',
          store: 'MembershipViolence',
          validator: validators.LegalAssociationsViolenceValidator
        },
        {
          name: 'Activities to overthrow',
          url: 'activities-to-overthrow',
          store: 'ActivitiesToOverthrow',
          validator: validators.LegalAssociationsActivitiesValidator
        },
        {
          name: 'Terrorism association',
          url: 'terrorism-association',
          store: 'TerrorismAssociation',
          validator: validators.LegalAssociationsTerrorismValidator
        }
      ]
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
