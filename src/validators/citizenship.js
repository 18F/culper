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
    this.placeIssued = state.PlaceIssued
    this.documentName = state.DocumentName
    this.certificateNumber = state.CertificateNumber
    this.certificateIssued = state.CertificateIssued
    this.certificateName = state.CertificateName
    this.bornOnMilitaryInstallation = state.BornOnMilitaryInstallation
    this.militaryBase = state.MilitaryBase
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

  validAbroadDocumentation () {
    return !!this.abroadDocumentation &&
      ['FS-240', 'DS-1350', 'FS-545', 'Other'].includes(this.abroadDocumentation) &&
      (this.abroadDocumentation !== 'Other' || (this.abroadDocumentation === 'Other' && validGenericTextfield(this.explanation)))
  }

  validBornOnMilitaryInstallation () {
    return !!this.bornOnMilitaryInstallation &&
      (this.bornOnMilitaryInstallation === 'No' || (this.bornOnMilitaryInstallation === 'Yes' && validGenericTextfield(this.militaryBase)))
  }

  isValid () {
    return this.validCitizenshipStatus() &&
      this.validForeignBorn()
  }
}
