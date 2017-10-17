import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validBranch, validGenericTextfield, validPhoneNumber } from './helpers'

export default class OrderedCounselingsValidator {
  constructor (data = {}) {
    this.hasBeenOrdered = (data.HasBeenOrdered || {}).value
    this.list = data.List
    this.listBranch = data.ListBranch
  }

  validHasBeenOrdered () {
    return validBranch(this.hasBeenOrdered)
  }

  validOrderedCounselings () {
    if (this.validHasBeenOrdered() && this.hasBeenOrdered === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new OrderedCounselingValidator(item.Item).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasBeenOrdered() &&
      this.validOrderedCounselings()
  }
}

export class OrderedCounselingValidator {
  constructor (data = {}) {
    this.seekers = data.Seekers
    this.otherSeeker = data.OtherSeeker
    this.actionTaken = (data.ActionTaken || {}).value
    this.noActionTakenExplanation = data.NoActionTakenExplanation
    this.counselingDates = data.CounselingDates
    this.treatmentProviderName = data.TreatmentProviderName
    this.treatmentProviderAddress = data.TreatmentProviderAddress
    this.treatmentProviderTelephone = data.TreatmentProviderTelephone
    this.completedTreatment = (data.CompletedTreatment || {}).value
    this.noCompletedTreatmentExplanation = data.NoCompletedTreatmentExplanation
  }

  validSeekers () {
    if (this.seekers && this.seekers.includes('Other')) {
      return validGenericTextfield(this.otherSeeker)
    }
    return true
  }

  validActionTaken () {
    if (!validBranch(this.actionTaken)) {
      return false
    }
    switch (this.actionTaken) {
      case 'Yes':
        return this.validActionTakenYes()
      case 'No':
        return validGenericTextfield(this.noActionTakenExplanation)
    }
  }

  validCompletedTreatment () {
    switch (this.completedTreatment) {
      case 'Yes':
        return true
      case 'No':
        return validGenericTextfield(this.noCompletedTreatmentExplanation)
      default:
        return false
    }
  }

  validActionTakenYes () {
    return new DateRangeValidator(this.counselingDates).isValid() &&
      validGenericTextfield(this.treatmentProviderName) &&
      new LocationValidator(this.treatmentProviderAddress).isValid() &&
      validPhoneNumber(this.treatmentProviderTelephone) &&
      this.validCompletedTreatment()
  }

  isValid () {
    return this.validSeekers() &&
      this.validActionTaken()
  }
}
