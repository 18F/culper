import * as sections from 'constants/sections'
import { i18n } from 'config'

export const CITIZENSHIP = {
  key: sections.CITIZENSHIP,
  name: 'citizenship',
  path: '/citizenship',
  store: 'Citizenship',
  label: i18n.t('citizenship.section.name')
}

export const CITIZENSHIP_INTRO = {
  key: sections.CITIZENSHIP_INTRO,
  name: 'intro',
  path: `${CITIZENSHIP.path}/intro`,
  label: i18n.t('citizenship.subsection.intro'),
}

export const CITIZENSHIP_STATUS = {
  key: sections.CITIZENSHIP_STATUS,
  name: 'status',
  path: `${CITIZENSHIP.path}/status`,
  storeKey: 'Status',
  label: i18n.t('citizenship.subsection.status'),
}

export const CITIZENSHIP_MULTIPLE = {
  key: sections.CITIZENSHIP_MULTIPLE,
  name: 'multiple',
  path: `${CITIZENSHIP.path}/multiple`,
  storeKey: 'Multiple',
  label: i18n.t('citizenship.subsection.multiple'),
}

export const CITIZENSHIP_PASSPORTS = {
  key: sections.CITIZENSHIP_PASSPORTS,
  name: 'passports',
  path: `${CITIZENSHIP.path}/passports`,
  storeKey: 'Passports',
  label: i18n.t('citizenship.subsection.passports'),
}

export const CITIZENSHIP_REVIEW = {
  key: sections.CITIZENSHIP_REVIEW,
  name: 'review',
  path: `${CITIZENSHIP.path}/review`,
  label: i18n.t('citizenship.subsection.review'),
}

export default {
  CITIZENSHIP,
  CITIZENSHIP_INTRO,
  CITIZENSHIP_STATUS,
  CITIZENSHIP_MULTIPLE,
  CITIZENSHIP_PASSPORTS,
  CITIZENSHIP_REVIEW
}
