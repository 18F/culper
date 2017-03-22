import DateRangeValidator from './daterange'
import { validGenericTextfield, validDateField } from './helpers'

export default class MilitaryHistoryValidator {
  constructor (state = {}, props = {}) {
    this.hasServed = state.HasServed
    this.list = state.List || []
  }

  validServed () {
    return this.hasServed === 'Yes' || this.hasServed === 'No'
  }

  validItems () {
    if (this.validServed() && this.hasServed === 'No') {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    for (const service of this.list) {
      if (new MilitaryServiceValidator(service.Item, null).isValid() !== true) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validServed() &&
      this.validItems()
  }
}

export class MilitaryServiceValidator {
  constructor (state = {}, props = {}) {
    this.service = state.Service
    this.status = state.Status
    this.officer = state.Officer
    this.serviceNumber = state.ServiceNumber
    this.dates = state.Dates
    this.hasBeenDischarged = state.HasBeenDischarged
    this.dischargeType = state.DischargeType
    this.dischargeTypeOther = state.DischargeTypeOther
    this.dischargeReason = state.DischargeReason
    this.dischargeDate = state.DischargeDate
  }

  validService () {
    return this.service && this.service.length > 0
  }

  validStatus () {
    if (['AirNationalGuard', 'ArmyNationalGuard'].includes(this.service)) {
      return this.status && this.status.length > 0
    }

    return true
  }

  validOfficer () {
    return this.officer && this.officer.length > 0
  }

  validServiceNumber () {
    return this.serviceNumber && this.serviceNumber.length > 0
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validHasBeenDischarged () {
    return this.hasBeenDischarged === 'Yes' || this.hasBeenDischarged === 'No'
  }

  validDischargeType () {
    if (this.hasBeenDischarged === 'No') {
      return true
    }

    return this.validHasBeenDischarged() && this.dischargeType && this.dischargeType.length > 0
  }

  validDischargeTypeOther () {
    if (this.hasBeenDischarged === 'No') {
      return true
    }

    if (this.validDischargeDate() && this.dischargeType !== 'Other') {
      return true
    }

    return this.validHasBeenDischarged() && this.dischargeType === 'Other' && validGenericTextfield(this.dischargeTypeOther)
  }

  validDischargeReason () {
    if (this.hasBeenDischarged === 'No' || this.dischargeType === 'Honorable') {
      return true
    }

    return this.validHasBeenDischarged() && validGenericTextfield(this.dischargeReason)
  }

  validDischargeDate () {
    if (this.hasBeenDischarged === 'No') {
      return true
    }

    return this.validHasBeenDischarged() && validDateField(this.dischargeDate)
  }

  isValid () {
    return this.validService() &&
      this.validStatus() &&
      this.validOfficer() &&
      this.validServiceNumber() &&
      this.validDates() &&
      this.validHasBeenDischarged() &&
      this.validDischargeType() &&
      this.validDischargeTypeOther() &&
      this.validDischargeReason() &&
      this.validDischargeDate()
  }
}
