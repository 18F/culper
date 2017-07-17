import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validBranch, validGenericTextfield, validPhoneNumber } from './helpers'

export default class VoluntaryCounselingsValidator {
  constructor (state, props) {
    this.soughtTreatment = state.SoughtTreatment
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validSoughtTreatment () {
    return validBranch(this.soughtTreatment)
  }

  validVoluntaryCounselings () {
    if (this.validSoughtTreatment() && this.soughtTreatment === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new VoluntaryCounselingValidator(item.VoluntaryCounseling, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validSoughtTreatment() &&
      this.validVoluntaryCounselings()
  }
}

export class VoluntaryCounselingValidator {
  constructor (state, props) {
    this.counselingDates = state.CounselingDates
    this.treatmentProviderName = state.TreatmentProviderName
    this.treatmentProviderAddress = state.TreatmentProviderAddress
    this.treatmentProviderTelephone = state.TreatmentProviderTelephone
    this.completedTreatment = state.CompletedTreatment
    this.noCompletedTreatmentExplanation = state.NoCompletedTreatmentExplanation
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

  isValid () {
    return new DateRangeValidator(this.counselingDates).isValid() &&
      validGenericTextfield(this.treatmentProviderName) &&
      new LocationValidator(this.treatmentProviderAddress).isValid() &&
      validPhoneNumber(this.treatmentProviderTelephone) &&
      this.validCompletedTreatment()
  }
}
