import * as sections from '@constants/sections'

const IDENTIFICATION = {
  key: sections.IDENTIFICATION,
  name: 'identification',
  path: '/identification',
  store: 'Identification',
}

const IDENTIFICATION_INTRO = {
  key: sections.IDENTIFICATION_INTRO,
  name: 'intro',
  path: `${IDENTIFICATION.path}/intro`,
}

const IDENTIFICATION_NAME = {
  key: sections.IDENTIFICATION_NAME,
  name: 'name',
  path: `${IDENTIFICATION.path}/name`,
  storeKey: 'ApplicantName',
}

const IDENTIFICATION_BIRTH_DATE = {
  key: sections.IDENTIFICATION_BIRTH_DATE,
  name: 'birthdate',
  path: `${IDENTIFICATION.path}/birthdate`,
  storeKey: 'ApplicantBirthDate',
}

const IDENTIFICATION_BIRTH_PLACE = {
  key: sections.IDENTIFICATION_BIRTH_PLACE,
  name: 'birthplace',
  path: `${IDENTIFICATION.path}/birthplace`,
  storeKey: 'ApplicantBirthPlace',
}

const IDENTIFICATION_SSN = {
  key: sections.IDENTIFICATION_SSN,
  name: 'ssn',
  path: `${IDENTIFICATION.path}/ssn`,
  storeKey: 'ApplicantSSN',
}

const IDENTIFICATION_OTHER_NAMES = {
  key: sections.IDENTIFICATION_OTHER_NAMES,
  name: 'othernames',
  path: `${IDENTIFICATION.path}/othernames`,
  storeKey: 'OtherNames',
}

const IDENTIFICATION_CONTACTS = {
  key: sections.IDENTIFICATION_CONTACTS,
  name: 'contacts',
  path: `${IDENTIFICATION.path}/contacts`,
  storeKey: 'Contacts',
}

const IDENTIFICATION_PHYSICAL = {
  key: sections.IDENTIFICATION_PHYSICAL,
  name: 'physical',
  path: `${IDENTIFICATION.path}/physical`,
  storeKey: 'Physical',
}

const IDENTIFICATION_REVIEW = {
  key: sections.IDENTIFICATION_REVIEW,
  name: 'review',
  path: `${IDENTIFICATION.path}/review`,
}

export default {
  IDENTIFICATION,
  IDENTIFICATION_INTRO,
  IDENTIFICATION_NAME,
  IDENTIFICATION_BIRTH_DATE,
  IDENTIFICATION_BIRTH_PLACE,
  IDENTIFICATION_SSN,
  IDENTIFICATION_OTHER_NAMES,
  IDENTIFICATION_CONTACTS,
  IDENTIFICATION_PHYSICAL,
  IDENTIFICATION_REVIEW,
}
