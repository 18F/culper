import DateRangeValidator from './daterange'
import LocationValidator from './location'
import {
  validAccordion,
  validPhoneNumber,
  validBranch,
  validGenericTextfield
} from './helpers'

export default class DrugOrderedTreatmentsValidator {
  constructor(data = {}) {
    this.involved = (data.TreatmentOrdered || {}).value
    this.list = data.List
  }

  validTreatmentOrdered() {
    return validBranch(this.involved)
  }

  validDrugOrderedTreatments() {
    if (this.validTreatmentOrdered() && this.involved === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DrugOrderedTreatmentValidator(item).isValid()
    })
  }

  isValid() {
    return this.validTreatmentOrdered() && this.validDrugOrderedTreatments()
  }
}

export class DrugOrderedTreatmentValidator {
  constructor(data = {}) {
    this.orderedBy = data.OrderedBy
    this.explanation = data.Explanation
    this.actionTaken = (data.ActionTaken || {}).value
    this.noActionTakenExplanation = data.NoActionTakenExplanation
    this.drugType = data.DrugType
    this.treatmentProvider = data.TreatmentProvider
    this.treatmentProviderAddress = data.TreatmentProviderAddress
    this.treatmentProviderTelephone = data.TreatmentProviderTelephone
    this.treatmentDates = data.TreatmentDates
    this.treatmentCompleted = (data.TreatmentCompleted || {}).value
    this.noTreatmentExplanation = data.NoTreatmentExplanation
  }

  validActionTaken() {
    switch (this.actionTaken) {
      case 'Yes':
        return (
          validGenericTextfield(this.treatmentProvider) &&
          new LocationValidator(this.treatmentProviderAddress).isValid() &&
          validPhoneNumber(this.treatmentProviderTelephone) &&
          new DateRangeValidator(this.treatmentDates).isValid() &&
          this.validTreatmentCompleted()
        )
      case 'No':
        return validGenericTextfield(this.noActionTakenExplanation)
      default:
        return false
    }
  }

  validTreatmentCompleted() {
    switch (this.treatmentCompleted) {
      case 'Yes':
        return true
      case 'No':
        return validGenericTextfield(this.noTreatmentExplanation)
      default:
        return false
    }
  }

  isValid() {
    return validGenericTextfield(this.explanation) && this.validActionTaken() && this.validOrderedBy()
  }

  validOrderedBy() {
    if (this.orderedBy.length <= 1) {
      return true
    }
    else {
      if (this.orderedBy.includes("None")) {
        return false
      }
      return true
    }
  }
}
