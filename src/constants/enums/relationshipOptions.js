// Marital Statuses
const NEVER_MARRIED = 'NeverMarried'
export const MARRIED = 'Married'
export const SEPARATED = 'Separated'
const ANNULLED = 'Annulled'
const DIVORCED = 'Divorced'
const WIDOWED = 'Widowed'

// Relatives
export const MOTHER = 'Mother'
export const FATHER = 'Father'
const STEPMOTHER = 'Stepmother'
const STEPFATHER = 'Stepfather'
const FOSTER_PARENT = 'Fosterparent'
const CHILD = 'Child'
const STEPCHILD = 'Stepchild'
const BROTHER = 'Brother'
const SISTER = 'Sister'
const STEPBROTHER = 'Stepbrother'
const STEPSISTER = 'Stepsister'
const HALF_BROTHER = 'Half-brother'
const HALF_SISTER = 'Half-sister'
export const FATHER_IN_LAW = 'Father-in-law'
export const MOTHER_IN_LAW = 'Mother-in-law'
const GUARDIAN = 'Guardian'

export const marriedOptions = [
  MARRIED,
  SEPARATED,
]

export const previouslyMarriedOptions = [
  ANNULLED,
  DIVORCED,
  WIDOWED,
]

export const maritalStatusOptions = [
  NEVER_MARRIED,
  MARRIED,
  SEPARATED,
  ANNULLED,
  DIVORCED,
  WIDOWED,
]

export const relationshipOptions = [
  'Neighbor',
  'Friend',
  'WorkAssociate',
  'Schoolmate',
  'Other',
]

export const immedateFamilyOptions = [
  MOTHER, FATHER, STEPMOTHER, STEPFATHER, CHILD, STEPCHILD, BROTHER, SISTER,
  STEPBROTHER, STEPSISTER, HALF_BROTHER, HALF_SISTER,
]

export const relativeOptions = [
  MOTHER, FATHER, STEPMOTHER, STEPFATHER, FOSTER_PARENT, CHILD, STEPCHILD,
  BROTHER, SISTER, STEPBROTHER, STEPSISTER, HALF_BROTHER, HALF_SISTER,
  FATHER_IN_LAW, MOTHER_IN_LAW, GUARDIAN,
]

export const relativeCitizenshipDocumentationOptions = [
  'FS', 'DS', 'NaturalizedAlien', 'NaturalizedPermanent',
  'NaturalizedCertificate', 'DerivedAlien', 'DerivedPermanent',
  'DerivedCertificate', 'Other',
]

export const relativeResidentDocumentationOptions = [
  'Permanent', 'Employment', 'Arrival', 'Visa', 'F1', 'J1', 'Other',
]
