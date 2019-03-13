import * as sections from 'constants/sections'
import { i18n } from 'config'

export const PSYCHOLOGICAL = {
  key: sections.PSYCHOLOGICAL,
  name: 'psychological',
  path: 'psychological',
  store: 'Psychological',
  label: i18n.t('psychological.section.name'),
}

export const PSYCHOLOGICAL_INTRO = {
  key: sections.PSYCHOLOGICAL_INTRO,
  name: 'intro',
  path: 'intro',
  label: i18n.t('psychological.subsection.intro'),
}

export const PSYCHOLOGICAL_COMPETENCE = {
  key: sections.PSYCHOLOGICAL_COMPETENCE,
  name: 'competence',
  path: 'competence',
  storeKey: 'Competence',
  label: i18n.t('psychological.subsection.competence'),
}

export const PSYCHOLOGICAL_CONSULTATIONS = {
  key: sections.PSYCHOLOGICAL_CONSULTATIONS,
  name: 'consultation',
  path: 'consultations',
  storeKey: 'Consultations',
  label: i18n.t('psychological.subsection.consultations'),
}
export const PSYCHOLOGICAL_HOSPITALIZATIONS = {
  key: sections.PSYCHOLOGICAL_HOSPITALIZATIONS,
  name: 'hospitalization',
  path: 'hospitalizations',
  storeKey: 'Hospitalizations',
  label: i18n.t('psychological.subsection.hospitalizations'),
}

export const PSYCHOLOGICAL_DIAGNOSES = {
  key: sections.PSYCHOLOGICAL_DIAGNOSES,
  name: 'diagnoses',
  path: 'diagnoses',
  storeKey: 'Diagnoses',
  label: i18n.t('psychological.subsection.diagnoses'),
}

export const PSYCHOLOGICAL_CONDITIONS = {
  key: sections.PSYCHOLOGICAL_CONDITIONS,
  name: 'existingConditions',
  path: 'conditions',
  storeKey: 'Conditions',
  label: i18n.t('psychological.subsection.conditions'),
}

export const PSYCHOLOGICAL_REVIEW = {
  key: sections.PSYCHOLOGICAL_REVIEW,
  name: 'review',
  path: 'review',
  label: i18n.t('psychological.subsection.review'),
}

export default {
  PSYCHOLOGICAL,
  PSYCHOLOGICAL_INTRO,
  PSYCHOLOGICAL_COMPETENCE,
  PSYCHOLOGICAL_CONSULTATIONS,
  PSYCHOLOGICAL_HOSPITALIZATIONS,
  PSYCHOLOGICAL_DIAGNOSES,
  PSYCHOLOGICAL_CONDITIONS,
  PSYCHOLOGICAL_REVIEW,
}
