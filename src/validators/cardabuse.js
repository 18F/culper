import { validateModel, hasYesOrNo } from 'models/validate'
import financialCardAbuse from 'models/financialCardAbuse'

const cardAbuseModel = {
  HasCardAbuse: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasCardAbuse } = attributes
    if (HasCardAbuse && HasCardAbuse.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialCardAbuse },
      }
    }
    return {}
  },
}

export const validateFinancialCardAbuse = data => (
  validateModel(data, cardAbuseModel) === true
)

export default class CardAbuseValidator {
  constructor(data = {}) {
    this.data = data
  }

  validHasCardAbuse() {
    return validateModel(this.data, { HasCardAbuse: cardAbuseModel.HasCardAbuse }) === true
  }

  validList() {
    return validateModel(this.data, { List: cardAbuseModel.List }) === true
  }

  isValid() {
    return validateFinancialCardAbuse(this.data)
  }
}

const validateCardAbuseItem = data => (
  validateModel(data, financialCardAbuse) === true
)

export class CardAbuseItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validAgency() {
    return validateModel(this.data, { Agency: financialCardAbuse.Agency }) === true
  }

  validAddress() {
    return validateModel(this.data, { Address: financialCardAbuse.Address }) === true
  }

  validDate() {
    return validateModel(this.data, { Date: financialCardAbuse.Date }) === true
  }

  validReason() {
    return validateModel(this.data, { Reason: financialCardAbuse.Reason }) === true
  }

  validAmount() {
    return validateModel(this.data, { Amount: financialCardAbuse.Amount }) === true
  }

  validDescription() {
    return validateModel(this.data, { Description: financialCardAbuse.Description }) === true
  }

  isValid() {
    return validateCardAbuseItem(this.data)
  }
}
