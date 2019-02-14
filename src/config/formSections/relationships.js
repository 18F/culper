import * as sections from '@constants/sections'
import { i18n } from '@config'

const RELATIONSHIPS = {
  key: sections.RELATIONSHIPS,
  name: 'relationships',
  path: '/relationships',
  store: 'Relationships',
}

const RELATIONSHIPS_INTRO = {
  key: sections.RELATIONSHIPS_INTRO,
  name: 'intro',
  path: `${RELATIONSHIPS.path}/intro`,
  label: i18n.t('relationships.subsections.intro')
}

const RELATIONSHIPS_STATUS = {
  key: sections.RELATIONSHIPS_STATUS,
  name: 'status',
  label: i18n.t('relationships.subsections.status')
}

const RELATIONSHIPS_STATUS_MARITAL = {
  key: sections.RELATIONSHIPS_STATUS_MARITAL,
  name: 'marital',
  path: `${RELATIONSHIPS_STATUS.path}/marital`,
  storeKey: 'Marital',
  label: i18n.t('relationships.subsections.marital')
}

const RELATIONSHIPS_STATUS_COHABITANTS = {
  key: sections.RELATIONSHIPS_STATUS_COHABITANTS,
  name: 'cohabitants',
  path: `${RELATIONSHIPS_STATUS.path}/cohabitants`,
  storeKey: 'Cohabitants',
  label: i18n.t('relationships.subsections.cohabitants')
}

const RELATIONSHIPS_PEOPLE = {
  key: sections.RELATIONSHIPS_PEOPLE,
  name: 'people',
  path: `${RELATIONSHIPS.path}/people`,
  storeKey: 'People',
  label: i18n.t('relationships.subsections.people')
}

const RELATIONSHIPS_RELATIVES = {
  key: sections.RELATIONSHIPS_RELATIVES,
  name: 'relatives',
  path: `${RELATIONSHIPS.path}/relatives`,
  storeKey: 'Relatives',
  label: i18n.t('relationships.subsections.relatives')
}

const RELATIONSHIPS_REVIEW = {
  key: sections.RELATIONSHIPS_REVIEW,
  name: 'review',
  path: `${RELATIONSHIPS.path}/review`,
  label: i18n.t('relationships.subsections.review')
}

export default {
  RELATIONSHIPS,
  RELATIONSHIPS_INTRO,
  RELATIONSHIPS_STATUS,
  RELATIONSHIPS_STATUS_MARITAL,
  RELATIONSHIPS_STATUS_COHABITANTS,
  RELATIONSHIPS_PEOPLE,
  RELATIONSHIPS_RELATIVES,
  RELATIONSHIPS_REVIEW
}
