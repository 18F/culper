import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validPhoneNumber, validBranch, validGenericTextfield } from './helpers'

export default class DrugVoluntaryTreatmentsValidator {
  constructor (state) {
    this.involved = state.TreatmentVoluntary
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validTreatmentVoluntary () {
    return validBranch(this.involved)
  }

  validDrugVoluntaryTreatments () {
    if (this.validTreatmentVoluntary() && this.involved === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new DrugVoluntaryTreatmentValidator(item.VoluntaryTreatment, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validTreatmentVoluntary() &&
      this.validDrugVoluntaryTreatments()
  }
}

export class DrugVoluntaryTreatmentValidator {
  constructor (state = {}) {
    this.drugType = state.DrugType
    this.treatmentProvider = state.TreatmentProvider
    this.treatmentProviderAddress = state.TreatmentProviderAddress
    this.treatmentProviderTelephone = state.TreatmentProviderTelephone
    this.treatmentDates = state.TreatmentDates
    this.treatmentCompleted = state.TreatmentCompleted
    this.noTreatmentExplanation = state.NoTreatmentExplanation
  }

  validTreatmentCompleted () {
    switch (this.treatmentCompleted) {
      case 'Yes':
        return true
      case 'No':
        return validGenericTextfield(this.noTreatmentExplanation)
      default:
        return false
    }
  }

  isValid () {
    return validGenericTextfield(this.treatmentProvider) &&
      new LocationValidator(this.treatmentProviderAddress) &&
      validPhoneNumber(this.treatmentProviderTelephone) &&
      new DateRangeValidator(this.treatmentDates) &&
      this.validTreatmentCompleted()
  }
}
