import * as sections from '@constants/sections'

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
}

const HISTORY_RESIDENCE = {
  key: sections.HISTORY_RESIDENCE,
  name: 'residence',
  path: `${HISTORY.path}/residence`,
  storeKey: 'Residence',
}

const HISTORY_EMPLOYMENT = {
  key: sections.HISTORY_EMPLOYMENT,
  name: 'employment',
  path: `${HISTORY.path}/employment`,
  storeKey: 'Employment',
}

const HISTORY_EDUCATION = {
  key: sections.HISTORY_EDUCATION
  name: 'education',
  path: `${HISTORY.path}/education`,
  storeKey: 'Education',
}

const HISTORY_FEDERAL = {
  key: sections.HISTORY_FEDERAL,
  name: 'federal',
  path: `${HISTORY.path}/federal`,
  storeKey: 'Federal',
}

const HISTORY_REVIEW = {
  key: sections.HISTORY_REVIEW,
  name: 'review',
  path: `${HISTORY.path}/review`,
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
