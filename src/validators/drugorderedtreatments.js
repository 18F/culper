import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validPhoneNumber, validBranch, validGenericTextfield } from './helpers'

export default class DrugOrderedTreatmentsValidator {
  constructor (data = {}) {
    this.involved = data.TreatmentOrdered
    this.list = data.List
    this.listBranch = data.ListBranch
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
      const result = new DrugOrderedTreatmentValidator(item.Item, null).isValid()
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
  constructor (data = {}) {
    this.orderedBy = data.OrderedBy
    this.explanation = data.Explanation
    this.actionTaken = data.ActionTaken
    this.noActionTakenExplanation = data.NoActionTakenExplanation
    this.drugType = data.DrugType
    this.treatmentProvider = data.TreatmentProvider
    this.treatmentProviderAddress = data.TreatmentProviderAddress
    this.treatmentProviderTelephone = data.TreatmentProviderTelephone
    this.treatmentDates = data.TreatmentDates
    this.treatmentCompleted = data.TreatmentCompleted
    this.noTreatmentExplanation = data.NoTreatmentExplanation
  }

  validActionTaken () {
    switch (this.actionTaken) {
      case 'Yes':
        return validGenericTextfield(this.treatmentProvider) &&
          new LocationValidator(this.treatmentProviderAddress).isValid() &&
          validPhoneNumber(this.treatmentProviderTelephone) &&
          new DateRangeValidator(this.treatmentDates).isValid() &&
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
