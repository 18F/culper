import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validBranch, validGenericTextfield, validPhoneNumber } from './helpers'

export default class OrderedCounselingsValidator {
  constructor (state, props) {
    this.hasBeenOrdered = state.HasBeenOrdered
    this.list = state.List
    this.listBranch = state.ListBranch
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
      const result = new OrderedCounselingValidator(item.OrderedCounseling, null).isValid()
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
  constructor (state, props) {
    this.seekers = state.Seekers
    this.otherSeeker = state.OtherSeeker
    this.actionTaken = state.ActionTaken
    this.noActionTakenExplanation = state.NoActionTakenExplanation
    this.counselingDates = state.CounselingDates
    this.treatmentProviderName = state.TreatmentProviderName
    this.treatmentProviderAddress = state.TreatmentProviderAddress
    this.treatmentProviderTelephone = state.TreatmentProviderTelephone
    this.completedTreatment = state.CompletedTreatment
    this.noCompletedTreatmentExplanation = state.NoCompletedTreatmentExplanation
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
      new AddressValidator(this.treatmentProviderAddress).isValid() &&
      validPhoneNumber(this.treatmentProviderTelephone) &&
      this.validCompletedTreatment()
  }

  isValid () {
    return this.validSeekers() &&
      this.validActionTaken()
  }
}
