import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validPhoneNumber, validBranch, validGenericTextfield } from './helpers'

export default class DrugOrderedTreatmentsValidator {
  constructor (state) {
    this.involved = state.TreatmentOrdered
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validTreatmentOrdered () {
    return validBranch(this.involved)
  }

  validDrugOrderedTreatments () {
    if (this.validTreatmentOrdered() && this.involved === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new DrugOrderedTreatmentValidator(item.OrderedTreatment, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validTreatmentOrdered() &&
      this.validDrugOrderedTreatments()
  }
}

export class DrugOrderedTreatmentValidator {
  constructor (state = {}) {
    this.orderedBy = state.OrderedBy
    this.explanation = state.Explanation
    this.actionTaken = state.ActionTaken
    this.noActionTakenExplanation = state.NoActionTakenExplanation
    this.drugType = state.DrugType
    this.treatmentProvider = state.TreatmentProvider
    this.treatmentProviderAddress = state.TreatmentProviderAddress
    this.treatmentProviderTelephone = state.TreatmentProviderTelephone
    this.treatmentDates = state.TreatmentDates
    this.treatmentCompleted = state.TreatmentCompleted
    this.noTreatmentExplanation = state.NoTreatmentExplanation
  }

  validActionTaken () {
    switch (this.actionTaken) {
      case 'Yes':
        return validGenericTextfield(this.treatmentProvider) &&
          new LocationValidator(this.treatmentProviderAddress) &&
          validPhoneNumber(this.treatmentProviderTelephone) &&
          new DateRangeValidator(this.treatmentDates) &&
          this.validTreatmentCompleted()
      case 'No':
        return validGenericTextfield(this.noActionTakenExplanation)
      default:
        return false
    }
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
    return validGenericTextfield(this.explanation) &&
      this.validActionTaken()
  }
}
