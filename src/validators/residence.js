import { validateModel } from 'models/validate'
import residence from 'models/residence'

import DateRangeValidator from './daterange'
import LocationValidator from './location'
import NameValidator from './name'
import {
  daysAgo,
  today,
  extractDate,
} from '../components/Section/History/dateranges'
import {
  validPhoneNumber,
  validNotApplicable,
  validDateField,
  validAccordion,
  validGenericTextfield,
} from './helpers'

// import { validateCollection } from 'helpers/validation'

// Options for relationships
const relationshipOptions = [
  'Neighbor',
  'Friend',
  'Landlord',
  'Business',
  'Other',
]

// Options for roles
const roleOptions = ['Other', 'MilitaryHousing', 'Own', 'Rent']

const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to) => (
  (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
)

export const validateResidence = (data) => {
  const modelData = {
    ...data,
    Role: data.Role ? data.Role.value : null,
    ReferenceEmail: data.ReferenceEmail ? data.ReferenceEmail.value : null,
    ReferenceRelationship: data.ReferenceRelationship ? data.ReferenceRelationship.values : [],
  }

  return validateModel(modelData, residence)
}

export class ResidenceValidator {
  constructor(data = {}) {
    this.data = data

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
      const other = this.referenceRelationship.every(x => relationshipOptions.includes(x))
        || (this.referenceRelationship.some(x => x === 'Other')
        && validGenericTextfield(this.referenceRelationshipOther))

      const validRelationship = this.referenceRelationship && other

      return (
        new NameValidator(this.referenceName).isValid()
          && validDateField(this.referenceLastContact)
          && validPhoneNumber(this.referencePhoneEvening)
          && validPhoneNumber(this.referencePhoneDay)
          && validPhoneNumber(this.referencePhoneMobile)
          && validRelationship
          && validNotApplicable(this.referenceEmailNotApplicable, () => (
            validGenericTextfield(this.referenceEmail)
          ))
          && new LocationValidator(this.referenceAddress).isValid()
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
    // console.log(validateResidence(this.data))

    return (
      this.validDates()
        && this.validAddress()
        && this.validReference()
        && this.validRole()
    )
  }
}

export default class HistoryResidenceValidator {
  constructor(data = {}) {
    this.list = data.List || {}
  }

  isValid() {
    return validAccordion(this.list, item => new ResidenceValidator(item).isValid())
  }
}
