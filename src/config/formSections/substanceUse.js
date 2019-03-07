import * as sections from 'constants/sections'
import { i18n } from 'config'

export const SUBSTANCE_USE = {
  key: sections.SUBSTANCE_USE,
  name: 'substance',
  path: 'substance',
  store: 'Substance',
  label: i18n.t('substance.section.name'),
}

export const SUBSTANCE_USE_INTRO = {
  key: sections.SUBSTANCE_USE_INTRO,
  name: 'intro',
  path: 'intro',
  label: i18n.t('substance.subsection.intro'),
}

export const SUBSTANCE_USE_DRUGS = {
  key: sections.SUBSTANCE_USE_DRUGS,
  name: 'drugs',
  path: 'drugs',
  label: i18n.t('substance.subsection.drugs.label'),
}

export const SUBSTANCE_USE_DRUGS_USAGE = {
  key: sections.SUBSTANCE_USE_DRUGS_USAGE,
  name: 'usage',
  path: 'usage',
  storeKey: 'DrugUses',
  label: i18n.t('substance.subsection.drugs.usage'),
}

export const SUBSTANCE_USE_DRUGS_PURCHASE = {
  key: sections.SUBSTANCE_USE_DRUGS_PURCHASE,
  name: 'purchase',
  path: 'purchase',
  storeKey: 'DrugInvolvements',
  label: i18n.t('substance.subsection.drugs.purchase'),
}

export const SUBSTANCE_USE_DRUGS_CLEARANCE = {
  key: sections.SUBSTANCE_USE_DRUGS_CLEARANCE,
  name: 'clearance',
  path: 'clearance',
  storeKey: 'DrugClearanceUses',
  label: i18n.t('substance.subsection.drugs.clearance'),
}

export const SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY = {
  key: sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
  name: 'publicsafety',
  path: 'publicsafety',
  storeKey: 'DrugPublicSafetyUses',
  label: i18n.t('substance.subsection.drugs.publicsafety'),
}

export const SUBSTANCE_USE_DRUGS_MISUSE = {
  key: sections.SUBSTANCE_USE_DRUGS_MISUSE,
  name: 'misuse',
  path: 'misuse',
  storeKey: 'PrescriptionUses',
  label: i18n.t('substance.subsection.drugs.misuse'),
}

export const SUBSTANCE_USE_DRUGS_ORDERED = {
  key: sections.SUBSTANCE_USE_DRUGS_ORDERED,
  name: 'ordered',
  path: 'ordered',
  storeKey: 'OrderedTreatments',
  label: i18n.t('substance.subsection.drugs.ordered'),
}

export const SUBSTANCE_USE_DRUGS_VOLUNTARY = {
  key: sections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
  name: 'voluntary',
  path: 'voluntary',
  storeKey: 'VoluntaryTreatments',
  label: i18n.t('substance.subsection.drugs.voluntary'),
}

export const SUBSTANCE_USE_ALCOHOL = {
  key: sections.SUBSTANCE_USE_ALCOHOL,
  name: 'alcohol',
  path: 'alcohol',
  label: i18n.t('substance.subsection.alcohol.label'),
}

export const SUBSTANCE_USE_ALCOHOL_NEGATIVE = {
  key: sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE,
  name: 'negative',
  path: 'negative',
  storeKey: 'NegativeImpact',
  label: i18n.t('substance.subsection.alcohol.negative'),
}

export const SUBSTANCE_USE_ALCOHOL_ORDERED = {
  key: sections.SUBSTANCE_USE_ALCOHOL_ORDERED,
  name: 'ordered',
  path: 'ordered',
  storeKey: 'OrderedCounselings',
  label: i18n.t('substance.subsection.alcohol.ordered'),
}

export const SUBSTANCE_USE_ALCOHOL_VOLUNTARY = {
  key: sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
  name: 'voluntary',
  path: 'voluntary',
  storeKey: 'VoluntaryCounselings',
  label: i18n.t('substance.subsection.alcohol.voluntary'),
}

export const SUBSTANCE_USE_ALCOHOL_ADDITIONAL = {
  key: sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
  name: 'additional',
  path: 'additional',
  storeKey: 'ReceivedCounselings',
  label: i18n.t('substance.subsection.alcohol.additional'),
}

export const SUBSTANCE_USE_REVIEW = {
  key: sections.SUBSTANCE_USE_REVIEW,
  name: 'review',
  path: 'review',
  label: i18n.t('substance.subsection.review'),
}

export default {
  SUBSTANCE_USE,
  SUBSTANCE_USE_INTRO,
  SUBSTANCE_USE_DRUGS,
  SUBSTANCE_USE_DRUGS_USAGE,
  SUBSTANCE_USE_DRUGS_PURCHASE,
  SUBSTANCE_USE_DRUGS_CLEARANCE,
  SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
  SUBSTANCE_USE_DRUGS_MISUSE,
  SUBSTANCE_USE_DRUGS_ORDERED,
  SUBSTANCE_USE_DRUGS_VOLUNTARY,
  SUBSTANCE_USE_ALCOHOL,
  SUBSTANCE_USE_ALCOHOL_NEGATIVE,
  SUBSTANCE_USE_ALCOHOL_ORDERED,
  SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
  SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
  SUBSTANCE_USE_REVIEW,
}
