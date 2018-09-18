import DateRangeValidator from './daterange'
import LocationValidator from './location'
import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export default class MilitaryHistoryValidator {
  constructor(data = {}) {
    this.hasServed = (data.HasServed || {}).value
    this.list = data.List || {}
  }

  hasHistory() {
    return this.hasServed === 'Yes'
  }

  validServed() {
    return this.hasServed === 'Yes' || this.hasServed === 'No'
  }

  validItems() {
    if (this.hasServed === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new MilitaryServiceValidator(item).isValid()
    })
  }

  isValid() {
    return this.validServed() && this.validItems()
  }
}

export class MilitaryServiceValidator {
  constructor(data = {}) {
    this.service = (data.Service || {}).value
    this.status = (data.Status || {}).value
    this.officer = (data.Officer || {}).value
    this.serviceNumber = data.ServiceNumber || {}
    this.dates = data.Dates || {}
    this.serviceState = data.ServiceState || {}
    this.hasBeenDischarged = (data.HasBeenDischarged || {}).value
    this.dischargeType = (data.DischargeType || {}).value
    this.dischargeTypeOther = data.DischargeTypeOther || {}
    this.dischargeReason = data.DischargeReason || {}
    this.dischargeDate = data.DischargeDate || {}
  }

  validService() {
    return this.service && this.service.length > 0
  }

  validStatus() {
    if (['AirNationalGuard', 'ArmyNationalGuard'].includes(this.service)) {
      return this.status && this.status.length > 0
    }

    return true
  }

  validOfficer() {
    return this.officer && this.officer.length > 0
  }

  validServiceNumber() {
    return !!this.serviceNumber && validGenericTextfield(this.serviceNumber)
  }

  validDates() {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validServiceState() {
    if (['AirNationalGuard', 'ArmyNationalGuard'].includes(this.service)) {
      return new LocationValidator(this.serviceState).isValid()
    }

    return true
  }

  validHasBeenDischarged() {
    return this.hasBeenDischarged === 'Yes' || this.hasBeenDischarged === 'No'
  }

  validDischargeType() {
    if (this.hasBeenDischarged === 'No') {
      return true
    }

    return (
      this.validHasBeenDischarged() &&
      this.dischargeType &&
      this.dischargeType.length > 0
    )
  }

  validDischargeTypeOther() {
    if (this.hasBeenDischarged === 'No') {
      return true
    }

    if (this.validDischargeDate() && this.dischargeType !== 'Other') {
      return true
    }

    return (
      this.validHasBeenDischarged() &&
      this.dischargeType === 'Other' &&
      validGenericTextfield(this.dischargeTypeOther)
    )
  }

  validDischargeReason() {
    if (this.hasBeenDischarged === 'No' || this.dischargeType === 'Honorable') {
      return true
    }

    return (
      this.validHasBeenDischarged() &&
      validGenericTextfield(this.dischargeReason)
    )
  }

  validDischargeDate() {
    if (this.hasBeenDischarged === 'No') {
      return true
    }

    return this.validHasBeenDischarged() && validDateField(this.dischargeDate)
  }

  isValid() {
    return (
      this.validService() &&
      this.validStatus() &&
      this.validOfficer() &&
      this.validServiceNumber() &&
      this.validDates() &&
      this.validServiceState() &&
      this.validHasBeenDischarged() &&
      this.validDischargeType() &&
      this.validDischargeTypeOther() &&
      this.validDischargeReason() &&
      this.validDischargeDate()
    )
  }
}
