import DateRangeValidator from './daterange'
import { daysAgo, today } from '../components/Section/History/dateranges'
import { validGenericTextfield, validPhoneNumber } from './helpers'
import AddressValidator from './address'
import ReferenceValidator from './reference'

export default class EducationValidator {
  constructor (state, props) {
    this.hasAttended = state.HasAttended
    this.hasDegree10 = state.HasDegree10
    this.hasDegree = state.HasDegree
    this.dates = state.Dates
    this.address = state.Address
    this.name = state.Name
    this.type = state.Type
    this.reference = state.Reference
    this.diplomas = state.Diplomas
  }

  hasEducation () {
    return this.hasAttended === 'Yes' || this.hasDegree10 === 'Yes'
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

  validDates () {
    if (this.hasEducation()) {
      return new DateRangeValidator(this.dates, null).isValid()
    }

    return true
  }

  validAddress () {
    if (this.hasEducation()) {
      return new AddressValidator(this.address, null).isValid()
    }

    return true
  }

  validName () {
    if (this.hasEducation()) {
      return this.name && validGenericTextfield(this.name)
    }

    return true
  }

  validType () {
    if (this.hasEducation()) {
      return this.type && this.type.length > 0
    }

    return true
  }

  validReference () {
    const threeYearsAgo = daysAgo(today, 365 * 3)
    if (this.hasEducation() && ((this.dates.from && this.dates.from >= threeYearsAgo) || (this.dates.to && this.dates.to >= threeYearsAgo))) {
      return this.reference && new ReferenceValidator(this.reference, null).isValid()
    }

    return true
  }

  validDiplomas () {
    if (this.hasEducation()) {
      if (!(this.hasDegree === 'No' || this.hasDegree === 'Yes')) {
        return false
      }

      if (this.hasDegree === 'Yes') {
        if (!this.diplomas || this.diplomas.length === 0) {
          return false
        }

        for (const item of this.diplomas) {
          if (!item.Diploma) {
            return false
          }

          if (item.Diploma === 'Other' && !item.DiplomaOther) {
            return false
          }

          if (!item.Date || !item.Date.date) {
            return false
          }
        }
      }
    }

    return true
  }

  isValid () {
    return this.validAttendance() &&
      this.validDates() &&
      this.validAddress() &&
      this.validName() &&
      this.validType() &&
      this.validReference() &&
      this.validDiplomas()
  }
}
