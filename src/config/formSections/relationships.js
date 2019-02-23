import * as sections from '@constants/sections'
import { i18n } from '@config'

const RELATIONSHIPS = {
  key: sections.RELATIONSHIPS,
  name: 'relationships',
  path: {
    section: 'relationships',
  },
  store: 'Relationships',
  label: i18n.t('relationships.section.name'),
}

const RELATIONSHIPS_INTRO = {
  key: sections.RELATIONSHIPS_INTRO,
  name: 'intro',
  path: {
    section: RELATIONSHIPS.path.section,
    subsection: 'intro',
  },
  label: i18n.t('relationships.subsection.intro'),
}

const RELATIONSHIPS_STATUS = {
  key: sections.RELATIONSHIPS_STATUS,
  name: 'status',
  label: i18n.t('relationships.subsection.status'),
}

const RELATIONSHIPS_STATUS_MARITAL = {
  key: sections.RELATIONSHIPS_STATUS_MARITAL,
  name: 'marital',
  path: {
    section: RELATIONSHIPS.path.section,
    subsection: 'status/marital',
  },
  storeKey: 'Marital',
  label: i18n.t('relationships.subsection.marital'),
  parentKey: RELATIONSHIPS_STATUS.key,
}

const RELATIONSHIPS_STATUS_COHABITANTS = {
  key: sections.RELATIONSHIPS_STATUS_COHABITANTS,
  name: 'cohabitants',
  path: {
    section: RELATIONSHIPS.path.section,
    subsection: 'status/cohabitants',
  },
  storeKey: 'Cohabitants',
  label: i18n.t('relationships.subsection.cohabitants'),
  parentKey: RELATIONSHIPS_STATUS.key,
}

const RELATIONSHIPS_PEOPLE = {
  key: sections.RELATIONSHIPS_PEOPLE,
  name: 'people',
  path: {
    section: RELATIONSHIPS.path.section,
    subsection: 'people',
  },
  storeKey: 'People',
  label: i18n.t('relationships.subsection.people'),
}

const RELATIONSHIPS_RELATIVES = {
  key: sections.RELATIONSHIPS_RELATIVES,
  name: 'relatives',
  path: {
    section: RELATIONSHIPS.path.section,
    subsection: 'relatives',
  },
  storeKey: 'Relatives',
  label: i18n.t('relationships.subsection.relatives'),
}

const RELATIONSHIPS_REVIEW = {
  key: sections.RELATIONSHIPS_REVIEW,
  name: 'review',
  path: {
    section: RELATIONSHIPS.path.section,
    subsection: 'review',
  },
  label: i18n.t('relationships.subsection.review'),
}

export default {
  RELATIONSHIPS,
  RELATIONSHIPS_INTRO,
  RELATIONSHIPS_STATUS,
  RELATIONSHIPS_STATUS_MARITAL,
  RELATIONSHIPS_STATUS_COHABITANTS,
  RELATIONSHIPS_PEOPLE,
  RELATIONSHIPS_RELATIVES,
  RELATIONSHIPS_REVIEW,
}
