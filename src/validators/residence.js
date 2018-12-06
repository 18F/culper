import DateRangeValidator from './daterange'
import LocationValidator from './location'
import NameValidator from './name'
import {
  daysAgo,
  today,
  extractDate
} from '../components/Section/History/dateranges'
import {
  validPhoneNumber,
  validNotApplicable,
  validDateField,
  validAccordion,
  validGenericTextfield
} from './helpers'

// Options for relationships
const relationshipOptions = [
  'Neighbor',
  'Friend',
  'Landlord',
  'Business',
  'Other'
]

// Options for roles
const roleOptions = ['Other', 'MilitaryHousing', 'Own', 'Rent']
const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to) => {
  return (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
}

export default class HistoryResidenceValidator {
  constructor(data = {}) {
    this.list = data.List || {}
  }

  isValid() {
    return validAccordion(this.list, item => {
      return new ResidenceValidator(item).isValid()
    })
  }
}

export class ResidenceValidator {
  constructor(data = {}) {
    this.dates = data.Dates || {}
    this.address = data.Address || {}
    this.referenceName = data.ReferenceName || {}
    this.referenceLastContact = data.ReferenceLastContact || {}
    this.referenceComments = data.ReferenceComments || {}
    this.referenceRelationship = (data.ReferenceRelationship || {}).values || []
    this.referenceRelationshipOther = data.ReferenceRelationshipOther || {}
    this.referencePhoneEvening = data.ReferencePhoneEvening || {}
    this.referencePhoneDay = data.ReferencePhoneDay || {}
    this.referencePhoneMobile = data.ReferencePhoneMobile || {}
    this.referenceEmailNotApplicable = data.ReferenceEmailNotApplicable || {}
    this.referenceEmail = data.ReferenceEmail || {}
    this.referenceAddress = data.ReferenceAddress || {}
    this.role = (data.Role || {}).value
    this.roleOther = data.RoleOther || {}
  }

  validDates() {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validAddress() {
    return new LocationValidator(this.address).isValid()
  }

  validReference() {
    const from = extractDate(this.dates.from)
    const to = extractDate(this.dates.to)
    if (withinThreeYears(from, to)) {
      const other =
        this.referenceRelationship.every(x => {
          return relationshipOptions.includes(x)
        }) ||
        (this.referenceRelationship.some(x => {
          return x === 'Other'
        }) &&
          validGenericTextfield(this.referenceRelationshipOther))
      const validRelationship = this.referenceRelationship && other
      return (
        new NameValidator(this.referenceName).isValid() &&
        validDateField(this.referenceLastContact) &&
        validPhoneNumber(this.referencePhoneEvening) &&
        validPhoneNumber(this.referencePhoneDay) &&
        validPhoneNumber(this.referencePhoneMobile) &&
        validRelationship &&
        validNotApplicable(this.referenceEmailNotApplicable, () => {
          return validGenericTextfield(this.email)
        }) &&
        new LocationValidator(this.referenceAddress).isValid()
      )
    }

    return true
  }

  /**
   * Ensures a role is selected and that if Other is marked, it requires the other information to
   * be populated.
   */
  validRole() {
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

  isValid() {
    return (
      this.validDates() &&
      this.validAddress() &&
      this.validReference() &&
      this.validRole()
    )
  }
}
