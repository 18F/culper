import DateRangeValidator from './daterange'
import LocationValidator from './location'
import {
  validAccordion,
  validGenericTextfield,
  validNotApplicable
} from './helpers'

export default class LegalAssociationViolenceValidator {
  constructor(data = {}) {
    this.hasViolence = (data.HasViolence || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasViolence === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new ViolenceValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class ViolenceValidator {
  constructor(data = {}) {
    this.organization = data.Organization
    this.address = data.Address
    this.dates = data.Dates
    this.positions = data.Positions
    this.positionsNotApplicable = data.PositionsNotApplicable
    this.contributions = data.Contributions
    this.contributionsNotApplicable = data.ContributionsNotApplicable
    this.reasons = data.Reasons
  }

  validOrganization() {
    return !!this.organization && validGenericTextfield(this.organization)
  }

  validAddress() {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validPositions() {
    return validNotApplicable(this.positionsNotApplicable, () => {
      return !!this.positions && validGenericTextfield(this.positions)
    })
  }

  validContributions() {
    return validNotApplicable(this.contributionsNotApplicable, () => {
      return !!this.contributions && validGenericTextfield(this.contributions)
    })
  }

  validReasons() {
    return !!this.reasons && validGenericTextfield(this.reasons)
  }

  isValid() {
    return (
      this.validOrganization() &&
      this.validAddress() &&
      this.validDates() &&
      this.validPositions() &&
      this.validContributions() &&
      this.validReasons()
    )
  }
}
