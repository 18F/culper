import DateRangeValidator from './daterange'
import NameValidator from './name'
import LocationValidator from './location'
import { validAccordion, validGenericTextfield, validPhoneNumber, validNotApplicable } from './helpers'
import { decimalAdjust, rangeSorter, julian, findPercentage, today, daysAgo, julianNow } from '../components/Section/History/dateranges'

const minimumYears = 7
const minimumPeople = 3

export default class PeopleValidator {
  constructor (state = {}) {
    this.list = state.List || {}
  }

  validCount () {
    return ((this.list || {}).items || []).reduce((acc, cur) => {
      const valid = new PersonValidator(cur.Item).isValid()
      return valid ? acc + 1 : acc
    }, 0)
  }

  validYearRange () {
    const julianMax = julian(daysAgo(today, 365 * minimumYears))

    const dates = this.list.items.reduce((dates, item) => {
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
    if ((this.list.branch || {}).value !== 'No') {
      return false
    }

    const valid = validAccordion(this.list, (item) => {
      return new PersonValidator(item).isValid()
    })

    return valid && this.validCount() >= minimumPeople && this.validYearRange()
  }
}

export class PersonValidator {
  constructor (data = {}) {
    this.name = data.Name
    this.dates = data.Dates
    this.rank = data.Rank
    this.rankNotApplicable = data.RankNotApplicable
    this.relationship = (data.Relationship || {}).values || []
    this.relationshipOther = data.RelationshipOther
    this.mobileTelephone = data.MobileTelephone
    this.otherTelephone = data.OtherTelephone
    this.email = data.Email
    this.emailNotApplicable = data.EmailNotApplicable
    this.address = data.Address
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
