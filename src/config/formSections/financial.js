import * as sections from '@constants/sections'
import { i18n } from '@config'

const FINANCIAL = {
  key: sections.FINANCIAL,
  name: 'financial',
  path: '/financial',
  store: 'Financial',
  label: i18n.t('financial.section.name')
}

const FINANCIAL_INTRO = {
  key: sections.FINANCIAL_INTRO,
  name: 'intro',
  path: `${FINANCIAL.path}/intro`,
  label: i18n.t('financial.subsection.intro')
}

const FINANCIAL_BANKRUPTCY = {
  key: sections.FINANCIAL_BANKRUPTCY,
  name: 'bankruptcy',
  path: `${FINANCIAL.path}/bankruptcy`,
  storeKey: 'Baankruptcy',
  label: i18n.t('financial.subsection.bankruptcy')
}

const FINANCIAL_GAMBLING = {
  key: sections.FINANCIAL_GAMBLING,
  name: 'gambling',
  path: `${FINANCIAL.path}/gambling`,
  storeKey: 'Gambling',
  label: i18n.t('financial.subsection.gambling')
}

const FINANCIAL_TAXES = {
  key: sections.FINANCIAL_TAXES,
  name: 'taxes',
  path: `${FINANCIAL.path}/taxes`,
  storeKey: 'Taxes',
  label: i18n.t('financial.subsection.taxes')
}

const FINANCIAL_CARD = {
  key: sections.FINANCIAL_CARD,
  name: 'card',
  path: `${FINANCIAL.path}/card`,
  storeKey: 'Card',
  label: i18n.t('financial.subsection.card')
}

const FINANCIAL_CREDIT = {
  key: sections.FINANCIAL_CREDIT,
  name: 'credit',
  path: `${FINANCIAL.path}/credit`,
  storeKey: 'Credit',
  label: i18n.t('financial.subsection.credit')
}

const FINANCIAL_DELINQUENT = {
  key: sections.FINANCIAL_DELINQUENT,
  name: 'delinquent',
  path: `${FINANCIAL.path}/delinquent`,
  storeKey: 'Delinquent',
  label: i18n.t('financial.subsection.delinquent')
}

const FINANCIAL_NONPAYMENT = {
  key: sections.FINANCIAL_NONPAYMENT,
  name: 'nonpayment',
  path: `${FINANCIAL.path}/nonpayment`,
  storeKey: 'Nonpayment',
  label: i18n.t('financial.subsection.nonpayment')
}

const FINANCIAL_REVIEW = {
  key: sections.FINANCIAL_REVIEW,
  name: 'review',
  path: `${FINANCIAL.path}/review`,
  storeKey: 'Review',
  label: i18n.t('financial.subsection.review')
}

export default {
  FINANCIAL,
  FINANCIAL_INTRO,
  FINANCIAL_BANKRUPTCY,
  FINANCIAL_GAMBLING,
  FINANCIAL_TAXES,
  FINANCIAL_CARD,
  FINANCIAL_CREDIT,
  FINANCIAL_DELINQUENT,
  FINANCIAL_NONPAYMENT,
  FINANCIAL_REVIEW
}
