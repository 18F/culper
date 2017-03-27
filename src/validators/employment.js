import DateRangeValidator from './daterange'
import { daysAgo, today } from '../components/Section/History/dateranges'
import { validGenericTextfield, validPhoneNumber, validGenericMonthYear, validDateField, withinSevenYears } from './helpers'
import AddressValidator from './address'
import ReferenceValidator from './reference'

export default class EmploymentValidator {
  constructor (state, props) {
    this.employmentActivity = state.EmploymentActivity || { value: null }
    this.dates = state.Dates
    this.employment = state.Employment
    this.status = state.Status
    this.title = state.Title
    this.dutyStation = state.DutyStation
    this.address = state.Address
    this.additional = state.Additional
    this.telephone = state.Telephone
    this.physicalAddress = state.PhysicalAddress
    this.reasonLeft = state.ReasonLeft
    this.reprimand = state.Reprimand || {}
    this.supervisor = state.Supervisor
    this.reference = state.Reference
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
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
    if (!this.additional) {
      return false
    }
    if (!(this.additional.HasAdditionalActivity === 'No' || this.additional.HasAdditionalActivity === 'Yes')) {
      return false
    }

    if (this.additional.HasAdditionalActivity === 'Yes') {
      if (!this.additional.List || this.additional.List.length === 0) {
        return false
      }

      for (const activity of this.additional.List) {
        let valid = validGenericTextfield(activity.Position) &&
          validGenericTextfield(activity.Supervisor) &&
          new DateRangeValidator(activity.DatesEmployed).isValid()
        if (!valid) {
          return false
        }
      }
    }
    return true
  }

  validTelephone () {
    return validPhoneNumber(this.telephone)
  }

  validPhysicalAddress () {
    if (!this.physicalAddress || !(this.physicalAddress.HasDifferentAddress === 'No' || this.physicalAddress.HasDifferentAddress === 'Yes')) {
      return false
    }

    if (this.physicalAddress.HasDifferentAddress === 'Yes') {
      return this.physicalAddress.Address &&
        new AddressValidator(this.physicalAddress.Address, null).isValid()
    }

    return true
  }

  validReasonLeft () {
    if (this.withinSevenYears()) {
      if (!this.reasonLeft) {
        return false
      }

      if (!this.reasonLeft.Reasons) {
        return false
      }

      for (let r of this.reasonLeft.Reasons) {
        if (r.Has === 'No') {
          continue
        }

        if (!r.Reason) {
          return false
        }

        if (!validDateField(r.Date)) {
          return false
        }

        if (!validGenericTextfield(r.Text)) {
          return false
        }
      }
    }

    return true
  }

  validSupervisor () {
    return this.supervisor &&
      validGenericTextfield(this.supervisor.SupervisorName) &&
      validGenericTextfield(this.supervisor.Title) &&
      validGenericTextfield(this.supervisor.Email) &&
      new AddressValidator(this.supervisor.Address, null).isValid() &&
      validPhoneNumber(this.supervisor.Telephone)
  }

  validReference () {
    return this.reference && new ReferenceValidator(this.reference, null).isValid()
  }

  validReprimand () {
    if (this.withinSevenYears()) {
      if (!this.reprimand.Reasons) {
        return false
      }

      for (let r of this.reprimand.Reasons) {
        if (r.Has === 'No') {
          continue
        }

        if (!validGenericTextfield(r.Text)) {
          return false
        }

        if (!validGenericMonthYear(r.Date)) {
          return false
        }
      }
    }

    return true
  }

  withinSevenYears () {
    return withinSevenYears(this.dates.from, this.dates.to)
  }

  validAssignedDuty () {
    return validGenericTextfield(this.dutyStation)
  }

  isValid () {
    switch (this.employmentActivity.value) {
      // Active Duty, National Guard/Reserve, or USPHS Commissioned Corps
      case 'ActiveMilitary':
      case 'NationalGuard':
      case 'USPHS':
        return this.validDates() &&
          this.validTitle() &&
          this.validAssignedDuty() &&
          this.validStatus() &&
          this.validAddress() &&
          this.validTelephone() &&
          this.validSupervisor() &&
          this.validReasonLeft() &&
          this.validReprimand()

      // Other Federal employment, State Government, Federal Contractor, Non-government employment, or Other
      case 'OtherFederal':
      case 'StateGovernment':
      case 'FederalContractor':
      case 'NonGovernment':
      case 'Other':
        return this.validDates() &&
          this.validTitle() &&
          this.validEmployment() &&
          this.validStatus() &&
          this.validAddress() &&
          this.validTelephone() &&
          this.validSupervisor() &&
          this.validAdditionalActivity() &&
          this.validReasonLeft() &&
          this.validReprimand()

      // Self employment
      case 'SelfEmployment':
        return this.validDates() &&
          this.validTitle() &&
          this.validEmployment() &&
          this.validStatus() &&
          this.validAddress() &&
          this.validPhysicalAddress() &&
          this.validTelephone() &&
          this.validReference() &&
          this.validReasonLeft() &&
          this.validReprimand()

      // Unemployment
      case 'Unemployment':
        return this.validDates() &&
          this.validReference() &&
          this.validReasonLeft()
      default:
        return false
    }
  }
}

