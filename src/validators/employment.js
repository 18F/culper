import DateRangeValidator from './daterange'
import { daysAgo, today } from '../components/Section/History/dateranges'
import { validGenericTextfield, validPhoneNumber, validGenericMonthYear, validDateField } from './helpers'
import AddressValidator from './address'
import ReferenceValidator from './reference'

export default class EmploymentValidator {
  constructor (state, props) {
    this.employmentActivity = state.EmploymentActivity
    this.dates = state.Dates
    this.employment = state.Employment
    this.status = state.Status
    this.title = state.Title
    this.address = state.Address
    this.additional = state.Additional
    this.telephone = state.Telephone
    this.physicalAddress = state.PhysicalAddress
    this.reasonLeft = state.ReasonLeft
    this.reprimand = state.Reprimand
    this.supervisor = state.Supervisor
    this.reference = state.Reference
  }

  hasEmployment () {
    return this.employmentActivity && !['Unemployment', 'ActiveMilitary', 'NationalGuard', 'USPHS'].includes(this.employmentActivity.value)
  }

  hasPhysicalAddress () {
    return this.employmentActivity && ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other', 'SelfEmployment'].includes(this.employmentActivity.value)
  }

  hasSupervisor () {
    return this.employmentActivity && ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other'].includes(this.employmentActivity.value)
  }

  validEmploymentActivity () {
    if (this.employmentActivity === 'Other') {
      return this.employmentActivity.otherExplanation
    }

    return validGenericTextfield(this.employmentActivity)
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validEmployment () {
    if (this.hasEmployment()) {
      return validGenericTextfield(this.employment)
    }

    return true
  }

  validStatus () {
    if (this.hasEmployment()) {
      return validGenericTextfield(this.status)
    }

    return true
  }

  validTitle () {
    if (this.hasEmployment()) {
      return validGenericTextfield(this.title)
    }

    return true
  }

  validAddress () {
    if (this.hasEmployment()) {
      return new AddressValidator(this.address, null).isValid()
    }

    return true
  }

  validAdditionalActivity () {
    if (this.hasEmployment()) {
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
          return validGenericTextfield(activity.Position) &&
            validGenericTextfield(activity.Supervisor) &&
            new DateRangeValidator(activity.DatesEmployed).isValid()
        }
      }
    }

    return true
  }

  validTelephone () {
    if (this.hasEmployment()) {
      return validPhoneNumber(this.telephone)
    }

    return true
  }

  validPhysicalAddress () {
    if (this.hasPhysicalAddress()) {
      if (!this.physicalAddress || !(this.physicalAddress.HasDifferentAddress === 'No' || this.physicalAddress.HasDifferentAddress === 'Yes')) {
        return false
      }

      if (this.physicalAddress.HasDifferentAddress === 'Yes') {
        return this.physicalAddress.Address &&
          new AddressValidator(this.physicalAddress.Address, null).isValid()
      }
    }

    return true
  }

  validReasonLeft () {
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    if ((this.dates.from && this.dates.from >= sevenYearsAgo) || (this.dates.to && this.dates.to >= sevenYearsAgo)) {
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
    if (this.hasSupervisor()) {
      return this.supervisor &&
        validGenericTextfield(this.supervisor.SupervisorName) &&
        validGenericTextfield(this.supervisor.Title) &&
        validGenericTextfield(this.supervisor.Email) &&
        new AddressValidator(this.supervisor.Address, null).isValid() &&
        validPhoneNumber(this.supervisor.Telephone)
    }

    return true
  }

  validReference () {
    return this.reference && new ReferenceValidator(this.reference, null).isValid()
  }

  validReprimand () {
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    if ((this.dates.from && this.dates.from >= sevenYearsAgo) || (this.dates.to && this.dates.to >= sevenYearsAgo)) {
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

  isValid () {
    return this.validEmploymentActivity() &&
      this.validDates() &&
      this.validEmployment() &&
      this.validStatus() &&
      this.validTitle() &&
      this.validAddress() &&
      this.validTelephone() &&
      this.validAdditionalActivity() &&
      this.validPhysicalAddress() &&
      this.validReasonLeft() &&
      this.validSupervisor() &&
      this.validReference()
  }
}
