import { validGenericTextfield, validDateField } from './helpers'

const documentTypes = ['FS240', 'DS1350', 'AlienRegistration', 'PermanentResident', 'CertificateOfNaturalization',
  'DerivedAlienRegistration', 'DerivedPermanentResident', 'DerivedCertificateOfNaturalization',
  'I-551', 'I-766', 'I-94', 'Visa', 'NonImmigrantStudent', 'ExchangeVisitor', 'Other']

export default class ForeignBornDocumentValidator {
  constructor (data = {}) {
    this.documentType = (data.DocumentType || {}).value
    this.documentExpiration = data.DocumentExpiration
    this.documentExpirationNotApplicable = data.DocumentExpirationNotApplicable
    this.otherExplanation = data.OtherExplanation
    this.documentNumber = data.DocumentNumber
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
