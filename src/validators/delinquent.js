import { validateModel, hasYesOrNo } from 'models/validate'
import financialDelinquentPayments from 'models/financialDelinquentPayments'

import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import { requireFinancialDelinquentName, requireFinancialDelinquentInfraction } from 'helpers/branches'

// import LocationValidator from './location'
// import {
//   validAccordion,
//   validNotApplicable,
//   validDateField,
//   validGenericTextfield,
// } from './helpers'

// /** Attribute Validators */
// const validateName = (data, formType) => (
//   requireFinancialDelinquentName(formType)
//     ? validateModel(data, financialDelinquentPayments) === true
//     : true
// )

// const validateInfractions = (infractions) => {
//   const allowed = ['Alimony', 'Judgement', 'Lien', 'Federal']
//   return (
//     !!infractions
//     && infractions.length > 0
//     && infractions.every(i => allowed.includes(i))
//   )
// }

// const validateAccountNumber = accountNumber => !!accountNumber
//   && validGenericTextfield(accountNumber)

// // This is an optional value at the moment
// const validatePropertyType = () => true

// /* eslint no-restricted-globals: 0 */
// const validateAmount = (amount) => {
//   if (!amount || isNaN(parseInt(amount.value, 10)) || parseInt(amount.value, 10) <= 0) {
//     return false
//   }

//   return true
// }

// const validateReason = reason => !!reason && validGenericTextfield(reason)

// const validateStatus = status => !!status && validGenericTextfield(status)

// const validateDate = date => !!date && validDateField(date)

// const validateResolved = (resolvedNotApplicable, resolved) => (
//   validNotApplicable(resolvedNotApplicable, () => validDateField(resolved))
// )

// const validateCourtName = courtName => !!courtName && validGenericTextfield(courtName)

// const validateCourtAddress = courtAddress => !!courtAddress
//   && new LocationValidator(courtAddress).isValid()

// const validateDescription = description => !!description && validGenericTextfield(description)

// const validateHasDelinquent = (hasDelinquent) => {
//   if (!hasDelinquent) return false

//   if (!(hasDelinquent === 'No' || hasDelinquent === 'Yes')) {
//     return false
//   }

//   return true
// }

// /** Object Validators (as functions) */
// export const validateDelinquentItem = (data = {}, formType = formTypes.SF86) => {
//   const name = data.Name
//   // const infractions = data.Infractions || []
//   const accountNumber = data.AccountNumber
//   const propertyType = data.PropertyType
//   const amount = data.Amount
//   // const amountEstimated = data.AmountEstimated
//   const reason = data.Reason
//   const status = data.Status
//   const date = data.Date
//   const resolved = data.Resolved
//   const resolvedNotApplicable = data.ResolvedNotApplicable
//   const courtName = data.CourtName
//   const courtAddress = data.CourtAddress
//   const description = data.Description

//   return validateName(data, formType)
//     && validateAccountNumber(accountNumber)
//     && validatePropertyType(propertyType)
//     && validateAmount(amount)
//     && validateReason(reason)
//     && validateStatus(status)
//     && validateDate(date)
//     && validateResolved(resolvedNotApplicable, resolved)
//     && validateCourtName(courtName)
//     && validateCourtAddress(courtAddress)
//     && validateDescription(description)
// }

// const validateDelinquentItems = (items, formType) => (
//   validAccordion(items, i => validateDelinquentItem(i, formType))
// )

// export const validateDelinquent = (data = {}, formType = formTypes.SF86) => {
//   const hasDelinquent = (data.HasDelinquent || {}).value
//   const list = data.List || {}

//   const validHasDelinquent = validateHasDelinquent(hasDelinquent)

//   if (validHasDelinquent && hasDelinquent === 'Yes') {
//     return validateDelinquentItems(list, formType)
//   }

//   return validHasDelinquent
// }

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
    const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(this.formType)
    return validateModel(
      this.data,
      { List: delinquentItemsModel.List },
      { requiredFinancialDelinquentName, requiredFinancialDelinquentInfraction },
    ) === true
  }

  isValid() {
    const requiredFinancialDelinquentName = requireFinancialDelinquentName(this.formType)
    const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(this.formType)
    return validateModel(
      this.data,
      delinquentItemsModel,
      { requiredFinancialDelinquentName, requiredFinancialDelinquentInfraction }
    ) === true
  }
}

const validateDelinquentItem = (data, formType = formTypes.SF86) => {
  const requiredFinancialDelinquentName = requireFinancialDelinquentName(formType)
  const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(formType)

  return validateModel(
    data,
    financialDelinquentPayments,
    { requiredFinancialDelinquentName, requiredFinancialDelinquentInfraction },
  ) === true
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
    const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(this.formType)

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
    return validateDelinquentItem(this.data, this.formType)
  }
}
