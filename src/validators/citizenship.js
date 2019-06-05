import { validateModel } from 'models/validate'
import citizenshipStatus, {
  requireCertificateFields,
  requireDocumentationFields,
} from 'models/citizenshipStatus'

export const validateCitizenshipStatus = data => validateModel(data, citizenshipStatus) === true

export const isCertificateRequired = data => requireCertificateFields(data)

export const isDocumentRequired = data => requireDocumentationFields(data)

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
