import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

export default class ForeignTravelValidator {
  constructor(data = {}) {
    this.hasForeignTravelOutside = (data.HasForeignTravelOutside || {}).value
    this.hasForeignTravelOfficial = (data.HasForeignTravelOfficial || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasForeignTravelOutside === 'No') {
      return true
    }

    if (this.hasForeignTravelOfficial === 'Yes') {
      return true
    }

    if (this.hasForeignTravelOfficial === 'Yes') {
      return true
    }

    return validAccordion(this.list, item => {
      return new TravelValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class TravelValidator {
  constructor(data = {}) {
    this.dates = data.Dates
    this.country = data.Country
    this.days = (data.Days || {}).values || []
    this.purpose = (data.Purpose || {}).values || []
    this.questioned = (data.Questioned || {}).value
    this.questionedExplanation = data.QuestionedExplanation
    this.encounter = (data.Encounter || {}).value
    this.encounterExplanation = data.EncounterExplanation
    this.contacted = (data.Contacted || {}).value
    this.contactedExplanation = data.ContactedExplanation
    this.counter = (data.Counter || {}).value
    this.counterExplanation = data.CounterExplanation
    this.interest = (data.Interest || {}).value
    this.interestExplanation = data.InterestExplanation
    this.sensitive = (data.Sensitive || {}).value
    this.sensitiveExplanation = data.SensitiveExplanation
    this.threatened = (data.Threatened || {}).value
    this.threatenedExplanation = data.ThreatenedExplanation
  }

  validCountry() {
    return !!this.country && !!this.country.value
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validDays() {
    const options = [
      '1-5',
      '6-10',
      '11-20',
      '21-30',
      'More than 30',
      'Many short trips'
    ]
    return (
      !!this.days &&
      this.days.length > 0 &&
      this.days.every(x => options.includes(x))
    )
  }

  validPurpose() {
    const options = [
      'Business',
      'Volunteer',
      'Education',
      'Tourism',
      'Conference',
      'Family',
      'Other'
    ]
    return (
      !!this.purpose &&
      this.purpose.length > 0 &&
      this.purpose.every(x => options.includes(x))
    )
  }

  validQuestioned() {
    return (
      !!this.questioned &&
      ((this.questioned === 'Yes' &&
        validGenericTextfield(this.questionedExplanation)) ||
        this.questioned === 'No')
    )
  }

  validEncounter() {
    return (
      !!this.encounter &&
      ((this.encounter === 'Yes' &&
        validGenericTextfield(this.encounterExplanation)) ||
        this.encounter === 'No')
    )
  }

  validContacted() {
    return (
      !!this.contacted &&
      ((this.contacted === 'Yes' &&
        validGenericTextfield(this.contactedExplanation)) ||
        this.contacted === 'No')
    )
  }

  validCounter() {
    return (
      !!this.counter &&
      ((this.counter === 'Yes' &&
        validGenericTextfield(this.counterExplanation)) ||
        this.counter === 'No')
    )
  }

  validInterest() {
    return (
      !!this.interest &&
      ((this.interest === 'Yes' &&
        validGenericTextfield(this.interestExplanation)) ||
        this.interest === 'No')
    )
  }

  validSensitive() {
    return (
      !!this.sensitive &&
      ((this.sensitive === 'Yes' &&
        validGenericTextfield(this.sensitiveExplanation)) ||
        this.sensitive === 'No')
    )
  }

  validThreatened() {
    return (
      !!this.threatened &&
      ((this.threatened === 'Yes' &&
        validGenericTextfield(this.threatenedExplanation)) ||
        this.threatened === 'No')
    )
  }

  isValid() {
    return (
      this.validCountry() &&
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
    )
  }
}
