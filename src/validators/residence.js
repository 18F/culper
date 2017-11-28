import DateRangeValidator from './daterange'
import LocationValidator from './location'
import ReferenceValidator from './reference'
import { daysAgo, today } from '../components/Section/History/dateranges'
import { validAccordion, validGenericTextfield } from './helpers'

// Options for roles
const roleOptions = ['Other', 'Military', 'Owned', 'Rented']
const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to) => {
  return (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
}

export default class HistoryResidenceValidator {
  constructor (data = {}) {
    this.List = data.List || {}
  }

  isValid () {
    return validAccordion(this.list, (item) => {
      return new ResidenceValidator(item).isValid()
    })
  }
}

export class ResidenceValidator {
  constructor (data = {}) {
    this.dates = data.Dates || {}
    this.address = data.Address || {}
    this.reference = data.Reference || {}
    this.role = (data.Role || {}).value
    this.roleOther = data.RoleOther || {}
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validAddress () {
    return new LocationValidator(this.address).isValid()
  }

  validReference () {
    if (withinThreeYears(this.dates.from.date, this.dates.to.date)) {
      return new ReferenceValidator(this.reference, null).isValid()
    }

    return true
  }

  /**
   * Ensures a role is selected and that if Other is marked, it requires the other information to
   * be populated.
   */
  validRole () {
    if (!this.role) {
      return false
    }

    if (!roleOptions.includes(this.role)) {
      return false
    }

    if (this.role === 'Other' && !validGenericTextfield(this.roleOther)) {
      return false
    }
    return true
  }

  isValid () {
    return this.validDates() &&
      this.validAddress() &&
      this.validReference() &&
      this.validRole()
  }
}
