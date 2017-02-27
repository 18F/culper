import DateRangeValidator from './daterange'
import { daysAgo, today } from '../components/Section/History/dateranges'
import { validGenericTextfield, validPhoneNumber } from './helpers'
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
    this.supervisor = state.Supervisor
    this.reference = state.Reference
  }

  hasEmployment () {
    return !['Unemployment', 'ActiveMilitary', 'NationalGuard', 'USPHS'].includes(this.employmentActivity.value)
  }

  hasPhysicalAddress () {
    return ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other', 'SelfEmployment'].includes(this.employmentActivity.value)
  }

  hasSupervisor () {
    return ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other'].includes(this.employmentActivity.value)
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
      return new AddressValidator(this.physicalAddress, null).isValid()
    }

    return true
  }

  validReasonLeft () {
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    if ((this.dates.from && this.dates.from >= sevenYearsAgo) || (this.dates.to && this.dates.to >= sevenYearsAgo)) {
      if (!this.reasonLeft) {
        return false
      }

      if (!this.reasonLeft.Reason) {
        return false
      }

      if (!this.reasonLeft.Date || !this.reasonLeft.Date.date) {
        return false
      }

      if (!this.reasonLeft.Text || !this.reasonLeft.Text.value) {
        return false
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
    return new ReferenceValidator(this.reference, null).isValid()
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
