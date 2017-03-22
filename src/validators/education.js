import DateRangeValidator from './daterange'
import { daysAgo, today } from '../components/Section/History/dateranges'
import { validGenericTextfield } from './helpers'
import AddressValidator from './address'
import ReferenceValidator from './reference'

export default class EducationValidator {
  constructor (state, props) {
    this.hasAttended = state.HasAttended
    this.hasDegree10 = state.HasDegree10
    this.list = state.List || []
  }

  validAttendance () {
    if (!(this.hasAttended === 'No' || this.hasAttended === 'Yes')) {
      return false
    }

    if (this.hasAttended === 'No' && !(this.hasDegree10 === 'No' || this.hasDegree10 === 'Yes')) {
      return false
    }

    return true
  }

  validList () {
    if (this.hasAttended === 'No' && this.hasDegree10 === 'No') {
      return true
    }

    if (this.list && this.list.length === 0) {
      return false
    }

    for (const edu of this.list) {
      if (new EducationItemValidator(edu, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validAttendance() && this.validList()
  }
}

export class EducationItemValidator {
  constructor (state = {}, props = {}) {
    this.list = state.List
    this.dates = state.Dates
    this.address = state.Address
    this.name = state.Name
    this.type = state.Type
    this.reference = state.Reference
    this.diplomas = state.Diplomas
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validAddress () {
    return new AddressValidator(this.address, null).isValid()
  }

  validName () {
    return this.name && validGenericTextfield(this.name)
  }

  validType () {
    return this.type && this.type.length > 0
  }

  validReference () {
    const threeYearsAgo = daysAgo(today, 365 * 3)
    if ((this.dates.from.date && this.dates.from.date >= threeYearsAgo) || (this.dates.to.date && this.dates.to.date >= threeYearsAgo)) {
      return this.reference && new ReferenceValidator(this.reference, null).isValid()
    }

    return true
  }

  hasDegree () {
    return this.diplomas.filter(diploma => { return diploma.Has === 'Yes' }).length
  }

  validDiplomas () {
    // Check if we have valid yes/no values
    if (!this.diplomas || !this.diplomas.length) {
      return false
    }

    if (this.hasDegree()) {
      for (const item of this.diplomas) {
        if (item.Has !== 'Yes') {
          continue
        }
        const diploma = item.Diploma
        if (!diploma) {
          return false
        }

        if (diploma.Diploma === 'Other' && !diploma.DiplomaOther) {
          return false
        }

        if (!diploma.Date || !diploma.Date.date) {
          return false
        }
      }
    }

    return true
  }

  isValid () {
    return this.validDates() &&
      this.validAddress() &&
      this.validName() &&
      this.validType() &&
      this.validReference() &&
      this.validDiplomas()
  }
}
