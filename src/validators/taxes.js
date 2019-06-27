import { validateModel, hasYesOrNo } from 'models/validate'
import financialTaxes from 'models/financialTaxes'

const financialTaxesModel = {
  HasTaxes: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasTaxes } = attributes
    if (HasTaxes && HasTaxes.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialTaxes },
      }
    }
    return {}
  },
}
export default class TaxesValidator {
  constructor(data = {}) {
    this.data = data
  }

  validHasTaxes() {
    return validateModel(this.data, { HasTaxes: financialTaxesModel.HasTaxes }) === true
  }

  validList() {
    return validateModel(this.data, { List: financialTaxesModel.List }) === true
  }

  isValid() {
    return validateModel(this.data, financialTaxesModel) === true
  }
}


const validateTaxItem = data => (
  validateModel(data, financialTaxes) === true
)
export class TaxValidator {
  constructor(data = {}) {
    this.data = data
  }

  validFailure() {
    return validateModel(this.data, { Failure: financialTaxes.Failure }) === true
  }

  validYear() {
    return validateModel(this.data, { Year: financialTaxes.Year }) === true
  }

  validReason() {
    return validateModel(this.data, { Reason: financialTaxes.Reason }) === true
  }

  validAgency() {
    return validateModel(this.data, { Agency: financialTaxes.Agency }) === true
  }

  validTaxType() {
    return validateModel(this.data, { TaxType: financialTaxes.TaxType }) === true
  }

  validAmount() {
    return validateModel(this.data, { Amount: financialTaxes.Amount }) === true
  }

  validDate() {
    return validateModel(this.data, { Date: financialTaxes.Date }) === true
  }

  validDescription() {
    return validateModel(this.data, { Description: financialTaxes.Description }) === true
  }

  isValid() {
    return validateTaxItem(this.data)
  }
}
