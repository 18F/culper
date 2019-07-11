import { validateModel } from 'models/validate'
import foreignBornDocument from 'models/foreignBornDocument'
import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import { requireRelationshipMaritalForeignBornDocExpiration } from 'helpers/branches'

export const validateForeignBornDocument = (data, formType = formTypes.SF86) => {
  const isForeignBornDocExpirationRequired = requireRelationshipMaritalForeignBornDocExpiration(formType)
  return validateModel(
    data,
    foreignBornDocument,
    { requireRelationshipMaritalForeignBornDocExpiration: isForeignBornDocExpirationRequired }
  ) === true
}

export default class ForeignBornDocumentValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType
  }

  validDocumentType() {
    return validateModel(this.data, {
      DocumentType: foreignBornDocument.DocumentType,
    }) === true
  }

  validDocumentExplanation() {
    return validateModel(this.data, {
      OtherExplanation: foreignBornDocument.OtherExplanation,
    }) === true
  }

  validDocumentExpiration() {
    return validateModel(this.data, {
      DocumentExpiration: foreignBornDocument.DocumentExpiration,
    }) === true
  }

  isValid() {
    return validateForeignBornDocument(this.data, this.formType)
  }
}
