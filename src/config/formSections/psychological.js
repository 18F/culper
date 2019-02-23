import * as sections from '@constants/sections'
import { i18n } from '@config'

const PSYCHOLOGICAL = {
  key: sections.PSYCHOLOGICAL,
  name: 'psychological',
  path: {
    section: 'psychological',
  },
  store: 'Psychological',
  label: i18n.t('psychological.section.name'),
}

const PSYCHOLOGICAL_INTRO = {
  key: sections.PSYCHOLOGICAL_INTRO,
  name: 'intro',
  path: {
    section: PSYCHOLOGICAL.path.section,
    subsection: 'intro',
  },
  label: i18n.t('psychological.subsection.intro'),
}

const PSYCHOLOGICAL_COMPETENCE = {
  key: sections.PSYCHOLOGICAL_COMPETENCE,
  name: 'competence',
  path: {
    section: PSYCHOLOGICAL.path.section,
    subsection: 'competence',
  },
  storeKey: 'Competence',
  label: i18n.t('psychological.subsection.competence'),
}

const PSYCHOLOGICAL_CONSULTATIONS = {
  key: sections.PSYCHOLOGICAL_CONSULTATIONS,
  name: 'consultations',
  path: {
    section: PSYCHOLOGICAL.path.section,
    subsection: 'consultations',
  },
  storeKey: 'Consultations',
  label: i18n.t('psychological.subsection.consultations'),
}
const PSYCHOLOGICAL_HOSPITALIZATIONS = {
  key: sections.PSYCHOLOGICAL_HOSPITALIZATIONS,
  name: 'hospitalizations',
  path: {
    section: PSYCHOLOGICAL.path.section,
    subsection: 'hospitalizations',
  },
  storeKey: 'Hospitalizations',
  label: i18n.t('psychological.subsection.hospitalizations'),
}

const PSYCHOLOGICAL_DIAGNOSES = {
  key: sections.PSYCHOLOGICAL_DIAGNOSES,
  name: 'diagnoses',
  path: {
    section: PSYCHOLOGICAL.path.section,
    subsection: 'diagnoses',
  },
  storeKey: 'Diagnoses',
  label: i18n.t('psychological.subsection.diagnoses'),
}

const PSYCHOLOGICAL_CONDITIONS = {
  key: sections.PSYCHOLOGICAL_CONDITIONS,
  name: 'conditions',
  path: {
    section: PSYCHOLOGICAL.path.section,
    subsection: 'conditions',
  },
  storeKey: 'Conditions',
  label: i18n.t('psychological.subsection.conditions'),
}

const PSYCHOLOGICAL_REVIEW = {
  key: sections.PSYCHOLOGICAL_REVIEW,
  name: 'review',
  path: {
    section: PSYCHOLOGICAL.path.section,
    subsection: 'review',
  },
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
