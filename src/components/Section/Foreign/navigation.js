import * as validators from '../../../validators/index'

const navigation = {
  name: 'Foreign associations',
  title: 'Foreign associations',
  url: 'foreign',
  store: 'Foreign',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'U.S. passport information',
      url: 'passport',
      store: 'Passport',
      validator: validators.PassportValidator
    },
    {
      name: 'Foreign contacts',
      url: 'contacts',
      store: 'Contacts',
      validator: validators.ForeignContactsValidator
    },
    {
      name: 'Foreign activities',
      url: 'activities',
      subsections: [
        {
          name: 'Direct control',
          url: 'direct',
          store: 'DirectActivity',
          validator: validators.ForeignDirectActivityValidator
        },
        {
          name: 'Indirect control',
          url: 'indirect',
          store: 'IndirectActivity',
          validator: validators.ForeignIndirectActivityValidator
        },
        {
          name: 'Real estate purchase',
          url: 'realestate',
          store: 'RealEstateActivity',
          validator: validators.ForeignRealEstateActivityValidator
        },
        {
          name: 'Foreign benefits',
          url: 'benefits',
          store: 'BenefitActivity',
          validator: validators.ForeignBenefitActivityValidator
        },
        {
          name: 'Foreign national support',
          url: 'support',
          store: 'Support',
          validator: validators.ForeignActivitiesSupportValidator
        }
      ]
    },
    {
      name:
        'Foreign business, professional activities, and government contacts',
      url: 'business',
      subsections: [
        {
          name: 'Support provided',
          url: 'advice',
          store: 'Advice',
          validator: validators.ForeignBusinessAdviceValidator
        },
        {
          name: 'Immediate family foreign support',
          url: 'family',
          store: 'Family',
          validator: validators.ForeignBusinessFamilyValidator
        },
        {
          name: 'Employment',
          url: 'employment',
          store: 'Employment',
          validator: validators.ForeignBusinessEmploymentValidator
        },
        {
          name: 'Other business ventures',
          url: 'ventures',
          store: 'Ventures',
          validator: validators.ForeignBusinessVenturesValidator
        },
        {
          name: 'Event participation',
          url: 'conferences',
          store: 'Conferences',
          validator: validators.ForeignBusinessConferencesValidator
        },
        {
          name: 'Immediate family contact',
          url: 'contact',
          store: 'Contact',
          validator: validators.ForeignBusinessContactValidator
        },
        {
          name: 'Foreign national sponsorship',
          url: 'sponsorship',
          store: 'Sponsorship',
          validator: validators.ForeignBusinessSponsorshipValidator
        },
        {
          name: 'Held political office',
          url: 'political',
          store: 'Political',
          validator: validators.ForeignBusinessPoliticalValidator
        },
        {
          name: 'Voting',
          url: 'voting',
          store: 'Voting',
          validator: validators.ForeignBusinessVotingValidator
        }
      ]
    },
    {
      name: 'Foreign countries you have visited',
      url: 'travel',
      store: 'Travel',
      validator: validators.ForeignTravelValidator
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
