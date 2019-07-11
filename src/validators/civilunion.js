import { validateModel } from 'models/validate'
import civilUnion from 'models/civilUnion'
import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import { requireRelationshipMaritalForeignBornDocExpiration } from 'helpers/branches'

export const validateCivilUnion = (data, formType = formTypes.SF86) => {
  const isForeignBornDocExpirationRequired = requireRelationshipMaritalForeignBornDocExpiration(formType)

  return validateModel(
    data,
    civilUnion,
    { requireRelationshipMaritalForeignBornDocExpiration: isForeignBornDocExpirationRequired },
  ) === true
}

export default class CivilUnionValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType
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
    return validateCivilUnion(this.data, this.formType)
  }
}
