import * as sections from '@constants/sections'
import { i18n } from '@config'

const MILITARY = {
  key: sections.MILITARY,
  name: 'military',
  path: {
    section: 'military',
  },
  store: 'Military',
  label: i18n.t('military.section.name'),
}

const MILITARY_INTRO = {
  key: sections.MILITARY_INTRO,
  name: 'intro',
  path: {
    section: MILITARY.path.section,
    subsection: 'intro',
  },
  label: i18n.t('military.subsection.intro'),
}

const MILITARY_SELECTIVE = {
  key: sections.MILITARY_SELECTIVE,
  name: 'selective',
  path: {
    section: MILITARY.path.section,
    subsection: 'selective',
  },
  storeKey: 'Selective',
  label: i18n.t('military.subsection.selective'),
}

const MILITARY_HISTORY = {
  key: sections.MILITARY_HISTORY,
  name: 'history',
  path: {
    section: MILITARY.path.section,
    subsection: 'history',
  },
  storeKey: 'History',
  label: i18n.t('military.subsection.history'),
}

const MILITARY_DISCIPLINARY = {
  key: sections.MILITARY_DISCIPLINARY,
  name: 'disciplinary',
  path: {
    section: MILITARY.path.section,
    subsection: 'disciplinary',
  },
  storeKey: 'Disciplinary',
  label: i18n.t('military.subsection.disciplinary'),
}

const MILITARY_FOREIGN = {
  key: sections.MILITARY_FOREIGN,
  name: 'foreign',
  path: {
    section: MILITARY.path.section,
    subsection: 'foreign',
  },
  storeKey: 'Foreign',
  label: i18n.t('military.subsection.foreign'),
}

const MILITARY_REVIEW = {
  key: sections.MILITARY_REVIEW,
  name: 'review',
  path: {
    section: MILITARY.path.section,
    subsection: 'review',
  },
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
