import _ from 'lodash'
import NameValidator from './name'
import LocationValidator from './location'
import { validGenericTextfield, validDateField } from './helpers'

const validCitizenships = arr => !!arr && arr.length > 0

export const validateAbroadDocumentation = ({ abroadDocumentation, explanation }) => (
  !!abroadDocumentation
    && ['FS-240', 'DS-1350', 'FS-545', 'Other'].includes(
      abroadDocumentation
    )
    && (abroadDocumentation !== 'Other'
      || (abroadDocumentation === 'Other'
        && validGenericTextfield(explanation)))
)

export const validateBornOnMilitaryInstallation = ({
  bornOnMilitaryInstallation,
  militaryBase,
}) => !!bornOnMilitaryInstallation
      && (bornOnMilitaryInstallation === 'No'
        || (bornOnMilitaryInstallation === 'Yes'
          && validGenericTextfield(militaryBase)))

export const validateDocumentation = ({
  abroadDocumentation,
  explanation,
  documentNumber,
  documentIssued,
  placeIssued,
  documentName,
}) => {
  if (abroadDocumentation === 'Other' && validateAbroadDocumentation({ abroadDocumentation, explanation })) {
    return validateAbroadDocumentation({ abroadDocumentation, explanation })
  } else {
    return validateAbroadDocumentation({ abroadDocumentation, explanation })
      && validGenericTextfield(documentNumber)
      && validDateField(documentIssued)
      && new LocationValidator(placeIssued).isValid()
      && new NameValidator(documentName).isValid()
  }
}

export const validateCertificate = ({
  certificateNumber,
  certificateIssued,
  certificateName,
}) => {
  return validGenericTextfield(certificateNumber)
    && validDateField(certificateIssued)
    && new NameValidator(certificateName).isValid() }

export const isCertificatePartial = ({ certificateNumber, certificateIssued, certificateName }) => {
  if (certificateNumber && !_.isEmpty(certificateNumber.value)) {
    return !validateCertificate({ certificateNumber, certificateIssued, certificateName })
  } if (certificateIssued && (
    !_.isEmpty(certificateIssued.day)
    || !_.isEmpty(certificateIssued.month)
    || !_.isEmpty(certificateIssued.year))
  ) {
    return !validateCertificate({ certificateNumber, certificateIssued, certificateName })
  } if (certificateName && (
    !_.isEmpty(certificateName.first)
    || certificateName.firstInitialOnly
    || !_.isEmpty(certificateName.middle)
    || certificateName.middleInitialOnly
    || certificateName.noMiddleName
    || !_.isEmpty(certificateName.last)
    || !_.isEmpty(certificateName.suffix))
  ) {
    return !validateCertificate({ certificateNumber, certificateIssued, certificateName })
  }
  return false
}

export const isDocumentationPartial = ({
  abroadDocumentation, explanation, documentNumber, documentIssued, placeIssued, documentName,
}) => {
  if (!_.isEmpty(abroadDocumentation)) {
    return !validateDocumentation({
      abroadDocumentation, explanation, documentNumber, documentIssued, placeIssued, documentName,
    })
  } if (explanation && !_.isEmpty(explanation.value)) {
    return !validateDocumentation({
      abroadDocumentation, explanation, documentNumber, documentIssued, placeIssued, documentName,
    })
  } if (documentNumber && !_.isEmpty(documentNumber.value)) {
    return !validateDocumentation({
      abroadDocumentation, explanation, documentNumber, documentIssued, placeIssued, documentName,
    })
  } if (documentIssued && (
    !_.isEmpty(documentIssued.day)
    || !_.isEmpty(documentIssued.month)
    || !_.isEmpty(documentIssued.year))
  ) {
    return !validateDocumentation({
      abroadDocumentation, explanation, documentNumber, documentIssued, placeIssued, documentName,
    })
  } if (documentName && (
    !_.isEmpty(documentName.first)
    || documentName.firstInitialOnly
    || !_.isEmpty(documentName.middle)
    || documentName.middleInitialOnly
    || documentName.noMiddleName
    || !_.isEmpty(documentName.last)
    || !_.isEmpty(documentName.suffix))
  ) {
    return !validateDocumentation({
      abroadDocumentation, explanation, documentNumber, documentIssued, placeIssued, documentName,
    })
  } if (!_.isEmpty(placeIssued) && (
    !_.isEmpty(placeIssued.country)
    || !_.isEmpty(placeIssued.country.value)
    || !_.isEmpty(placeIssued.city)
    || !_.isEmpty(placeIssued.state))
  ) {
    return !validateDocumentation({
      abroadDocumentation, explanation, documentNumber, documentIssued, placeIssued, documentName,
    })
  }
  return false
}

export const validateForeignBorn = (data) => {
  const { citizenshipStatus } = data
  if (citizenshipStatus !== 'ForeignBorn') {
    return true
  }

  return (
    (
      (!isCertificatePartial(data) && validateDocumentation(data))
      || (!isDocumentationPartial(data) && validateCertificate(data))
    )
    && validateBornOnMilitaryInstallation(data)
  )
}

export const isCertificateRequired = (data) => {
  return !(!isCertificatePartial(data) && validateDocumentation(data))
}

export const isDocumentRequired = (data) => {
  return !(!isDocumentationPartial(data) && validateCertificate(data))
}

export default class CitizenshipValidator {
  constructor(data = {}) {
    this.citizenshipStatus = (data.CitizenshipStatus || {}).value
    this.abroadDocumentation = (data.AbroadDocumentation || {}).value
    this.explanation = data.Explanation || {}
    this.documentNumber = data.DocumentNumber || {}
    this.documentIssued = data.DocumentIssued
    this.documentName = data.DocumentName
    this.documentExpiration = data.DocumentExpiration
    this.documentType = (data.DocumentType || {}).value
    this.placeIssued = data.PlaceIssued
    this.certificateNumber = data.CertificateNumber || {}
    this.certificateIssued = data.CertificateIssued
    this.certificateName = data.CertificateName
    this.certificateCourtName = data.CertificateCourtName || {}
    this.certificateCourtAddress = data.CertificateCourtAddress
    this.bornOnMilitaryInstallation = (
      data.BornOnMilitaryInstallation || {}
    ).value
    this.militaryBase = data.MilitaryBase || {}
    this.entryDate = data.EntryDate
    this.entryLocation = data.EntryLocation
    this.priorCitizenship = (data.PriorCitizenship || {}).value
    this.hasAlienRegistration = (data.HasAlienRegistration || {}).value
    this.alienRegistrationNumber = data.AlienRegistrationNumber || {}
    this.alienRegistrationExpiration = data.AlienRegistrationExpiration
    this.basis = (data.Basis || {}).value
    this.permanentResidentCardNumber = data.PermanentResidentCardNumber || {}
    this.residenceStatus = data.ResidenceStatus
  }

  validCitizenshipStatus() {
    return (
      !!this.citizenshipStatus
      && [
        'Citizen',
        'ForeignBorn',
        'Naturalized',
        'Derived',
        'NotCitizen',
      ].includes(this.citizenshipStatus)
    )
  }

  validForeignBorn() {
    return validateForeignBorn(this)
  }

  validNaturalized() {
    if (this.citizenshipStatus !== 'Naturalized') {
      return true
    }

    return (
      validDateField(this.entryDate)
      && new LocationValidator(this.entryLocation).isValid()
      && validCitizenships(this.priorCitizenship)
      && this.validAlienRegistration()
      && validGenericTextfield(this.certificateNumber)
      && validGenericTextfield(this.certificateCourtName)
      && new LocationValidator(this.certificateCourtAddress).isValid()
      && validDateField(this.certificateIssued)
      && new NameValidator(this.certificateName).isValid()
      && this.validBasis()
    )
  }

  validDerived() {
    if (this.citizenshipStatus !== 'Derived') {
      return true
    }

    return (
      (validGenericTextfield(this.alienRegistrationNumber)
      || validGenericTextfield(this.permanentResidentCardNumber)
      || validGenericTextfield(this.certificateNumber))
      && new NameValidator(this.certificateName).isValid()
      && validDateField(this.certificateIssued)
      && this.validBasis()
    )
  }

  validNotCitizen() {
    if (this.citizenshipStatus !== 'NotCitizen') {
      return true
    }

    return (
      validGenericTextfield(this.residenceStatus)
      && validDateField(this.entryDate)
      && new LocationValidator(this.entryLocation).isValid()
      && validCitizenships(this.priorCitizenship)
      && validGenericTextfield(this.alienRegistrationNumber)
      && validDateField(this.alienRegistrationExpiration)
      && this.validDocumentType()
      && validGenericTextfield(this.documentNumber)
      && new NameValidator(this.documentName).isValid()
      && validDateField(this.documentIssued)
      && validDateField(this.documentExpiration)
    )
  }

  validAbroadDocumentation() {
    return validateAbroadDocumentation(this)
  }

  validBornOnMilitaryInstallation() {
    return validateBornOnMilitaryInstallation(this)
  }

  validAlienRegistration() {
    return (
      !!this.hasAlienRegistration
      && (this.hasAlienRegistration === 'No'
        || (this.hasAlienRegistration === 'Yes'
          && validGenericTextfield(this.alienRegistrationNumber)))
    )
  }

  validBasis() {
    return (
      !!this.basis
      && (this.basis !== 'Other'
        || (this.basis === 'Other' && validGenericTextfield(this.explanation)))
    )
  }

  validDocumentType() {
    return (
      !!this.documentType
      && ['I-94', 'U.S. Visa', 'I-20', 'DS-2019', 'Other'].includes(
        this.documentType
      )
      && (this.documentType !== 'Other'
        || (this.documentType === 'Other'
          && validGenericTextfield(this.explanation)))
    )
  }

  isValid() {
    return (
      this.validCitizenshipStatus()
      && this.validForeignBorn()
      && this.validNaturalized()
      && this.validDerived()
      && this.validNotCitizen()
    )
  }
}
