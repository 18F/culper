import DateRangeValidator from 'validators/daterange'
import LocationValidator from 'validators/location'
import NameValidator from 'validators/name'
import {
  validNotApplicable,
  validGenericTextfield,
  validPhoneNumber,
  validGenericMonthYear,
  validDateField,
  withinSevenYears,
  BranchCollection,
  validAccordion
} from 'validators/helpers'

export default class HistoryEmploymentValidator {
  constructor(data = {}) {
    this.list = data.List || { items: [] }
    this.employmentRecord = data.EmploymentRecord || {}
  }

  isValid() {
    if (this.employmentRecord.value !== 'No') {
      return false
    }

    return validAccordion(this.list, item => {
      return new EmploymentValidator(item).isValid()
    })
  }
}

export class EmploymentValidator {
  constructor(data = {}) {
    this.employmentActivity = data.EmploymentActivity || { value: null }
    this.dates = data.Dates || {}
    this.employment = data.Employment || {}
    this.status = data.Status || {}
    this.title = data.Title || {}
    this.dutyStation = data.DutyStation || {}
    this.address = data.Address || {}
    this.additional = data.Additional || {}
    this.telephone = data.Telephone || {}
    this.physicalAddress = data.PhysicalAddress || {}
    this.reasonLeft = data.ReasonLeft || {}
    this.reprimand = data.Reprimand || {}
    this.supervisor = data.Supervisor || {}
    this.referenceName = {hideMiddleName: true, ...data.ReferenceName} || {}
    this.referencePhone = data.ReferencePhone || {}
    this.referenceAddress = data.ReferenceAddress || {}
  }

  validDates() {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validEmployment() {
    return validGenericTextfield(this.employment)
  }

  validStatus() {
    return validGenericTextfield(this.status)
  }

  validTitle() {
    return validGenericTextfield(this.title)
  }

  validAddress() {
    return new LocationValidator(this.address).isValid()
  }

  validAdditionalActivity() {
    if (!this.additional) {
      return false
    }

    const branchValidator = new BranchCollection(this.additional)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return (
        validGenericTextfield(item.Position) &&
        validGenericTextfield(item.Supervisor) &&
        new DateRangeValidator(item.DatesEmployed).isValid()
      )
    })
  }

  validTelephone() {
    return validPhoneNumber(this.telephone)
  }

  validPhysicalAddress() {
    const differentAddress = (
      (this.physicalAddress || {}).HasDifferentAddress || {}
    ).value
    if (
      !this.physicalAddress ||
      !(differentAddress === 'No' || differentAddress === 'Yes')
    ) {
      return false
    }

    if (differentAddress === 'Yes') {
      return (
        this.physicalAddress.Address &&
        new LocationValidator(this.physicalAddress.Address).isValid()
      )
    }

    return true
  }

  validReasonLeft() {
    if (this.dates.present !== true ) {
      if (!this.reasonLeft || !this.reasonLeft.ReasonDescription) {
        return false
      }

      if (!validGenericTextfield(this.reasonLeft.ReasonDescription)) {
        return false
      }

      if (this.withinSevenYears()) {
        if (!this.reasonLeft.Reasons) {
          return false
        }

        const branchValidator = new BranchCollection(this.reasonLeft.Reasons)
        if (!branchValidator.validKeyValues()) {
          return false
        }

        if (!branchValidator.hasNo()) {
          return false
        }

        return branchValidator.each(item => {
          return (
            validGenericTextfield(item.Reason) &&
            validDateField(item.Date) &&
            validGenericTextfield(item.Text)
          )
        })
      }
    }

    return true
  }

  validSupervisor() {
    return (
      this.supervisor &&
      validGenericTextfield(this.supervisor.SupervisorName) &&
      validGenericTextfield(this.supervisor.Title) &&
      validNotApplicable(this.supervisor.EmailNotApplicable, () => {
        return validGenericTextfield(this.supervisor.Email)
      }) &&
      new LocationValidator(this.supervisor.Address).isValid() &&
      validPhoneNumber(this.supervisor.Telephone)
    )
  }

  validReference() {
    return (
      new NameValidator(this.referenceName).isValid() &&
      validPhoneNumber(this.referencePhone) &&
      new LocationValidator(this.referenceAddress).isValid()
    )
  }

  validReprimand() {
    if (this.withinSevenYears()) {
      const branchValidator = new BranchCollection(this.reprimand)
      if (!branchValidator.validKeyValues()) {
        return false
      }

      if (!branchValidator.hasNo()) {
        return false
      }

      return branchValidator.each(item => {
        return (
          validGenericTextfield(item.Text) && validGenericMonthYear(item.Date)
        )
      })
    }

    return true
  }

  withinSevenYears() {
    return withinSevenYears(this.dates.from, this.dates.to)
  }

  validAssignedDuty() {
    return validGenericTextfield(this.dutyStation)
  }

  isValid() {
    switch (this.employmentActivity.value) {
      case 'ActiveMilitary':
      case 'NationalGuard':
      case 'USPHS':
        // Active Duty, National Guard/Reserve, or USPHS Commissioned Corps
        return (
          this.validDates() &&
          this.validTitle() &&
          this.validAssignedDuty() &&
          this.validStatus() &&
          this.validAddress() &&
          this.validTelephone() &&
          this.validSupervisor() &&
          this.validReasonLeft() &&
          this.validReprimand()
        )

      case 'OtherFederal':
      case 'StateGovernment':
      case 'FederalContractor':
      case 'NonGovernment':
      case 'Other':
        // Other Federal employment, State Government, Federal Contractor, Non-government employment, or Other
        return (
          this.validDates() &&
          this.validTitle() &&
          this.validEmployment() &&
          this.validStatus() &&
          this.validAddress() &&
          this.validPhysicalAddress() &&
          this.validTelephone() &&
          this.validSupervisor() &&
          this.validAdditionalActivity() &&
          this.validReasonLeft() &&
          this.validReprimand()
        )

      case 'SelfEmployment':
        // Self employment
        return (
          this.validDates() &&
          this.validTitle() &&
          this.validEmployment() &&
          this.validStatus() &&
          this.validAddress() &&
          this.validPhysicalAddress() &&
          this.validTelephone() &&
          this.validReference() &&
          this.validReasonLeft() &&
          this.validReprimand()
        )

      case 'Unemployment':
        // Unemployment
        return this.validDates() && this.validReference()

      default:
        return false
    }
  }
}
