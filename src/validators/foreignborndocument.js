import { validGenericTextfield, validDateField } from './helpers'

const documentTypes = ['FS240', 'DS1350', 'AlienRegistration', 'PermanentResident', 'CertificateOfNaturalization',
  'DerivedAlienRegistration', 'DerivedPermanentResident', 'DerivedCertificateOfNaturalization',
  'I-551', 'I-766', 'I-94', 'Visa', 'NonImmigrantStudent', 'ExchangeVisitor', 'Other']

export default class ForeignBornDocumentValidator {
  constructor (state = {}, props = {}) {
    this.documentType = (state.DocumentType || {}).value
    this.documentExpiration = state.DocumentExpiration
    this.documentExpirationNotApplicable = state.DocumentExpirationNotApplicable
    this.otherExplanation = state.OtherExplanation
    this.documentNumber = state.DocumentNumber
  }

  validDocumentType () {
    return documentTypes.includes(this.documentType)
  }

  validDocumentExplanation () {
    if (this.documentType !== 'Other') {
      return true
    }
    return validGenericTextfield(this.otherExplanation)
  }

  validDocumentExpiration () {
    if (this.documentExpirationNotApplicable) {
      return true
    }
    return validDateField(this.documentExpiration)
  }

  isValid () {
    return this.validDocumentType() &&
      this.validDocumentExpiration() &&
      this.validDocumentExplanation() &&
      validGenericTextfield(this.documentNumber)
  }
}
