import * as sections from '@constants/sections'
import { i18n } from '@config'

const HISTORY = {
  key: sections.HISTORY,
  name: 'history',
  path: '/history',
  store: 'History',
}

const HISTORY_INTRO = {
  key: sections.HISTORY_INTRO,
  name: 'intro',
  path: `${HISTORY.path}/intro`,
  label: i18n.t('history.subsections.intro')
}

const HISTORY_RESIDENCE = {
  key: sections.HISTORY_RESIDENCE,
  name: 'residence',
  path: `${HISTORY.path}/residence`,
  storeKey: 'Residence',
  label: i18n.t('history.subsections.residence')
}

const HISTORY_EMPLOYMENT = {
  key: sections.HISTORY_EMPLOYMENT,
  name: 'employment',
  path: `${HISTORY.path}/employment`,
  storeKey: 'Employment',
  label: i18n.t('history.subsections.employment')
}

const HISTORY_EDUCATION = {
  key: sections.HISTORY_EDUCATION,
  name: 'education',
  path: `${HISTORY.path}/education`,
  storeKey: 'Education',
  label: i18n.t('history.subsections.education')
}

const HISTORY_FEDERAL = {
  key: sections.HISTORY_FEDERAL,
  name: 'federal',
  path: `${HISTORY.path}/federal`,
  storeKey: 'Federal',
  label: i18n.t('history.subsections.federal')
}

const HISTORY_REVIEW = {
  key: sections.HISTORY_REVIEW,
  name: 'review',
  path: `${HISTORY.path}/review`,
  label: i18n.t('history.subsections.review')
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
