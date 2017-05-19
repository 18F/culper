import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class ForeignTravelValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignTravelOutside = props.HasForeignTravelOutside
    this.hasForeignTravelOfficial = props.HasForeignTravelOfficial
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  validList () {
    if (this.hasForeignTravelOutside === 'No' && this.hasForeignTravelOfficial === 'Yes') {
      return true
    }

    if (this.hasForeignTravelOutside === 'Yes' && this.hasForeignTravelOfficial === 'No') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new TravelValidator(null, item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class TravelValidator {
  constructor (state = {}, props = {}) {
    this.dates = props.Dates
    this.country = props.Country
    this.days = props.Days || []
    this.purpose = props.Purpose || []
    this.questioned = props.Questioned
    this.questionedExplanation = props.QuestionedExplanation
    this.encounter = props.Encounter
    this.encounterExplanation = props.EncounterExplanation
    this.contacted = props.Contacted
    this.contactedExplanation = props.ContactedExplanation
    this.counter = props.Counter
    this.counterExplanation = props.CounterExplanation
    this.interest = props.Interest
    this.interestExplanation = props.InterestExplanation
    this.sensitive = props.Sensitive
    this.sensitiveExplanation = props.SensitiveExplanation
    this.threatened = props.Threatened
    this.threatenedExplanation = props.ThreatenedExplanation
  }

  validCountry () {
    return !!this.country && !!this.country.value
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validDays () {
    const options = ['1-5', '6-10', '11-20', '21-30', 'More than 30', 'Many short trips']
    return !!this.days && this.days.length > 0 && this.days.every(x => options.includes(x))
  }

  validPurpose () {
    const options = ['Business', 'Volunteer', 'Education', 'Tourism', 'Conference', 'Family', 'Other']
    return !!this.purpose && this.purpose.length > 0 && this.purpose.every(x => options.includes(x))
  }

  validQuestioned () {
    return !!this.questioned &&
      ((this.questioned === 'Yes' && validGenericTextfield(this.questionedExplanation)) ||
       (this.questioned === 'No'))
  }

  validEncounter () {
    return !!this.encounter &&
      ((this.encounter === 'Yes' && validGenericTextfield(this.encounterExplanation)) ||
       (this.encounter === 'No'))
  }

  validContacted () {
    return !!this.contacted &&
      ((this.contacted === 'Yes' && validGenericTextfield(this.contactedExplanation)) ||
       (this.contacted === 'No'))
  }

  validCounter () {
    return !!this.counter &&
      ((this.counter === 'Yes' && validGenericTextfield(this.counterExplanation)) ||
       (this.counter === 'No'))
  }

  validInterest () {
    return !!this.interest &&
      ((this.interest === 'Yes' && validGenericTextfield(this.interestExplanation)) ||
       (this.interest === 'No'))
  }

  validSensitive () {
    return !!this.sensitive &&
      ((this.sensitive === 'Yes' && validGenericTextfield(this.sensitiveExplanation)) ||
       (this.sensitive === 'No'))
  }

  validThreatened () {
    return !!this.threatened &&
      ((this.threatened === 'Yes' && validGenericTextfield(this.threatenedExplanation)) ||
       (this.threatened === 'No'))
  }

  isValid () {
    return this.validCountry() &&
      this.validDates() &&
      this.validDays() &&
      this.validPurpose() &&
      this.validQuestioned() &&
      this.validEncounter() &&
      this.validContacted() &&
      this.validCounter() &&
      this.validInterest() &&
      this.validSensitive() &&
      this.validThreatened()
  }
}
