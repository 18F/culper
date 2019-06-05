import store from 'services/store'
import { hasValidUSPassport } from 'validators/passport'

import { validateModel } from 'models/validate'
import citizenshipStatus, {
  requireCertificateFields,
  requireDocumentationFields,
} from 'models/citizenshipStatus'

export const validateCitizenshipStatus = data => (
  validateModel(data, citizenshipStatus, {
    requireForeignBornDocumentation: hasValidUSPassport(store.getState()),
  }) === true
)

export const isCertificateRequired = (data) => {
  const requireForeignBornDocumentation = hasValidUSPassport(store.getState())
  return requireCertificateFields(data, { requireForeignBornDocumentation })
}

export const isDocumentRequired = (data) => {
  const requireForeignBornDocumentation = hasValidUSPassport(store.getState())
  return requireDocumentationFields(data, { requireForeignBornDocumentation })
}

export default class CitizenshipValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCitizenshipStatus() {
    return validateModel(this.data, {
      CitizenshipStatus: citizenshipStatus.CitizenshipStatus,
    }) === true
  }

  validAbroadDocumentation() {
    return validateModel(this.data, {
      AbroadDocumentation: citizenshipStatus.AbroadDocumentation,
      Explanation: citizenshipStatus.Explanation,
    }) === true
  }

  validBornOnMilitaryInstallation() {
    return validateModel(this.data, {
      BornOnMilitaryInstallation: citizenshipStatus.BornOnMilitaryInstallation,
      MilitaryBase: citizenshipStatus.MilitaryBase,
    }) === true
  }

  validAlienRegistration() {
    return validateModel(this.data, {
      HasAlienRegistration: citizenshipStatus.HasAlienRegistration,
      AlienRegistrationNumber: citizenshipStatus.AlienRegistrationNumber,
    }) === true
  }

  validBasis() {
    return validateModel(this.data, {
      Basis: citizenshipStatus.Basis,
      Explanation: citizenshipStatus.Explanation,
    }) === true
  }

  validDocumentType() {
    return validateModel(this.data, {
      DocumentType: citizenshipStatus.DocumentType,
      Explanation: citizenshipStatus.Explanation,
    }) === true
  }

  isValid() {
    return validateCitizenshipStatus(this.data)
  }
}
