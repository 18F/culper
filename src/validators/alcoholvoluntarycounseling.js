import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validBranch, validGenericTextfield, validPhoneNumber } from './helpers'

export default class VoluntaryCounselingsValidator {
  constructor (data = {}) {
    this.soughtTreatment = (data.SoughtTreatment || {}).value
    this.list = data.List
    this.listBranch = data.ListBranch
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
      const result = new VoluntaryCounselingValidator(item.Item).isValid()
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
  constructor (data = {}) {
    this.counselingDates = data.CounselingDates
    this.treatmentProviderName = data.TreatmentProviderName
    this.treatmentProviderAddress = data.TreatmentProviderAddress
    this.treatmentProviderTelephone = data.TreatmentProviderTelephone
    this.completedTreatment = (data.CompletedTreatment || {}).value
    this.noCompletedTreatmentExplanation = data.NoCompletedTreatmentExplanation
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
