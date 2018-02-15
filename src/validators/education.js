import DateRangeValidator from './daterange'
import { daysAgo, today } from '../components/Section/History/dateranges'
import { BranchCollection, validDateField, validAccordion, validNotApplicable, validPhoneNumber, validGenericTextfield } from './helpers'
import LocationValidator from './location'
import NameValidator from './name'

export default class HistoryEducationValidator {
  constructor (data = {}) {
    data = data.value || data || {}
    this.hasAttended = (data.HasAttended || {}).value
    this.hasDegree10 = (data.HasDegree10 || {}).value
    this.list = data.List || {}
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

    return validAccordion(this.list, (item) => {
      return new EducationItemValidator(item).isValid()
    })
  }

  isValid () {
    return this.validAttendance() && this.validList()
  }
}

export class EducationItemValidator {
  constructor (data = {}) {
    this.dates = data.Dates || {}
    this.address = data.Address || {}
    this.name = data.Name || {}
    this.type = (data.Type || {}).value
    this.referenceName = data.ReferenceName || {}
    this.referenceNameNotApplicable = data.ReferenceNameNotApplicable || { applicable: true }
    this.referencePhone = data.ReferencePhone || {}
    this.referenceEmailNotApplicable = data.ReferenceEmailNotApplicable || {}
    this.referenceEmail = data.ReferenceEmail || {}
    this.referenceAddress = data.ReferenceAddress || {}
    this.diplomas = data.Diplomas || { items: [] }
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validAddress () {
    return new LocationValidator(this.address).isValid()
  }

  validName () {
    return this.name && validGenericTextfield(this.name)
  }

  validType () {
    return (!!this.type && this.type.length > 0)
  }

  validReference () {
    const threeYearsAgo = daysAgo(today, 365 * 3)
    if ((this.dates.from.date && this.dates.from.date >= threeYearsAgo) || (this.dates.to.date && this.dates.to.date >= threeYearsAgo)) {
      if ((this.referenceNameNotApplicable || {}).applicable === false) {
        return true
      }

      return validNotApplicable(this.referenceNameNotApplicable, () => { return new NameValidator(this.referenceName).isValid() }) &&
        validPhoneNumber(this.referencePhone) &&
        validNotApplicable(this.referenceEmailNotApplicable, () => { return validGenericTextfield(this.referenceEmail) }) &&
        new LocationValidator(this.referenceAddress).isValid()
    }

    return true
  }

  validDiplomas () {
    const branchValidator = new BranchCollection(this.diplomas)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (!branchValidator.hasNo()) {
      return false
    }

    return branchValidator.each(item => {
      // If the diploma type is "Other" then they must give it a name
      if  ((item.Diploma || {}).value === 'Other' && !validGenericTextfield(item.DiplomaOther)) {
        return false
      }
      return validGenericTextfield(item.Diploma) && validDateField(item.Date)
    })
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
