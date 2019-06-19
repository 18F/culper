import { validateModel, hasYesOrNo } from 'models/validate'
import financialCreditCounseling from 'models/financialCreditCounseling'

const creditCounselingModel = {
  HasCreditCounseling: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasCreditCounseling } = attributes
    if (HasCreditCounseling && HasCreditCounseling.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialCreditCounseling },
      }
    }
    return {}
  },
}

export default class CreditValidator {
  constructor(data = {}) {
    this.data = data
  }

  validHasCreditCounseling() {
    return validateModel(this.data, { HasCreditCounseling: creditCounselingModel.HasCreditCounseling }) === true
  }

  validList() {
    return validateModel(this.data, { List: creditCounselingModel.List }) === true
  }

  isValid() {
    return validateModel(this.data, creditCounselingModel) === true
  }
}

const validateCreditCounselingItem = data => (
  validateModel(data, financialCreditCounseling) === true
)
export class CreditItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validExplanation() {
    return validateModel(this.data, { Explanation: financialCreditCounseling.Explanation }) === true
  }

  validName() {
    return validateModel(this.data, { Name: financialCreditCounseling.Name }) === true
  }

  validTelephone() {
    return validateModel(this.data, { Telephone: financialCreditCounseling.Telephone }) === true
  }

  validLocation() {
    return validateModel(this.data, { Location: financialCreditCounseling.Location }) === true
  }

  validDescription() {
    return validateModel(this.data, { Description: financialCreditCounseling.Description }) === true
  }

  isValid() {
    return validateCreditCounselingItem(this.data)
  }
}
