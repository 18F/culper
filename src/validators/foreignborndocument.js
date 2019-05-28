import { validateModel } from 'models/validate'
import foreignBornDocument from 'models/foreignBornDocument'

export const validateForeignBornDocument = data => (
  validateModel(data, foreignBornDocument) === true
)

export default class ForeignBornDocumentValidator {
  constructor(data = {}) {
    this.data = data
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
    return validateForeignBornDocument(this.data)
  }
}
