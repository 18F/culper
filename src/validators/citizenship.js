import AddressValidator from './address'
import NameValidator from './name'
import { validGenericTextfield, validDateField } from './helpers'

export default class CitizenshipValidator {
  constructor (state = {}, props = {}) {
    this.citizenshipStatus = state.CitizenshipStatus

    this.abroadDocumentation = state.AbroadDocumentation
    this.explanation = state.Explanation
    this.documentNumber = state.DocumentNumber
    this.documentIssued = state.DocumentIssued
    this.documentName = state.DocumentName
    this.documentExpiration = state.DocumentExpiration
    this.documentType = state.DocumentType
    this.placeIssued = state.PlaceIssued
    this.certificateNumber = state.CertificateNumber
    this.certificateIssued = state.CertificateIssued
    this.certificateName = state.CertificateName
    this.certificateCourtName = state.CertificateCourtName
    this.certificateCourtAddress = state.CertificateCourtAddress
    this.bornOnMilitaryInstallation = state.BornOnMilitaryInstallation
    this.militaryBase = state.MilitaryBase
    this.entryDate = state.EntryDate
    this.entryLocation = state.EntryLocation
    this.priorCitizenship = state.PriorCitizenship
    this.hasAlienRegistration = state.HasAlienRegistration
    this.alienRegistrationNumber = state.AlienRegistrationNumber
    this.alienRegistrationExpiration = state.AlienRegistrationExpiration
    this.basis = state.Basis
    this.permanentResidentCardNumber = state.PermanentResidentCardNumber
    this.residenceStatus = state.ResidenceStatus
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
      new AddressValidator(this.placeIssued, null).isValid() &&
      new NameValidator(this.documentName, null).isValid() &&
      validGenericTextfield(this.certificateNumber) &&
      validDateField(this.certificateIssued) &&
      new NameValidator(this.certificateName, null).isValid() &&
      this.validBornOnMilitaryInstallation()
  }

  validNaturalized () {
    if (this.citizenshipStatus !== 'Naturalized') {
      return true
    }

    return validDateField(this.entryDate) &&
      new AddressValidator(this.entryLocation, null).isValid() &&
      this.validCitizenships(this.priorCitizenship) &&
      this.validAlienRegistration() &&
      validGenericTextfield(this.certificateNumber) &&
      validGenericTextfield(this.certificateCourtName) &&
      new AddressValidator(this.certificateCourtAddress, null).isValid() &&
      validDateField(this.certificateIssued) &&
      new NameValidator(this.certificateName, null).isValid() &&
      this.validBasis()
  }

  validDerived () {
    if (this.citizenshipStatus !== 'Derived') {
      return true
    }

    return validGenericTextfield(this.alienRegistrationNumber) &&
      validGenericTextfield(this.permanentResidentCardNumber) &&
      validGenericTextfield(this.certificateNumber) &&
      new NameValidator(this.certificateName, null).isValid() &&
      validDateField(this.certificateIssued) &&
      this.validBasis()
  }

  validNotCitizen () {
    if (this.citizenshipStatus !== 'NotCitizen') {
      return true
    }

    return validGenericTextfield(this.residenceStatus) &&
      validDateField(this.entryDate) &&
      new AddressValidator(this.entryLocation, null).isValid() &&
      this.validCitizenships(this.priorCitizenship) &&
      validGenericTextfield(this.alienRegistrationNumber) &&
      validDateField(this.alienRegistrationExpiration) &&
      this.validDocumentType() &&
      validGenericTextfield(this.documentNumber) &&
      new NameValidator(this.documentName, null).isValid() &&
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
