import { validate } from 'validate.js'
import { hasYesOrNo, checkValue, checkValueIncluded } from 'models/validate'
import name from 'models/shared/name'
import birthplaceWithoutCounty from 'models/shared/locations/birthplaceWithoutCounty'
import cityState from 'models/shared/locations/cityState'
import usAddress from 'models/shared/locations/usAddress'

import {
  FOREIGN_BORN,
  NATURALIZED,
  DERIVED,
  NOT_CITIZEN,
  citizenshipStatusOptions,
  foreignBornDocumentTypes,
  notCitizenDocumentTypes,
} from 'constants/enums/citizenshipOptions'

const valueIsEmpty = (data = {}) => !data.value || validate.isEmpty(data.value)

const nameIsEmpty = (data = {}) => {
  const {
    first, firstInitialOnly, middle, middleInitialOnly, last, suffix,
  } = data

  const fields = [
    first, firstInitialOnly, middle, middleInitialOnly, last, suffix,
  ]

  return fields.every(i => i === false || validate.isEmpty(i))
}

const dateIsEmpty = (data = {}) => {
  const { day, month, year } = data
  const fields = [day, month, year]
  return fields.every(i => validate.isEmpty(i))
}

const locationIsEmpty = (data = {}) => {
  const { country, city, state } = data

  return (validate.isEmpty(country) || valueIsEmpty(country))
    && validate.isEmpty(city)
    && validate.isEmpty(state)
}

export const certificateIsEmpty = (attributes) => {
  const { CertificateNumber, CertificateIssued, CertificateName } = attributes

  return nameIsEmpty(CertificateName)
    && dateIsEmpty(CertificateIssued)
    && valueIsEmpty(CertificateNumber)
}

export const documentationIsEmpty = (attributes) => {
  const {
    AbroadDocumentation, Explanation, DocumentNumber, DocumentIssued,
    PlaceIssued, DocumentName,
  } = attributes

  return valueIsEmpty(AbroadDocumentation)
    && valueIsEmpty(Explanation)
    && valueIsEmpty(DocumentNumber)
    && dateIsEmpty(DocumentIssued)
    && nameIsEmpty(DocumentName)
    && locationIsEmpty(PlaceIssued)
}

export const requireCertificateFields = attributes => (
  checkValue(attributes.CitizenshipStatus, FOREIGN_BORN)
    && (!certificateIsEmpty(attributes) || documentationIsEmpty(attributes))
)

export const requireDocumentationFields = attributes => (
  checkValue(attributes.CitizenshipStatus, FOREIGN_BORN)
   && (!documentationIsEmpty(attributes) || certificateIsEmpty(attributes))
)

/** Citizenship Status model */
const citizenshipStatus = {
  CitizenshipStatus: {
    presence: true,
    hasValue: { validator: { inclusion: citizenshipStatusOptions } },
  },
  BornOnMilitaryInstallation: (value, attributes) => {
    if (checkValue(attributes.CitizenshipStatus, FOREIGN_BORN)) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  MilitaryBase: (value, attributes) => {
    if (checkValue(attributes.BornOnMilitaryInstallation, 'Yes')) {
      return { presence: true, hasValue: true }
    }

    return {}
  },
  AbroadDocumentation: (value, attributes) => (
    requireDocumentationFields(attributes)
      ? {
        presence: true,
        hasValue: { validator: { inclusion: foreignBornDocumentTypes } },
      } : {}
  ),
  Explanation: (value, attributes) => (
    (checkValue(attributes.AbroadDocumentation, 'Other')
      || checkValue(attributes.Basis, 'Other')
      || checkValue(attributes.DocumentType, 'Other'))
      ? { presence: true, hasValue: true }
      : {}
  ),
  DocumentNumber: (value, attributes) => (
    (requireDocumentationFields(attributes)
      && !checkValue(attributes.AbroadDocumentation, 'Other'))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        hasValue: true,
      } : {}
  ),
  DocumentIssued: (value, attributes) => (
    (requireDocumentationFields(attributes)
      && !checkValue(attributes.AbroadDocumentation, 'Other'))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        date: true,
      } : {}
  ),
  PlaceIssued: (value, attributes) => (
    requireDocumentationFields(attributes)
      && !checkValue(attributes.AbroadDocumentation, 'Other')
      ? {
        presence: true,
        location: { validator: birthplaceWithoutCounty },
      } : {}
  ),
  DocumentName: (value, attributes) => (
    (requireDocumentationFields(attributes)
      && !checkValue(attributes.AbroadDocumentation, 'Other'))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        model: { validator: name },
      } : {}
  ),
  CertificateNumber: (value, attributes) => (
    (requireCertificateFields(attributes)
      || checkValue(attributes.CitizenshipStatus, NATURALIZED)
      || (checkValue(attributes.CitizenshipStatus, DERIVED)
        && !(attributes.AlienRegistrationNumber
          && attributes.AlienRegistrationNumber.value)
        && !(attributes.PermanentResidentCardNumber
          && attributes.PermanentResidentCardNumber.value)))
      ? { presence: true, hasValue: true }
      : {}
  ),
  CertificateIssued: (value, attributes) => (
    (requireCertificateFields(attributes)
      || checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, DERIVED]))
      ? { presence: true, date: true }
      : {}
  ),
  CertificateName: (value, attributes) => (
    (requireCertificateFields(attributes)
      || checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, DERIVED]))
      ? { presence: true, model: { validator: name } }
      : {}
  ),
  EntryDate: (value, attributes) => {
    if (checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, NOT_CITIZEN])) {
      return { presence: true, date: true }
    }

    return {}
  },
  EntryLocation: (value, attributes) => {
    if (checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, NOT_CITIZEN])) {
      return { presence: true, location: { validator: cityState } }
    }

    return {}
  },
  PriorCitizenship: (value, attributes) => {
    if (checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, NOT_CITIZEN])) {
      return {
        presence: true,
        hasValue: { validator: { length: { minimum: 1 } } },
      }
    }

    return {}
  },
  HasAlienRegistration: (value, attributes) => {
    if (checkValue(attributes.CitizenshipStatus, NATURALIZED)) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  AlienRegistrationNumber: (value, attributes) => {
    if (checkValue(attributes.HasAlienRegistration, 'Yes')
      || (checkValue(attributes.CitizenshipStatus, DERIVED)
      && !(attributes.PermanentResidentCardNumber && attributes.PermanentResidentCardNumber.value)
      && !(attributes.CertificateNumber && attributes.CertificateNumber.value))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  AlienRegistrationExpiration: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? { presence: true, date: true }
      : {}
  ),
  CertificateCourtName: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, NATURALIZED)
      ? { presence: true, hasValue: true }
      : {}
  ),
  CertificateCourtAddress: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, NATURALIZED)
      ? { presence: true, location: { validator: usAddress } }
      : {}
  ),
  Basis: (value, attributes) => (
    checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, DERIVED])
      ? { presence: true, hasValue: true }
      : {}
  ),
  PermanentResidentCardNumber: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, DERIVED)
      && !(attributes.AlienRegistrationNumber && attributes.AlienRegistrationNumber.value)
      && !(attributes.CertificateNumber && attributes.CertificateNumber.value)
      ? { presence: true, hasValue: true }
      : {}
  ),
  ResidenceStatus: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? { presence: true, hasValue: true }
      : {}
  ),
  DocumentType: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        hasValue: { validator: { inclusion: notCitizenDocumentTypes } },
      }
      : {}
  ),
  DocumentExpiration: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? { presence: true, date: true }
      : {}
  ),
}

export default citizenshipStatus
