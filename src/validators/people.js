import DateRangeValidator from './daterange'
import NameValidator from './name'
import LocationValidator from './location'
import { validGenericTextfield, validPhoneNumber, validNotApplicable } from './helpers'
import { decimalAdjust, rangeSorter, julian, findPercentage, today, daysAgo, julianNow } from '../components/Section/History/dateranges'

const minimumYears = 7
const minimumPeople = 3

export default class PeopleValidator {
  constructor (state = {}) {
    this.people = state.List || []
    this.listBranch = state.ListBranch
  }

  validCount () {
    return this.people.length
  }

  validYearRange () {
    const julianMax = julian(daysAgo(today, 365 * minimumYears))

    const dates = this.people.reduce((dates, item) => {
      if (!item || !item.Item || !item.Item.Dates) {
        return dates
      }

      const knownDates = item.Item.Dates
      if (knownDates.from.date && knownDates.to.date) {
        return dates.concat(item.Item.Dates)
      }
      return dates
    }, [])

    const ranges = dates.sort(rangeSorter).map((dates) => {
      let left = 0
      let width = 0

      if (dates.from && dates.from.date && dates.to && dates.to.date) {
        const from = julian(dates.from.date)
        const to = julian(dates.to.date)

        if (dates.from.date >= julianMax || to >= julianMax) {
          // Meat of the calculations into percentages
          let right = findPercentage(julianNow, julianMax, to)
          left = findPercentage(julianNow, julianMax, from)
          width = Math.abs(right - left)

          // Check boundaries
          if (width < 0) {
            width = 0
          }

          if (width > 100) {
            width -= Math.abs(left)
          }

          if (left < 0) {
            left = 0
          }
        }
      }

      // Add the range to the collection
      return {
        left: left,
        width: decimalAdjust('round', width, -2),
        dates: dates
      }
    })

    const sum = ranges.reduce((a, b) => a + b.width, 0)
    return Math.min(decimalAdjust('floor', minimumYears * (sum / 100), 0), minimumYears) >= minimumYears
  }

  isValid () {
    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.people) {
      if (!new PersonValidator(item.Item).isValid()) {
        return false
      }
    }

    return this.validCount() >= minimumPeople && this.validYearRange()
  }
}

export class PersonValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.dates = state.Dates
    this.rank = state.Rank
    this.rankNotApplicable = state.RankNotApplicable
    this.relationship = state.Relationship
    this.relationshipOther = state.RelationshipOther
    this.mobileTelephone = state.MobileTelephone
    this.otherTelephone = state.OtherTelephone
    this.email = state.Email
    this.emailNotApplicable = state.EmailNotApplicable
    this.address = state.Address
  }

  validRelationship () {
    if (!this.relationship || !this.relationship.length) {
      return false
    }
    for (let r of this.relationship) {
      if (!['Neighbor', 'Friend', 'Landlord', 'Business', 'Other'].includes(r)) {
        return false
      }
    }
    if (this.relationship.includes('Other')) {
      return validGenericTextfield(this.relationshipOther)
    }
    return true
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validNotApplicable(this.rankNotApplicable, () => {
        return validGenericTextfield(this.rank)
      }) && new DateRangeValidator(this.dates).isValid() &&
      this.validRelationship() &&
      validPhoneNumber(this.mobileTelephone) &&
      validPhoneNumber(this.otherTelephone) &&
      validNotApplicable(this.emailNotApplicable, () => {
        return validGenericTextfield(this.email)
      }) && new LocationValidator(this.address).isValid()
  }
}
