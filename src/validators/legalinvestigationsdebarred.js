import { validateModel, hasYesOrNo } from 'models/validate'
import debarred from 'models/debarred'

export const validateDebarred = data => (
  validateModel(data, debarred)
)

export const validateLegalInvestigationsDebarred = (data) => {
  const legalInvestigationsDebarredModel = {
    HasDebarment: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasDebarment && attributes.HasDebarment.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: debarred },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalInvestigationsDebarredModel)
}

export default class LegalInvestigationsDebarredValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalInvestigationsDebarred(this.data) === true
  }
}

export class DebarredValidator {
  constructor(data = {}) {
    this.data = data
  }

  validAgency() {
    return validateModel(this.data, {
      Agency: debarred.Agency,
    }) === true
  }

  validDate() {
    return validateModel(this.data, {
      Date: debarred.Date,
    }) === true
  }

  validExplanation() {
    return validateModel(this.data, {
      Explanation: debarred.Explanation,
    }) === true
  }

  isValid() {
    return validateDebarred(this.data) === true
  }
}
