import * as sections from '@constants/sections'
import { i18n } from '@config'

const SUBSTANCE_USE = {
  key: sections.SUBSTANCE_USE,
  name: 'substance',
  path: {
    section: 'substance',
  },
  store: 'Substance',
  label: i18n.t('substance.section.name'),
}

const SUBSTANCE_USE_INTRO = {
  key: sections.SUBSTANCE_USE_INTRO,
  name: 'intro',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'intro',
  },
  label: i18n.t('substance.subsection.intro'),
}

const SUBSTANCE_USE_DRUGS = {
  key: sections.SUBSTANCE_USE_DRUGS,
  name: 'drugs',
  label: i18n.t('substance.subsection.drugs.label'),
}

const SUBSTANCE_USE_DRUGS_USAGE = {
  key: sections.SUBSTANCE_USE_DRUGS_USAGE,
  name: 'usage',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'drugs/usage',
  },
  storeKey: 'DrugUses',
  label: i18n.t('substance.subsection.drugs.usage'),
  parentKey: SUBSTANCE_USE_DRUGS.key,
}

const SUBSTANCE_USE_DRUGS_PURCHASE = {
  key: sections.SUBSTANCE_USE_DRUGS_PURCHASE,
  name: 'purchase',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'drugs/purchase',
  },
  storeKey: 'DrugInvolvements',
  label: i18n.t('substance.subsection.drugs.purchase'),
  parentKey: SUBSTANCE_USE_DRUGS.key,
}

const SUBSTANCE_USE_DRUGS_CLEARANCE = {
  key: sections.SUBSTANCE_USE_DRUGS_CLEARANCE,
  name: 'clearance',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'drugs/clearance',
  },
  storeKey: 'DrugClearanceUses',
  label: i18n.t('substance.subsection.drugs.clearance'),
  parentKey: SUBSTANCE_USE_DRUGS.key,
}

const SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY = {
  key: sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
  name: 'publicsafety',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'drugs/publicsafety',
  },
  storeKey: 'DrugPublicSafetyUses',
  label: i18n.t('substance.subsection.drugs.publicsafety'),
  parentKey: SUBSTANCE_USE_DRUGS.key,
}

const SUBSTANCE_USE_DRUGS_MISUSE = {
  key: sections.SUBSTANCE_USE_DRUGS_MISUSE,
  name: 'misuse',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'drugs/misuse',
  },
  storeKey: 'PrescriptionUses',
  label: i18n.t('substance.subsection.drugs.misuse'),
  parentKey: SUBSTANCE_USE_DRUGS.key,
}

const SUBSTANCE_USE_DRUGS_ORDERED = {
  key: sections.SUBSTANCE_USE_DRUGS_ORDERED,
  name: 'ordered',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'drugs/misuse',
  },
  storeKey: 'OrderedTreatments',
  label: i18n.t('substance.subsection.drugs.ordered'),
  parentKey: SUBSTANCE_USE_DRUGS.key,
}

const SUBSTANCE_USE_DRUGS_VOLUNTARY = {
  key: sections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
  name: 'voluntary',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'drugs/volutary',
  },
  storeKey: 'VoluntaryTreatments',
  label: i18n.t('substance.subsection.drugs.voluntary'),
  parentKey: SUBSTANCE_USE_DRUGS.key,
}

const SUBSTANCE_USE_ALCOHOL = {
  key: sections.SUBSTANCE_USE_ALCOHOL,
  name: 'alcohol',
  label: i18n.t('substance.subsection.alcohol.label'),
}

const SUBSTANCE_USE_ALCOHOL_NEGATIVE = {
  key: sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE,
  name: 'negative',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'alcohol/negative',
  },
  storeKey: 'NegativeImpact',
  label: i18n.t('substance.subsection.alcohol.negative'),
  parentKey: SUBSTANCE_USE_ALCOHOL.key,
}

const SUBSTANCE_USE_ALCOHOL_ORDERED = {
  key: sections.SUBSTANCE_USE_ALCOHOL_ORDERED,
  name: 'ordered',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'alcohol/ordered',
  },
  storeKey: 'OrderedCounselings',
  label: i18n.t('substance.subsection.alcohol.ordered'),
  parentKey: SUBSTANCE_USE_ALCOHOL.key,
}

const SUBSTANCE_USE_ALCOHOL_VOLUNTARY = {
  key: sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
  name: 'voluntary',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'alcohol/voluntary',
  },
  storeKey: 'VoluntaryCounselings',
  label: i18n.t('substance.subsection.alcohol.voluntary'),
  parentKey: SUBSTANCE_USE_ALCOHOL.key,
}

const SUBSTANCE_USE_ALCOHOL_ADDITIONAL = {
  key: sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
  name: 'additional',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'alcohol/additional',
  },
  storeKey: 'ReceivedCounselings',
  label: i18n.t('substance.subsection.alcohol.additional'),
  parentKey: SUBSTANCE_USE_ALCOHOL.key,
}

const SUBSTANCE_USE_REVIEW = {
  key: sections.SUBSTANCE_USE_REVIEW,
  name: 'review',
  path: {
    section: SUBSTANCE_USE.path.section,
    subsection: 'review',
  },
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
