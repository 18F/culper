import * as sections from 'constants/sections'
import { i18n } from 'config'

export const HISTORY = {
  key: sections.HISTORY,
  name: 'history',
  path: 'history',
  store: 'History',
  label: i18n.t('history.section.name'),
}

export const HISTORY_INTRO = {
  key: sections.HISTORY_INTRO,
  name: 'intro',
  path: 'intro',
  label: i18n.t('history.subsection.intro'),
}

export const HISTORY_RESIDENCE = {
  key: sections.HISTORY_RESIDENCE,
  name: 'residence',
  path: 'residence',
  storeKey: 'Residence',
  label: i18n.t('history.subsection.residence'),
}

export const HISTORY_EMPLOYMENT = {
  key: sections.HISTORY_EMPLOYMENT,
  name: 'employment',
  path: 'employment',
  storeKey: 'Employment',
  label: i18n.t('history.subsection.employment'),
}

export const HISTORY_EDUCATION = {
  key: sections.HISTORY_EDUCATION,
  name: 'education',
  path: 'education',
  storeKey: 'Education',
  label: i18n.t('history.subsection.education'),
}

export const HISTORY_FEDERAL = {
  key: sections.HISTORY_FEDERAL,
  name: 'federal',
  path: 'federal',
  storeKey: 'Federal',
  label: i18n.t('history.subsection.federal'),
}

export const HISTORY_REVIEW = {
  key: sections.HISTORY_REVIEW,
  name: 'review',
  path: 'review',
  label: i18n.t('history.subsection.review'),
}

export default {
  HISTORY,
  HISTORY_INTRO,
  HISTORY_RESIDENCE,
  HISTORY_EMPLOYMENT,
  HISTORY_EDUCATION,
  HISTORY_FEDERAL,
  HISTORY_REVIEW,
}
