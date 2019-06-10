/* eslint import/prefer-default-export: 0 */

export const CITIZEN = 'Citizen'
export const FOREIGN_BORN = 'ForeignBorn'
export const NATURALIZED = 'Naturalized'
export const DERIVED = 'Derived'
export const NOT_CITIZEN = 'NotCitizen'

export const citizenshipStatusOptions = [
  CITIZEN,
  FOREIGN_BORN,
  NATURALIZED,
  DERIVED,
  NOT_CITIZEN,
]

export const foreignBornDocumentTypes = [
  'FS-240',
  'DS-1350',
  'FS-545',
  'Other',
]

export const notCitizenDocumentTypes = [
  'I-94',
  'U.S. Visa',
  'I-20',
  'DS-2019',
  'Other',
]
