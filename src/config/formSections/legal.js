import * as sections from '@constants/sections'
import { i18n } from '@config'

const LEGAL = {
  key: sections.LEGAL,
  name: 'legal',
  path: '/legal',
  store: 'Legal',
  label: i18n.t('legal.section.name')
}

const LEGAL_INTRO = {
  key: sections.LEGAL_INTRO,
  name: 'intro',
  path: `${LEGAL.path}/intro`,
  label: i18n.t('legal.subsection.intro')
}

const LEGAL_POLICE = {
  key: sections.LEGAL_POLICE,
  name: 'police',
  path: `${LEGAL.path}/police`,
  label: i18n.t('legal.subsection.police.label')
}

const LEGAL_POLICE_INTRO = {
  key: sections.LEGAL_POLICE_INTRO,
  name: 'intro',
  path: `${LEGAL_POLICE.path}/intro`,
  label: i18n.t('legal.subsection.police.intro')
}

const LEGAL_POLICE_OFFENSES = {
  key: sections.LEGAL_POLICE_OFFENSES,
  name: 'offenses',
  path: `${LEGAL_POLICE.path}/offenses`,
  storeKey: 'PoliceOffenses',
  label: i18n.t('legal.subsection.police.offenses')
}

const LEGAL_POLICE_ADDITIONAL_OFFENSES = {
  key: sections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
  name: 'additionaloffenses',
  path: `${LEGAL_POLICE.path}/additionaloffenses`,
  storeKey: 'PoliceOtherOffenses',
  label: i18n.t('legal.subsection.police.additionalOffenses')
}

const LEGAL_POLICE_DOMESTIC_VIOLENCE = {
  key: sections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
  name: 'domesticviolence',
  path: `${LEGAL_POLICE.path}/domesticviolence`,
  storeKey: 'PoliceDomesticViolence',
  label: i18n.t('legal.subsection.police.domesticViolence')
}

const LEGAL_INVESTIGATIONS = {
  key: sections.LEGAL_INVESTIGATIONS,
  name: 'investigations',
  path: `${LEGAL.path}/investigations`,
  label: i18n.t('legal.subsection.investigations.label')
}

const LEGAL_INVESTIGATIONS_HISTORY = {
  key: sections.LEGAL_INVESTIGATIONS_HISTORY,
  name: 'history',
  path: `${LEGAL_INVESTIGATIONS.path}/history`,
  storeKey: 'History',
  label: i18n.t('legal.subsection.investigations.history')
}

const LEGAL_INVESTIGATIONS_REVOKED = {
  key: sections.LEGAL_INVESTIGATIONS_REVOKED,
  name: 'revoked',
  path: `${LEGAL_INVESTIGATIONS.path}/revoked`,
  storeKey: 'Revoked',
  label: i18n.t('legal.subsection.investigations.revoked')
}

const LEGAL_INVESTIGATIONS_DEBARRED = {
  key: sections.LEGAL_INVESTIGATIONS_DEBARRED,
  name: 'debarred',
  path: `${LEGAL_INVESTIGATIONS.path}/debarred`,
  storeKey: 'Debarred',
  label: i18n.t('legal.subsection.investigations.debarred')
}

const LEGAL_COURT = {
  key: sections.LEGAL_COURT,
  name: 'court',
  path: `${LEGAL.path}/court`,
  storeKey: 'NonCrimincalCourtActions',
  label: i18n.t('legal.subsection.court')
}

const LEGAL_TECHNOLOGY = {
  key: sections.LEGAL_TECHNOLOGY,
  name: 'technology',
  path: `${LEGAL.path}/technology`,
  label: i18n.t('legal.subsection.technology.label')
}

const LEGAL_TECHNOLOGY_UNAUTHORIZED = {
  key: sections.LEGAL_TECHNOLOGY_UNAUTHORIZED,
  name: 'unauthorized',
  path: `${LEGAL_TECHNOLOGY.path}/unauthorized`,
  storeKey: 'Unauthorized',
  label: i18n.t('legal.subsection.technology.unauthorized')
}

const LEGAL_TECHNOLOGY_MANIPULATING = {
  key: sections.LEGAL_TECHNOLOGY_MANIPULATING,
  name: 'manipulating',
  path: `${LEGAL_TECHNOLOGY.path}/manipulating`,
  storeKey: 'Manipulating',
  label: i18n.t('legal.subsection.technology.manipulating')
}

const LEGAL_TECHNOLOGY_UNLAWFUL = {
  key: sections.LEGAL_TECHNOLOGY_UNLAWFUL,
  name: 'unlawful',
  path: `${LEGAL_TECHNOLOGY.path}/unlawful`,
  storeKey: 'Unlawful',
  label: i18n.t('legal.subsection.technology.unlawful')
}

const LEGAL_ASSOCIATIONS = {
  key: sections.LEGAL_ASSOCIATIONS,
  name: 'associations',
  path: `${LEGAL.path}/associations`,
  label: i18n.t('legal.subsection.associations.label')
}

const LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION = {
  key: sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
  name: 'terrorist-organization',
  path: `${LEGAL_ASSOCIATIONS.path}/terrorist-organization`,
  storeKey: 'TerroristOrganization',
  label: i18n.t('legal.subsection.associations.terroristOrganization')
}

const LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM = {
  key: sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
  name: 'engaged-in-terrorism',
  path: `${LEGAL_ASSOCIATIONS.path}/engaged-in-terrorism`,
  storeKey: 'EngagedInTerrorism',
  label: i18n.t('legal.subsection.associations.engagedTerrorism')
}

const LEGAL_ASSOCIATIONS_ADVOCATING = {
  key: sections.LEGAL_ASSOCIATIONS_ADVOCATING,
  name: 'advocating',
  path: `${LEGAL_ASSOCIATIONS.path}/advocating`,
  storeKey: 'Advocating',
  label: i18n.t('legal.subsection.associations.advocating')
}

const LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW = {
  key: sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
  name: 'membership-overthrow',
  path: `${LEGAL_ASSOCIATIONS.path}/membership-overthrow`,
  storeKey: 'MembershipOverthrow',
  label: i18n.t('legal.subsection.associations.overthrow')
}

const LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE = {
  key: sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
  name: 'membership-violence-or-force',
  path: `${LEGAL_ASSOCIATIONS.path}/membership-violence-or-force`,
  storeKey: 'MembershipViolence',
  label: i18n.t('legal.subsection.associations.violence')
}

const LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW = {
  key: sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
  name: 'activities-to-overthrow',
  path: `${LEGAL_ASSOCIATIONS.path}/activities-to-overthrow`,
  storeKey: 'ActivitiesToOverthrow',
  label: i18n.t('legal.subsection.associations.activitiesOverthrow')
}

const LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION = {
  key: sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
  name: 'terrorism-association',
  path: `${LEGAL_ASSOCIATIONS.path}/terrorism-association`,
  storeKey: 'TerrorismAssociation',
  label: i18n.t('legal.subsection.associations.terrorismAssociation')
}

const LEGAL_REVIEW = {
  key: sections.LEGAL_REVIEW,
  name: 'review',
  path: `${LEGAL.path}/review`,
  label: i18n.t('legal.subsection.review')
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
  LEGAL_REVIEW
}
