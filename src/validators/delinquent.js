import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import { requireFinancialDelinquentName } from 'helpers/branches'

import LocationValidator from './location'
import {
  validAccordion,
  validNotApplicable,
  validDateField,
  validGenericTextfield,
} from './helpers'

/** Attribute Validators */
const validateName = (name, formType) => (
  requireFinancialDelinquentName(formType)
    ? !!name && validGenericTextfield(name)
    : true
)

const validateInfractions = (infractions) => {
  const allowed = ['Alimony', 'Judgement', 'Lien', 'Federal']
  return (
    !!infractions
    && infractions.length > 0
    && infractions.every(i => allowed.includes(i))
  )
}

const validateAccountNumber = accountNumber => !!accountNumber
  && validGenericTextfield(accountNumber)

// This is an optional value at the moment
const validatePropertyType = () => true

/* eslint no-restricted-globals: 0 */
const validateAmount = (amount) => {
  if (!amount || isNaN(parseInt(amount.value, 10)) || parseInt(amount.value, 10) <= 0) {
    return false
  }

  return true
}

const validateReason = reason => !!reason && validGenericTextfield(reason)

const validateStatus = status => !!status && validGenericTextfield(status)

const validateDate = date => !!date && validDateField(date)

const validateResolved = (resolvedNotApplicable, resolved) => (
  validNotApplicable(resolvedNotApplicable, () => validDateField(resolved))
)

const validateCourtName = courtName => !!courtName && validGenericTextfield(courtName)

const validateCourtAddress = courtAddress => !!courtAddress
  && new LocationValidator(courtAddress).isValid()

const validateDescription = description => !!description && validGenericTextfield(description)

const validateHasDelinquent = (hasDelinquent) => {
  if (!hasDelinquent) return false

  if (!(hasDelinquent === 'No' || hasDelinquent === 'Yes')) {
    return false
  }

  return true
}

/** Object Validators (as functions) */
export const validateDelinquentItem = (data = {}, formType = formTypes.SF86) => {
  const name = data.Name
  // const infractions = data.Infractions || []
  const accountNumber = data.AccountNumber
  const propertyType = data.PropertyType
  const amount = data.Amount
  // const amountEstimated = data.AmountEstimated
  const reason = data.Reason
  const status = data.Status
  const date = data.Date
  const resolved = data.Resolved
  const resolvedNotApplicable = data.ResolvedNotApplicable
  const courtName = data.CourtName
  const courtAddress = data.CourtAddress
  const description = data.Description

  return validateName(name, formType)
    && validateAccountNumber(accountNumber)
    && validatePropertyType(propertyType)
    && validateAmount(amount)
    && validateReason(reason)
    && validateStatus(status)
    && validateDate(date)
    && validateResolved(resolvedNotApplicable, resolved)
    && validateCourtName(courtName)
    && validateCourtAddress(courtAddress)
    && validateDescription(description)
}

const validateDelinquentItems = (items, formType) => (
  validAccordion(items, i => validateDelinquentItem(i, formType))
)

export const validateDelinquent = (data = {}, formType = formTypes.SF86) => {
  const hasDelinquent = (data.HasDelinquent || {}).value
  const list = data.List || {}

  const validHasDelinquent = validateHasDelinquent(hasDelinquent)

  if (validHasDelinquent && hasDelinquent === 'Yes') {
    return validateDelinquentItems(list, formType)
  }

  return validHasDelinquent
}

/** Object Validators (as classes) - legacy */
export default class DelinquentValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings


    this.data = data
    this.formType = formType

    this.hasDelinquent = (data.HasDelinquent || {}).value
    this.list = data.List || {}
  }

  validHasDelinquent() {
    return validateHasDelinquent(this.hasDelinquent)
  }

  validList() {
    if (this.validHasDelinquent() && this.hasDelinquent === 'No') {
      return true
    }

    return validateDelinquentItems(this.list, this.formType)
  }

  isValid() {
    return validateDelinquent(this.data, this.formType)
  }
}

export class DelinquentItemValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType = 'SF86' } = state.application.Settings

    this.data = data
    this.formType = formType

    this.name = data.Name
    this.infractions = data.Infractions || []
    this.accountNumber = data.AccountNumber
    this.propertyType = data.PropertyType
    this.amount = data.Amount
    this.amountEstimated = data.AmountEstimated
    this.reason = data.Reason
    this.status = data.Status
    this.date = data.Date
    this.resolved = data.Resolved
    this.resolvedNotApplicable = data.ResolvedNotApplicable
    this.courtName = data.CourtName
    this.courtAddress = data.CourtAddress
    this.description = data.Description
  }

  validName() {
    return validateName(this.name, this.formType)
  }

  validInfractions() {
    return validateInfractions(this.infractions)
  }

  validAccountNumber() {
    return validateAccountNumber(this.accountNumber)
  }

  validPropertyType() {
    return validatePropertyType(this.propertyType)
  }

  validAmount() {
    return validateAmount(this.amount)
  }

  validReason() {
    return validateReason(this.reason)
  }

  validStatus() {
    return validateStatus(this.status)
  }

  validDate() {
    return validateDate(this.date)
  }

  validResolved() {
    return validateResolved(this.resolvedNotApplicable, this.resolved)
  }

  validCourtName() {
    return validateCourtName(this.courtName)
  }

  validCourtAddress() {
    return validateCourtAddress(this.courtAddress)
  }

  validDescription() {
    return validateDescription(this.description)
  }

  isValid() {
    return validateDelinquentItem(this.data, this.formType)
  }
}
