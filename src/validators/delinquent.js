import { validateModel, hasYesOrNo } from 'models/validate'
import financialDelinquentPayments from 'models/financialDelinquentPayments'

import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import { requireFinancialDelinquentName, requireFinancialDelinquentInfraction } from 'helpers/branches'

const delinquentItemsModel = {
  HasDelinquent: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes, attributeName, options) => {
    const { HasDelinquent } = attributes
    if (HasDelinquent && HasDelinquent.value === 'Yes') {
      return {
        presence: true,
        accordion: {
          validator: financialDelinquentPayments,
          ...options,
        },
      }
    }
    return {}
  },
}

export const validateFinancialDelinquent = (data, formType = formTypes.SF86) => {
  const requiredFinancialDelinquentName = requireFinancialDelinquentName(formType)
  const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(formType)
  return validateModel(data, delinquentItemsModel, {
    requiredFinancialDelinquentName,
    requiredFinancialDelinquentInfraction,
  })
}

/** Object Validators (as classes) - legacy */
export default class DelinquentValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType = formTypes.SF86 } = state.application.Settings

    this.data = data
    this.formType = formType
  }

  validHasDelinquent() {
    return validateModel(this.data, { HasDelinquent: delinquentItemsModel.HasDelinquent }) === true
  }

  validList() {
    const requiredFinancialDelinquentName = requireFinancialDelinquentName(this.formType)
    const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(
      this.formType
    )

    return validateModel(
      this.data,
      { List: delinquentItemsModel.List },
      { requiredFinancialDelinquentName, requiredFinancialDelinquentInfraction },
    ) === true
  }

  isValid() {
    return validateFinancialDelinquent(this.data, this.formType) === true
  }
}

const validateDelinquentItem = (data, formType = formTypes.SF86) => {
  const requiredFinancialDelinquentName = requireFinancialDelinquentName(formType)
  const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(formType)

  return validateModel(
    data,
    financialDelinquentPayments,
    { requiredFinancialDelinquentName, requiredFinancialDelinquentInfraction },
  )
}

export class DelinquentItemValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType = formTypes.SF86 } = state.application.Settings

    this.data = data
    this.formType = formType
  }

  validName() {
    const requiredFinancialDelinquentName = requireFinancialDelinquentName(this.formType)
    return validateModel(
      this.data,
      { Name: financialDelinquentPayments.Name },
      { requiredFinancialDelinquentName },
    ) === true
  }

  validInfractions() {
    const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(
      this.formType
    )

    return validateModel(
      this.data,
      { Infractions: financialDelinquentPayments.Infractions },
      { requiredFinancialDelinquentInfraction },
    ) === true
  }

  validAccountNumber() {
    return validateModel(
      this.data,
      { AccountNumber: financialDelinquentPayments.AccountNumber }
    ) === true
  }

  validPropertyType() {
    return validateModel(
      this.data,
      { PropertyType: financialDelinquentPayments.PropertyType }
    ) === true
  }

  validAmount() {
    return validateModel(
      this.data,
      { Amount: financialDelinquentPayments.Amount }
    ) === true
  }

  validReason() {
    return validateModel(
      this.data,
      { Reason: financialDelinquentPayments.Reason }
    ) === true
  }

  validStatus() {
    return validateModel(
      this.data,
      { Status: financialDelinquentPayments.Status }
    ) === true
  }

  validDate() {
    return validateModel(
      this.data,
      { Date: financialDelinquentPayments.Date }
    ) === true
  }

  validResolved() {
    return validateModel(
      this.data,
      { Resolved: financialDelinquentPayments.Resolved }
    ) === true
  }

  validCourtName() {
    return validateModel(
      this.data,
      { CourtName: financialDelinquentPayments.CourtName }
    ) === true
  }

  validCourtAddress() {
    return validateModel(
      this.data,
      { CourtAddress: financialDelinquentPayments.CourtAddress }
    ) === true
  }

  validDescription() {
    return validateModel(
      this.data,
      { Description: financialDelinquentPayments.Description }
    ) === true
  }

  isValid() {
    return validateDelinquentItem(this.data, this.formType) === true
  }
}
