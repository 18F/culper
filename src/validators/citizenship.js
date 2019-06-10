import store from 'services/store'
import { selectValidUSPassport } from 'selectors/misc'

import { validateModel } from 'models/validate'
import citizenshipStatus, {
  requireCertificateFields,
  requireDocumentationFields,
} from 'models/citizenshipStatus'

export const validateCitizenshipStatus = (data) => {
  const { hasValidUSPassport } = selectValidUSPassport(store.getState())

  return validateModel(data, citizenshipStatus, {
    requireForeignBornDocumentation: !hasValidUSPassport,
  }) === true
}

export const isCertificateRequired = (data, requireForeignBornDocumentation) => (
  requireCertificateFields(data, { requireForeignBornDocumentation })
)

export const isDocumentRequired = (data, requireForeignBornDocumentation) => (
  requireDocumentationFields(data, { requireForeignBornDocumentation })
)

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
    }, { requireForeignBornDocumentation: true }) === true
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
