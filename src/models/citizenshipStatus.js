import {
  hasYesOrNo, checkValue, checkValueIncluded, valueIsEmpty, nameIsEmpty,
  dateIsEmpty, locationIsEmpty,
} from 'models/validate'
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
import { DEFAULT_LATEST } from 'constants/dateLimits'

/** Helper functions */
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

export const requireCertificateFields = (attributes, options = {}) => (
  options.requireForeignBornDocumentation
    && checkValue(attributes.CitizenshipStatus, FOREIGN_BORN)
    && (!certificateIsEmpty(attributes) || documentationIsEmpty(attributes))
)

export const requireDocumentationFields = (attributes, options = {}) => (
  options.requireForeignBornDocumentation
    && checkValue(attributes.CitizenshipStatus, FOREIGN_BORN)
    && (!documentationIsEmpty(attributes) || certificateIsEmpty(attributes))
)

/** Citizenship Status model */
const citizenshipStatus = {
  CitizenshipStatus: {
    presence: true,
    hasValue: { validator: { inclusion: citizenshipStatusOptions } },
  },
  BornOnMilitaryInstallation: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, FOREIGN_BORN)
      ? {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      } : {}
  ),
  MilitaryBase: (value, attributes) => (
    checkValue(attributes.BornOnMilitaryInstallation, 'Yes')
      ? { presence: true, hasValue: true }
      : {}
  ),
  AbroadDocumentation: (value, attributes, attributeName, options) => (
    requireDocumentationFields(attributes, options)
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
  DocumentNumber: (value, attributes, attributeName, options) => (
    (requireDocumentationFields(attributes, options)
      && !checkValue(attributes.AbroadDocumentation, 'Other'))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        hasValue: true,
      } : {}
  ),
  DocumentIssued: (value, attributes, attributeName, options = {}) => (
    (requireDocumentationFields(attributes, options)
      && !checkValue(attributes.AbroadDocumentation, 'Other'))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        date: { earliest: options.applicantBirthdate, latest: DEFAULT_LATEST },
      } : {}
  ),
  PlaceIssued: (value, attributes, attributeName, options) => (
    requireDocumentationFields(attributes, options)
      && !checkValue(attributes.AbroadDocumentation, 'Other')
      ? {
        presence: true,
        location: { validator: birthplaceWithoutCounty },
      } : {}
  ),
  DocumentName: (value, attributes, attributeName, options) => (
    (requireDocumentationFields(attributes, options)
      && !checkValue(attributes.AbroadDocumentation, 'Other'))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        model: { validator: name },
      } : {}
  ),
  CertificateNumber: (value, attributes, attributeName, options) => (
    (requireCertificateFields(attributes, options)
      || checkValue(attributes.CitizenshipStatus, NATURALIZED)
      || (checkValue(attributes.CitizenshipStatus, DERIVED)
        && !(attributes.AlienRegistrationNumber
          && attributes.AlienRegistrationNumber.value)
        && !(attributes.PermanentResidentCardNumber
          && attributes.PermanentResidentCardNumber.value)))
      ? { presence: true, hasValue: true }
      : {}
  ),
  CertificateIssued: (value, attributes, attributeName, options = {}) => (
    (requireCertificateFields(attributes, options)
      || checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, DERIVED]))
      ? { presence: true, date: { earliest: options.applicantBirthdate, latest: DEFAULT_LATEST } }
      : {}
  ),
  CertificateName: (value, attributes, attributeName, options) => (
    (requireCertificateFields(attributes, options)
      || checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, DERIVED]))
      ? { presence: true, model: { validator: name } }
      : {}
  ),
  EntryDate: (value, attributes, attributeName, options = {}) => (
    checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, NOT_CITIZEN])
      ? { presence: true, date: { earliest: options.applicantBirthdate, latest: DEFAULT_LATEST } }
      : {}
  ),
  EntryLocation: (value, attributes) => (
    checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, NOT_CITIZEN])
      ? { presence: true, location: { validator: cityState } }
      : {}
  ),
  PriorCitizenship: (value, attributes) => (
    checkValueIncluded(attributes.CitizenshipStatus, [NATURALIZED, NOT_CITIZEN])
      ? {
        presence: true,
        country: true,
      }
      : {}
  ),
  HasAlienRegistration: (value, attributes) => (
    checkValue(attributes.CitizenshipStatus, NATURALIZED)
      ? {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      } : {}
  ),
  AlienRegistrationNumber: (value, attributes) => (
    checkValue(attributes.HasAlienRegistration, 'Yes')
      || (checkValue(attributes.CitizenshipStatus, DERIVED)
      && !(attributes.PermanentResidentCardNumber && attributes.PermanentResidentCardNumber.value)
      && !(attributes.CertificateNumber && attributes.CertificateNumber.value))
      || checkValue(attributes.CitizenshipStatus, NOT_CITIZEN)
      ? {
        presence: true,
        hasValue: true,
      } : {}
  ),
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
