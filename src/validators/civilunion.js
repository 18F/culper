import { validateModel } from 'models/validate'
import civilUnion from 'models/civilUnion'

export const validateCivilUnion = data => (
  validateModel(data, civilUnion) === true
)

export default class CivilUnionValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCitizenship() {
    return validateModel(this.data, {
      Citizenship: civilUnion.Citizenship,
    }) === true
  }

  validOtherName() {
    return validateModel(this.data, {
      OtherNames: civilUnion.OtherNames,
    }) === true
  }

  validSeparated() {
    return validateModel(this.data, {
      Separated: civilUnion.Separated,
      AddressSeparated: civilUnion.AddressSeparated,
      DateSeparated: civilUnion.DateSeparated,
    }) === true
  }

  validForeignBornDocument() {
    return validateModel(this.data, {
      ForeignBornDocument: civilUnion.ForeignBornDocument,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: civilUnion.Address,
    }) === true
  }

  isValid() {
    return validateCivilUnion(this.data)
  }
}
