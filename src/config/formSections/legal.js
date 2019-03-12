import * as sections from 'constants/sections'
import { i18n } from 'config'

export const LEGAL = {
  key: sections.LEGAL,
  name: 'legal',
  path: 'legal',
  store: 'Legal',
  label: i18n.t('legal.section.name'),
}

export const LEGAL_INTRO = {
  key: sections.LEGAL_INTRO,
  name: 'intro',
  path: 'intro',
  label: i18n.t('legal.subsection.intro'),
}

export const LEGAL_POLICE = {
  key: sections.LEGAL_POLICE,
  name: 'police',
  path: 'police',
  label: i18n.t('legal.subsection.police.label'),
}

export const LEGAL_POLICE_INTRO = {
  key: sections.LEGAL_POLICE_INTRO,
  name: 'police/intro',
  path: 'intro',
  label: i18n.t('legal.subsection.police.intro'),
}

export const LEGAL_POLICE_OFFENSES = {
  key: sections.LEGAL_POLICE_OFFENSES,
  name: 'police/offenses',
  path: 'offenses',
  storeKey: 'PoliceOffenses',
  label: i18n.t('legal.subsection.police.offenses'),
}

export const LEGAL_POLICE_ADDITIONAL_OFFENSES = {
  key: sections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
  name: 'police/additionalOffenses',
  path: 'additionaloffenses',
  storeKey: 'PoliceOtherOffenses',
  label: i18n.t('legal.subsection.police.additionalOffenses'),
}

export const LEGAL_POLICE_DOMESTIC_VIOLENCE = {
  key: sections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
  name: 'police/domesticViolence',
  path: 'domesticviolence',
  storeKey: 'PoliceDomesticViolence',
  label: i18n.t('legal.subsection.police.domesticViolence'),
}

export const LEGAL_INVESTIGATIONS = {
  key: sections.LEGAL_INVESTIGATIONS,
  name: 'investigations',
  path: 'investigations',
  label: i18n.t('legal.subsection.investigations.label'),
}

export const LEGAL_INVESTIGATIONS_HISTORY = {
  key: sections.LEGAL_INVESTIGATIONS_HISTORY,
  name: 'investigations/history',
  path: 'history',
  storeKey: 'History',
  label: i18n.t('legal.subsection.investigations.history'),
}

export const LEGAL_INVESTIGATIONS_REVOKED = {
  key: sections.LEGAL_INVESTIGATIONS_REVOKED,
  name: 'investigations/revoked',
  path: 'revoked',
  storeKey: 'Revoked',
  label: i18n.t('legal.subsection.investigations.revoked'),
}

export const LEGAL_INVESTIGATIONS_DEBARRED = {
  key: sections.LEGAL_INVESTIGATIONS_DEBARRED,
  name: 'investigations/debarred',
  path: 'debarred',
  storeKey: 'Debarred',
  label: i18n.t('legal.subsection.investigations.debarred'),
}

export const LEGAL_COURT = {
  key: sections.LEGAL_COURT,
  name: 'court',
  path: 'court',
  storeKey: 'NonCrimincalCourtActions',
  label: i18n.t('legal.subsection.court'),
}

export const LEGAL_TECHNOLOGY = {
  key: sections.LEGAL_TECHNOLOGY,
  name: 'technology',
  path: 'technology',
  label: i18n.t('legal.subsection.technology.label'),
}

export const LEGAL_TECHNOLOGY_UNAUTHORIZED = {
  key: sections.LEGAL_TECHNOLOGY_UNAUTHORIZED,
  name: 'technology/unauthorized',
  path: 'unauthorized',
  storeKey: 'Unauthorized',
  label: i18n.t('legal.subsection.technology.unauthorized'),
}

export const LEGAL_TECHNOLOGY_MANIPULATING = {
  key: sections.LEGAL_TECHNOLOGY_MANIPULATING,
  name: 'technology/manipulating',
  path: 'manipulating',
  storeKey: 'Manipulating',
  label: i18n.t('legal.subsection.technology.manipulating'),
}

export const LEGAL_TECHNOLOGY_UNLAWFUL = {
  key: sections.LEGAL_TECHNOLOGY_UNLAWFUL,
  name: 'technology/unlawful',
  path: 'unlawful',
  storeKey: 'Unlawful',
  label: i18n.t('legal.subsection.technology.unlawful'),
}

export const LEGAL_ASSOCIATIONS = {
  key: sections.LEGAL_ASSOCIATIONS,
  name: 'associations',
  path: 'associations',
  label: i18n.t('legal.subsection.associations.label'),
}

export const LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION = {
  key: sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
  name: 'associations/terrorist-organization',
  path: 'terrorist-organization',
  storeKey: 'TerroristOrganization',
  label: i18n.t('legal.subsection.associations.terroristOrganization'),
}

export const LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM = {
  key: sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
  name: 'associations/engaged-in-terrorism',
  path: 'engaged-in-terrorism',
  storeKey: 'EngagedInTerrorism',
  label: i18n.t('legal.subsection.associations.engagedTerrorism'),
}

export const LEGAL_ASSOCIATIONS_ADVOCATING = {
  key: sections.LEGAL_ASSOCIATIONS_ADVOCATING,
  name: 'associations/advocating',
  path: 'advocating',
  storeKey: 'Advocating',
  label: i18n.t('legal.subsection.associations.advocating'),
}

export const LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW = {
  key: sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
  name: 'associations/membership-overthrow',
  path: 'membership-overthrow',
  storeKey: 'MembershipOverthrow',
  label: i18n.t('legal.subsection.associations.overthrow'),
}

export const LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE = {
  key: sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
  name: 'associations/membership-violence-or-force',
  path: 'membership-violence-or-force',
  storeKey: 'MembershipViolence',
  label: i18n.t('legal.subsection.associations.violence'),
}

export const LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW = {
  key: sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
  name: 'associations/activities-to-overthrow',
  path: 'activities-to-overthrow',
  storeKey: 'ActivitiesToOverthrow',
  label: i18n.t('legal.subsection.associations.activitiesOverthrow'),
}

export const LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION = {
  key: sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
  name: 'associations/terrorism-association',
  path: 'terrorism-association',
  storeKey: 'TerrorismAssociation',
  label: i18n.t('legal.subsection.associations.terrorismAssociation'),
}

export const LEGAL_REVIEW = {
  key: sections.LEGAL_REVIEW,
  name: 'review',
  path: 'review',
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
