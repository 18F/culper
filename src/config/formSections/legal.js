import * as sections from '@constants/sections'
import { i18n } from '@config'

const LEGAL = {
  key: sections.LEGAL,
  name: 'legal',
  path: {
    section: 'legal',
  },
  store: 'Legal',
  label: i18n.t('legal.section.name'),
}

const LEGAL_INTRO = {
  key: sections.LEGAL_INTRO,
  name: 'intro',
  path: {
    section: LEGAL.path.section,
    subsection: 'intro',
  },
  label: i18n.t('legal.subsection.intro'),
}

const LEGAL_POLICE = {
  key: sections.LEGAL_POLICE,
  name: 'police',
  label: i18n.t('legal.subsection.police.label'),
}

const LEGAL_POLICE_INTRO = {
  key: sections.LEGAL_POLICE_INTRO,
  name: 'intro',
  path: {
    section: LEGAL.path.section,
    subsection: 'police/intro',
  },
  label: i18n.t('legal.subsection.police.intro'),
  parentKey: LEGAL_POLICE.key,
}

const LEGAL_POLICE_OFFENSES = {
  key: sections.LEGAL_POLICE_OFFENSES,
  name: 'offenses',
  path: {
    section: LEGAL.path.section,
    subsection: 'police/offenses',
  },
  storeKey: 'PoliceOffenses',
  label: i18n.t('legal.subsection.police.offenses'),
  parentKey: LEGAL_POLICE.key,
}

const LEGAL_POLICE_ADDITIONAL_OFFENSES = {
  key: sections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
  name: 'additionaloffenses',
  path: {
    section: LEGAL.path.section,
    subsection: 'police/additionaloffenses',
  },
  storeKey: 'PoliceOtherOffenses',
  label: i18n.t('legal.subsection.police.additionalOffenses'),
  parentKey: LEGAL_POLICE.key,
}

const LEGAL_POLICE_DOMESTIC_VIOLENCE = {
  key: sections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
  name: 'domesticviolence',
  path: {
    section: LEGAL.path.section,
    subsection: 'police/domesticviolence',
  },
  storeKey: 'PoliceDomesticViolence',
  label: i18n.t('legal.subsection.police.domesticViolence'),
  parentKey: LEGAL_POLICE.key,
}

const LEGAL_INVESTIGATIONS = {
  key: sections.LEGAL_INVESTIGATIONS,
  name: 'investigations',
  label: i18n.t('legal.subsection.investigations.label'),
}

const LEGAL_INVESTIGATIONS_HISTORY = {
  key: sections.LEGAL_INVESTIGATIONS_HISTORY,
  name: 'history',
  path: {
    section: LEGAL.path.section,
    subsection: 'investigations/history',
  },
  storeKey: 'History',
  label: i18n.t('legal.subsection.investigations.history'),
  parentKey: LEGAL_INVESTIGATIONS.key,
}

const LEGAL_INVESTIGATIONS_REVOKED = {
  key: sections.LEGAL_INVESTIGATIONS_REVOKED,
  name: 'revoked',
  path: {
    section: LEGAL.path.section,
    subsection: 'investigations/revoked',
  },
  storeKey: 'Revoked',
  label: i18n.t('legal.subsection.investigations.revoked'),
  parentKey: LEGAL_INVESTIGATIONS.key,
}

const LEGAL_INVESTIGATIONS_DEBARRED = {
  key: sections.LEGAL_INVESTIGATIONS_DEBARRED,
  name: 'debarred',
  path: {
    section: LEGAL.path.section,
    subsection: 'investigations/debarred',
  },
  storeKey: 'Debarred',
  label: i18n.t('legal.subsection.investigations.debarred'),
  parentKey: LEGAL_INVESTIGATIONS.key,
}

const LEGAL_COURT = {
  key: sections.LEGAL_COURT,
  name: 'court',
  path: {
    section: LEGAL.path.section,
    subsection: 'court',
  },
  storeKey: 'NonCrimincalCourtActions',
  label: i18n.t('legal.subsection.court'),
}

const LEGAL_TECHNOLOGY = {
  key: sections.LEGAL_TECHNOLOGY,
  name: 'technology',
  label: i18n.t('legal.subsection.technology.label'),
}

const LEGAL_TECHNOLOGY_UNAUTHORIZED = {
  key: sections.LEGAL_TECHNOLOGY_UNAUTHORIZED,
  name: 'unauthorized',
  path: {
    section: LEGAL.path.section,
    subsection: 'technology/unauthorized',
  },
  storeKey: 'Unauthorized',
  label: i18n.t('legal.subsection.technology.unauthorized'),
  parentKey: LEGAL_TECHNOLOGY.key,
}

const LEGAL_TECHNOLOGY_MANIPULATING = {
  key: sections.LEGAL_TECHNOLOGY_MANIPULATING,
  name: 'manipulating',
  path: {
    section: LEGAL.path.section,
    subsection: 'technology/manipulating',
  },
  storeKey: 'Manipulating',
  label: i18n.t('legal.subsection.technology.manipulating'),
  parentKey: LEGAL_TECHNOLOGY.key,
}

const LEGAL_TECHNOLOGY_UNLAWFUL = {
  key: sections.LEGAL_TECHNOLOGY_UNLAWFUL,
  name: 'unlawful',
  path: {
    section: LEGAL.path.section,
    subsection: 'technology/unlawful',
  },
  storeKey: 'Unlawful',
  label: i18n.t('legal.subsection.technology.unlawful'),
  parentKey: LEGAL_TECHNOLOGY.key,
}

const LEGAL_ASSOCIATIONS = {
  key: sections.LEGAL_ASSOCIATIONS,
  name: 'associations',
  label: i18n.t('legal.subsection.associations.label'),
}

const LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION = {
  key: sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
  name: 'terrorist-organization',
  path: {
    section: LEGAL.path.section,
    subsection: 'associations/terrorist-organization',
  },
  storeKey: 'TerroristOrganization',
  label: i18n.t('legal.subsection.associations.terroristOrganization'),
  parentKey: LEGAL_ASSOCIATIONS.key,
}

const LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM = {
  key: sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
  name: 'engaged-in-terrorism',
  path: {
    section: LEGAL.path.section,
    subsection: 'associations/engaged-in-terrorism',
  },
  storeKey: 'EngagedInTerrorism',
  label: i18n.t('legal.subsection.associations.engagedTerrorism'),
  parentKey: LEGAL_ASSOCIATIONS.key,
}

const LEGAL_ASSOCIATIONS_ADVOCATING = {
  key: sections.LEGAL_ASSOCIATIONS_ADVOCATING,
  name: 'advocating',
  path: {
    section: LEGAL.path.section,
    subsection: 'associations/advocating',
  },
  storeKey: 'Advocating',
  label: i18n.t('legal.subsection.associations.advocating'),
  parentKey: LEGAL_ASSOCIATIONS.key,
}

const LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW = {
  key: sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
  name: 'membership-overthrow',
  path: {
    section: LEGAL.path.section,
    subsection: 'associations/membership-overthrow',
  },
  storeKey: 'MembershipOverthrow',
  label: i18n.t('legal.subsection.associations.overthrow'),
  parentKey: LEGAL_ASSOCIATIONS.key,
}

const LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE = {
  key: sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
  name: 'membership-violence-or-force',
  path: {
    section: LEGAL.path.section,
    subsection: 'associations/membership-violence-or-force',
  },
  storeKey: 'MembershipViolence',
  label: i18n.t('legal.subsection.associations.violence'),
  parentKey: LEGAL_ASSOCIATIONS.key,
}

const LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW = {
  key: sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
  name: 'activities-to-overthrow',
  path: {
    section: LEGAL.path.section,
    subsection: 'associations/activities-to-overthrow',
  },
  storeKey: 'ActivitiesToOverthrow',
  label: i18n.t('legal.subsection.associations.activitiesOverthrow'),
  parentKey: LEGAL_ASSOCIATIONS.key,
}

const LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION = {
  key: sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
  name: 'terrorism-association',
  path: {
    section: LEGAL.path.section,
    subsection: 'associations/terrorism-association',
  },
  storeKey: 'TerrorismAssociation',
  label: i18n.t('legal.subsection.associations.terrorismAssociation'),
  parentKey: LEGAL_ASSOCIATIONS.key,
}

const LEGAL_REVIEW = {
  key: sections.LEGAL_REVIEW,
  name: 'review',
  path: {
    section: LEGAL.path.section,
    subsection: 'review',
  },
  label: i18n.t('legal.subsection.review'),
}

export default {
  LEGAL,
  LEGAL_INTRO,
  LEGAL_POLICE,
  LEGAL_POLICE_INTRO,
  LEGAL_POLICE_OFFENSES,
  LEGAL_POLICE_ADDITIONAL_OFFENSES,
  LEGAL_POLICE_DOMESTIC_VIOLENCE,
  LEGAL_INVESTIGATIONS,
  LEGAL_INVESTIGATIONS_HISTORY,
  LEGAL_INVESTIGATIONS_REVOKED,
  LEGAL_INVESTIGATIONS_DEBARRED,
  LEGAL_COURT,
  LEGAL_TECHNOLOGY,
  LEGAL_TECHNOLOGY_UNAUTHORIZED,
  LEGAL_TECHNOLOGY_MANIPULATING,
  LEGAL_TECHNOLOGY_UNLAWFUL,
  LEGAL_ASSOCIATIONS,
  LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
  LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
  LEGAL_ASSOCIATIONS_ADVOCATING,
  LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
  LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
  LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
  LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
  LEGAL_REVIEW,
}
