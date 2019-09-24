import * as sections from 'constants/sections'
import i18n from 'util/i18n'

export const MILITARY = {
  key: sections.MILITARY,
  name: 'military',
  path: 'military',
  store: 'Military',
  label: i18n.t('military.section.name'),
}

export const MILITARY_INTRO = {
  key: sections.MILITARY_INTRO,
  name: 'intro',
  path: 'intro',
  label: i18n.t('military.subsection.intro'),
}

export const MILITARY_SELECTIVE = {
  key: sections.MILITARY_SELECTIVE,
  name: 'selective',
  path: 'selective',
  storeKey: 'Selective',
  label: i18n.t('military.subsection.selective'),
}

export const MILITARY_HISTORY = {
  key: sections.MILITARY_HISTORY,
  name: 'history',
  path: 'history',
  storeKey: 'History',
  label: i18n.t('military.subsection.history'),
}

export const MILITARY_DISCIPLINARY = {
  key: sections.MILITARY_DISCIPLINARY,
  name: 'disciplinary',
  path: 'disciplinary',
  storeKey: 'Disciplinary',
  label: i18n.t('military.subsection.disciplinary'),
}

export const MILITARY_FOREIGN = {
  key: sections.MILITARY_FOREIGN,
  name: 'foreign',
  path: 'foreign',
  storeKey: 'Foreign',
  label: i18n.t('military.subsection.foreign'),
}

export const MILITARY_REVIEW = {
  key: sections.MILITARY_REVIEW,
  name: 'review',
  path: 'review',
  label: i18n.t('military.subsection.review'),
}

export default {
  MILITARY,
  MILITARY_INTRO,
  MILITARY_SELECTIVE,
  MILITARY_HISTORY,
  MILITARY_DISCIPLINARY,
  MILITARY_FOREIGN,
  MILITARY_REVIEW,
}
