import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validGenericTextfield, validNotApplicable } from './helpers'

export default class LegalTerroristValidator {
  constructor (data = {}) {
    this.hasTerrorist = data.HasTerrorist
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasTerrorist === 'No') {
      return true
    }

    if (this.hasTerrorist === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new TerroristValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class TerroristValidator {
  constructor (data = {}) {
    this.organization = data.Organization
    this.address = data.Address
    this.dates = data.Dates
    this.positions = data.Positions
    this.positionsNotApplicable = data.PositionsNotApplicable
    this.contributions = data.Contributions
    this.contributionsNotApplicable = data.ContributionsNotApplicable
    this.reasons = data.Reasons
  }

  validOrganization () {
    return !!this.organization && validGenericTextfield(this.organization)
  }

  validAddress () {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validPositions () {
    return validNotApplicable(this.positionsNotApplicable, () => {
      return !!this.positions && validGenericTextfield(this.positions)
    })
  }

  validContributions () {
    return validNotApplicable(this.contributionsNotApplicable, () => {
      return !!this.contributions && validGenericTextfield(this.contributions)
    })
  }

  validReasons () {
    return !!this.reasons && validGenericTextfield(this.reasons)
  }

  isValid () {
    return this.validOrganization() &&
      this.validAddress() &&
      this.validDates() &&
      this.validPositions() &&
      this.validContributions() &&
      this.validReasons()
  }
}
