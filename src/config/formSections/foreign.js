import * as sections from 'constants/sections'
import { i18n } from 'config'

// TODO: The `name` includes the nested subsection.
// We need to come up with a more permanent solution or confirm this config.

export const FOREIGN = {
  key: sections.FOREIGN,
  name: 'foreign',
  path: 'foreign',
  store: 'Foreign',
  label: i18n.t('foreign.section.name'),
}

export const FOREIGN_INTRO = {
  key: sections.FOREIGN_INTRO,
  name: 'intro',
  path: 'intro',
  label: i18n.t('foreign.subsection.intro'),
}

export const FOREIGN_CONTACTS = {
  key: sections.FOREIGN_CONTACTS,
  name: 'contacts',
  path: 'contacts',
  storeKey: 'Contacts',
  label: i18n.t('foreign.subsection.contacts'),
}

export const FOREIGN_ACTIVITIES = {
  key: sections.FOREIGN_ACTIVITIES,
  name: 'activities',
  path: 'activities',
  label: i18n.t('foreign.subsection.activities.label'),
}

export const FOREIGN_ACTIVITIES_DIRECT = {
  key: sections.FOREIGN_ACTIVITIES_DIRECT,
  name: 'activities/direct',
  path: 'direct',
  storeKey: 'DirectActivity',
  label: i18n.t('foreign.subsection.activities.direct'),
}

export const FOREIGN_ACTIVITIES_INDIRECT = {
  key: sections.FOREIGN_ACTIVITIES_INDIRECT,
  name: 'activities/indirect',
  path: 'indirect',
  storeKey: 'IndirectActivity',
  label: i18n.t('foreign.subsection.activities.indirect'),
}

export const FOREIGN_ACTIVITIES_REAL_ESTATE = {
  key: sections.FOREIGN_ACTIVITIES_REAL_ESTATE,
  name: 'activities/realestate',
  path: 'realestate',
  storeKey: 'RealEstateActivity',
  label: i18n.t('foreign.subsection.activities.realestate'),
}

export const FOREIGN_ACTIVITIES_BENEFITS = {
  key: sections.FOREIGN_ACTIVITIES_BENEFITS,
  name: 'activities/benefits',
  path: 'benefits',
  storeKey: 'BenefitActivity',
  label: i18n.t('foreign.subsection.activities.benefits'),
}

export const FOREIGN_ACTIVITIES_SUPPORT = {
  key: sections.FOREIGN_ACTIVITIES_SUPPORT,
  name: 'activities/support',
  path: 'support',
  storeKey: 'Support',
  label: i18n.t('foreign.subsection.activities.support'),
}

export const FOREIGN_BUSINESS = {
  key: sections.FOREIGN_BUSINESS,
  name: 'business',
  path: 'business',
  label: i18n.t('foreign.subsection.business.label'),
}

export const FOREIGN_BUSINESS_ADVICE = {
  key: sections.FOREIGN_BUSINESS_ADVICE,
  name: 'business/advice',
  path: 'advice',
  storeKey: 'Advice',
  label: i18n.t('foreign.subsection.business.advice'),
}

export const FOREIGN_BUSINESS_FAMILY = {
  key: sections.FOREIGN_BUSINESS_FAMILY,
  name: 'business/family',
  path: 'family',
  storeKey: 'Family',
  label: i18n.t('foreign.subsection.business.family'),
}

export const FOREIGN_BUSINESS_EMPLOYMENT = {
  key: sections.FOREIGN_BUSINESS_EMPLOYMENT,
  name: 'business/employment',
  path: 'employment',
  storeKey: 'Employment',
  label: i18n.t('foreign.subsection.business.employment'),
}

export const FOREIGN_BUSINESS_VENTURES = {
  key: sections.FOREIGN_BUSINESS_VENTURES,
  name: 'business/ventures',
  path: 'ventures',
  storeKey: 'Ventures',
  label: i18n.t('foreign.subsection.business.ventures'),
}

export const FOREIGN_BUSINESS_CONFERENCES = {
  key: sections.FOREIGN_BUSINESS_CONFERENCES,
  name: 'business/conferences',
  path: 'conferences',
  storeKey: 'Conferences',
  label: i18n.t('foreign.subsection.business.conferences'),
}

export const FOREIGN_BUSINESS_CONTACT = {
  key: sections.FOREIGN_BUSINESS_CONTACT,
  name: 'business/contact',
  path: 'contact',
  storeKey: 'Contact',
  label: i18n.t('foreign.subsection.business.contact'),
}

export const FOREIGN_BUSINESS_SPONSORSHIP = {
  key: sections.FOREIGN_BUSINESS_SPONSORSHIP,
  name: 'business/sponsorship',
  path: 'sponsorship',
  storeKey: 'Sponsorship',
  label: i18n.t('foreign.subsection.business.sponsorship'),
}

export const FOREIGN_BUSINESS_POLITICAL = {
  key: sections.FOREIGN_BUSINESS_POLITICAL,
  name: 'business/political',
  path: 'political',
  storeKey: 'Political',
  label: i18n.t('foreign.subsection.business.political'),
}

export const FOREIGN_BUSINESS_VOTING = {
  key: sections.FOREIGN_BUSINESS_VOTING,
  name: 'business/voting',
  path: 'voting',
  storeKey: 'Voting',
  label: i18n.t('foreign.subsection.business.voting'),
}

export const FOREIGN_TRAVEL = {
  key: sections.FOREIGN_TRAVEL,
  name: 'travel',
  path: 'travel',
  storeKey: 'Travel',
  label: i18n.t('foreign.subsection.travel'),
}

export const FOREIGN_REVIEW = {
  key: sections.FOREIGN_REVIEW,
  name: 'review',
  path: 'review',
  label: i18n.t('foreign.subsection.review'),
}

export default {
  FOREIGN,
  FOREIGN_INTRO,
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
