import NameValidator from './name'
import LocationValidator from './location'
import { validGenericTextfield, validDateField } from './helpers'

export default class CitizenshipValidator {
  constructor (data = {}) {
    this.citizenshipStatus = (data.CitizenshipStatus || {}).value
    this.abroadDocumentation = (data.AbroadDocumentation || {}).value
    this.explanation = (data.Explanation || {})
    this.documentNumber = (data.DocumentNumber || {}).value
    this.documentIssued = data.DocumentIssued
    this.documentName = data.DocumentName
    this.documentExpiration = data.DocumentExpiration
    this.documentType = (data.DocumentType || {}).value
    this.placeIssued = data.PlaceIssued
    this.certificateNumber = (data.CertificateNumber || {})
    this.certificateIssued = data.CertificateIssued
    this.certificateName = data.CertificateName
    this.certificateCourtName = (data.CertificateCourtName || {})
    this.certificateCourtAddress = data.CertificateCourtAddress
    this.bornOnMilitaryInstallation = (data.BornOnMilitaryInstallation || {}).value
    this.militaryBase = (data.MilitaryBase || {})
    this.entryDate = data.EntryDate
    this.entryLocation = data.EntryLocation
    this.priorCitizenship = (data.PriorCitizenship || {}).value
    this.hasAlienRegistration = (data.HasAlienRegistration || {}).value
    this.alienRegistrationNumber = (data.AlienRegistrationNumber || {})
    this.alienRegistrationExpiration = data.AlienRegistrationExpiration
    this.basis = (data.Basis || {}).value
    this.permanentResidentCardNumber = (data.PermanentResidentCardNumber || {})
    this.residenceStatus = (data.ResidenceStatus || {}).value
  }

  validCitizenshipStatus () {
    return !!this.citizenshipStatus && ['Citizen', 'ForeignBorn', 'Naturalized', 'Derived', 'NotCitizen'].includes(this.citizenshipStatus)
  }

  validForeignBorn () {
    if (this.citizenshipStatus !== 'ForeignBorn') {
      return true
    }

    return this.validAbroadDocumentation() &&
      validGenericTextfield(this.documentNumber) &&
      validDateField(this.documentIssued) &&
      new LocationValidator(this.placeIssued).isValid() &&
      new NameValidator(this.documentName).isValid() &&
      validGenericTextfield(this.certificateNumber) &&
      validDateField(this.certificateIssued) &&
      new NameValidator(this.certificateName).isValid() &&
      this.validBornOnMilitaryInstallation()
  }

  validNaturalized () {
    if (this.citizenshipStatus !== 'Naturalized') {
      return true
    }

    return validDateField(this.entryDate) &&
      new LocationValidator(this.entryLocation).isValid() &&
      this.validCitizenships(this.priorCitizenship) &&
      this.validAlienRegistration() &&
      validGenericTextfield(this.certificateNumber) &&
      validGenericTextfield(this.certificateCourtName) &&
      new LocationValidator(this.certificateCourtAddress).isValid() &&
      validDateField(this.certificateIssued) &&
      new NameValidator(this.certificateName).isValid() &&
      this.validBasis()
  }

  validDerived () {
    if (this.citizenshipStatus !== 'Derived') {
      return true
    }

    return validGenericTextfield(this.alienRegistrationNumber) &&
      validGenericTextfield(this.permanentResidentCardNumber) &&
      validGenericTextfield(this.certificateNumber) &&
      new NameValidator(this.certificateName).isValid() &&
      validDateField(this.certificateIssued) &&
      this.validBasis()
  }

  validNotCitizen () {
    if (this.citizenshipStatus !== 'NotCitizen') {
      return true
    }

    return validGenericTextfield(this.residenceStatus) &&
      validDateField(this.entryDate) &&
      new LocationValidator(this.entryLocation).isValid() &&
      this.validCitizenships(this.priorCitizenship) &&
      validGenericTextfield(this.alienRegistrationNumber) &&
      validDateField(this.alienRegistrationExpiration) &&
      this.validDocumentType() &&
      validGenericTextfield(this.documentNumber) &&
      new NameValidator(this.documentName).isValid() &&
      validDateField(this.documentIssued) &&
      validDateField(this.documentExpiration)
  }

  validAbroadDocumentation () {
    return !!this.abroadDocumentation &&
      ['FS-240', 'DS-1350', 'FS-545', 'Other'].includes(this.abroadDocumentation) &&
      (this.abroadDocumentation !== 'Other' || (this.abroadDocumentation === 'Other' && validGenericTextfield(this.explanation)))
  }

  validBornOnMilitaryInstallation () {
    return !!this.bornOnMilitaryInstallation &&
      (this.bornOnMilitaryInstallation === 'No' || (this.bornOnMilitaryInstallation === 'Yes' && validGenericTextfield(this.militaryBase)))
  }

  validCitizenships (arr) {
    return !!arr && arr.length > 0
  }

  validAlienRegistration () {
    return !!this.hasAlienRegistration &&
      (this.hasAlienRegistration === 'No' || (this.hasAlienRegistration === 'Yes' && validGenericTextfield(this.alienRegistrationNumber)))
  }

  validBasis () {
    return !!this.basis &&
      (this.basis !== 'Other' || (this.basis === 'Other' && validGenericTextfield(this.explanation)))
  }

  validDocumentType () {
    return !!this.documentType &&
      ['I-94', 'U.S. Visa', 'I-20', 'DS-2019', 'Other'].includes(this.documentType) &&
      (this.documentType !== 'Other' || (this.documentType === 'Other' && validGenericTextfield(this.explanation)))
  }

  isValid () {
    return this.validCitizenshipStatus() &&
      this.validForeignBorn() &&
      this.validNaturalized() &&
      this.validDerived() &&
      this.validNotCitizen()
  }
}
