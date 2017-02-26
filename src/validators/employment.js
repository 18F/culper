import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'
import AddressValidator from './address'

export default class EmploymentValidator {
  constructor (state, props) {
    this.employmentActivity = state.EmploymentActivity
    this.datesEmployed = state.DatesEmployed
    this.employment = state.Employment
    this.status = state.Status
    this.title = state.Title
    this.address = state.Address
    this.additional = state.Additional
  }

  validEmploymentActivity () {
    return validGenericTextfield(this.employmentActivity)
  }

  validDatesEmployed () {
    return new DateRangeValidator(this.datesEmployed, null).isValid()
  }

  validEmployment () {
    return validGenericTextfield(this.employment)
  }

  validStatus () {
    return validGenericTextfield(this.status)
  }

  validTitle () {
    return validGenericTextfield(this.title)
  }

  validAddress () {
    return new AddressValidator(this.address, null).isValid()
  }

  validAdditionalActivity () {
    if (!this.additional || !this.additional.HasAdditionalActivity) {
      return false
    }
    for (let activity of this.additional.List) {
      let valid = (validGenericTextfield(activity.Position) &&
        validGenericTextfield(activity.Supervisor) &&
        new DateRangeValidator(activity.DatesEmployed).isValid())
      if (!valid) {
        return false
      }
    }
    return true
  }

  isValid () {
    return this.validEmploymentActivity() &&
      this.validDatesEmployed() &&
      this.validEmployment() &&
      this.validStatus() &&
      this.validTitle() &&
      this.validAddress() &&
      this.validAdditionalActivity()
  }
}
