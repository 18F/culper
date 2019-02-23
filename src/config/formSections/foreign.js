import * as sections from '@constants/sections'
import { i18n } from '@config'

const FOREIGN = {
  key: sections.FOREIGN,
  name: 'foreign',
  path: {
    section: 'foreign',
  },
  store: 'Foreign',
  label: i18n.t('foreign.section.name'),
}

const FOREIGN_INTRO = {
  key: sections.FOREIGN_INTRO,
  name: 'intro',
  path: {
    section: FOREIGN.path.section,
    subsection: 'intro',
  },
  label: i18n.t('foreign.subsection.intro'),
}

const FOREIGN_PASSPORT = {
  key: sections.FOREIGN_PASSPORT,
  name: 'passport',
  path: {
    section: FOREIGN.path.section,
    subsection: 'passport',
  },
  storeKey: 'Passport',
  label: i18n.t('foreign.subsection.passport'),
}

const FOREIGN_CONTACTS = {
  key: sections.FOREIGN_CONTACTS,
  name: 'contacts',
  path: {
    section: FOREIGN.path.section,
    subsection: 'contacts',
  },
  storeKey: 'Contacts',
  label: i18n.t('foreign.subsection.contacts'),
}

const FOREIGN_ACTIVITIES = {
  key: sections.FOREIGN_ACTIVITIES,
  name: 'activities',
  label: i18n.t('foreign.subsection.activities.label'),
}

const FOREIGN_ACTIVITIES_DIRECT = {
  key: sections.FOREIGN_ACTIVITIES_DIRECT,
  name: 'direct',
  path: {
    section: FOREIGN.path.section,
    subsection: 'activities/direct',
  },
  storeKey: 'DirectActivity',
  label: i18n.t('foreign.subsection.activities.direct'),
  parentKey: FOREIGN_ACTIVITIES.key,
}

const FOREIGN_ACTIVITIES_INDIRECT = {
  key: sections.FOREIGN_ACTIVITIES_INDIRECT,
  name: 'indirect',
  path: {
    section: FOREIGN.path.section,
    subsection: 'activities/indirect',
  },
  storeKey: 'IndirectActivity',
  label: i18n.t('foreign.subsection.activities.indirect'),
  parentKey: FOREIGN_ACTIVITIES.key,
}

const FOREIGN_ACTIVITIES_REAL_ESTATE = {
  key: sections.FOREIGN_ACTIVITIES_REAL_ESTATE,
  name: 'realestate',
  path: {
    section: FOREIGN.path.section,
    subsection: 'activities/realestate',
  },
  storeKey: 'RealEstateActivity',
  label: i18n.t('foreign.subsection.activities.realestate'),
  parentKey: FOREIGN_ACTIVITIES.key,
}

const FOREIGN_ACTIVITIES_BENEFITS = {
  key: sections.FOREIGN_ACTIVITIES_BENEFITS,
  name: 'benefits',
  path: {
    section: FOREIGN.path.section,
    subsection: 'activities/benefits',
  },
  storeKey: 'BenefitActivity',
  label: i18n.t('foreign.subsection.activities.benefits'),
  parentKey: FOREIGN_ACTIVITIES.key,
}

const FOREIGN_ACTIVITIES_SUPPORT = {
  key: sections.FOREIGN_ACTIVITIES_SUPPORT,
  name: 'support',
  path: {
    section: FOREIGN.path.section,
    subsection: 'activities/support',
  },
  storeKey: 'Support',
  label: i18n.t('foreign.subsection.activities.support'),
  parentKey: FOREIGN_ACTIVITIES.key,
}

const FOREIGN_BUSINESS = {
  key: sections.FOREIGN_BUSINESS,
  name: 'business',
  label: i18n.t('foreign.subsection.business.label'),
}

const FOREIGN_BUSINESS_ADVICE = {
  key: sections.FOREIGN_BUSINESS_ADVICE,
  name: 'advice',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/advice',
  },
  storeKey: 'Advice',
  label: i18n.t('foreign.subsection.business.advice'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_FAMILY = {
  key: sections.FOREIGN_BUSINESS_FAMILY,
  name: 'family',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/family',
  },
  storeKey: 'Family',
  label: i18n.t('foreign.subsection.business.family'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_EMPLOYMENT = {
  key: sections.FOREIGN_BUSINESS_EMPLOYMENT,
  name: 'employment',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/employment',
  },
  storeKey: 'Employment',
  label: i18n.t('foreign.subsection.business.employment'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_VENTURES = {
  key: sections.FOREIGN_BUSINESS_VENTURES,
  name: 'ventures',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/ventures',
  },
  storeKey: 'Ventures',
  label: i18n.t('foreign.subsection.business.ventures'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_CONFERENCES = {
  key: sections.FOREIGN_BUSINESS_CONFERENCES,
  name: 'conferences',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/conferences',
  },
  storeKey: 'Conferences',
  label: i18n.t('foreign.subsection.business.conferences'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_CONTACT = {
  key: sections.FOREIGN_BUSINESS_CONTACT,
  name: 'contact',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/contact',
  },
  storeKey: 'Contact',
  label: i18n.t('foreign.subsection.business.contact'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_SPONSORSHIP = {
  key: sections.FOREIGN_BUSINESS_SPONSORSHIP,
  name: 'sponsorship',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/sponsorship',
  },
  storeKey: 'Sponsorship',
  label: i18n.t('foreign.subsection.business.sponsorship'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_POLITICAL = {
  key: sections.FOREIGN_BUSINESS_POLITICAL,
  name: 'political',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/political',
  },
  storeKey: 'Political',
  label: i18n.t('foreign.subsection.business.political'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_BUSINESS_VOTING = {
  key: sections.FOREIGN_BUSINESS_VOTING,
  name: 'voting',
  path: {
    section: FOREIGN.path.section,
    subsection: 'business/voting',
  },
  storeKey: 'Voting',
  label: i18n.t('foreign.subsection.business.voting'),
  parentKey: FOREIGN_BUSINESS.key,
}

const FOREIGN_TRAVEL = {
  key: sections.FOREIGN_TRAVEL,
  name: 'travel',
  path: {
    section: FOREIGN.path.section,
    subsection: 'travel',
  },
  storeKey: 'Travel',
  label: i18n.t('foreign.subsection.travel'),
}

const FOREIGN_REVIEW = {
  key: sections.FOREIGN_REVIEW,
  name: 'review',
  path: {
    section: FOREIGN.path.section,
    subsection: 'review',
  },
  label: i18n.t('foreign.subsection.review'),
}

export default {
  FOREIGN,
  FOREIGN_INTRO,
  FOREIGN_PASSPORT,
  FOREIGN_CONTACTS,
  FOREIGN_ACTIVITIES,
  FOREIGN_ACTIVITIES_DIRECT,
  FOREIGN_ACTIVITIES_INDIRECT,
  FOREIGN_ACTIVITIES_REAL_ESTATE,
  FOREIGN_ACTIVITIES_BENEFITS,
  FOREIGN_ACTIVITIES_SUPPORT,
  FOREIGN_BUSINESS,
  FOREIGN_BUSINESS_ADVICE,
  FOREIGN_BUSINESS_FAMILY,
  FOREIGN_BUSINESS_EMPLOYMENT,
  FOREIGN_BUSINESS_VENTURES,
  FOREIGN_BUSINESS_CONFERENCES,
  FOREIGN_BUSINESS_CONTACT,
  FOREIGN_BUSINESS_SPONSORSHIP,
  FOREIGN_BUSINESS_POLITICAL,
  FOREIGN_BUSINESS_VOTING,
  FOREIGN_TRAVEL,
  FOREIGN_REVIEW,
}
