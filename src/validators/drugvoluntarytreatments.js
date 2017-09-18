import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validPhoneNumber, validBranch, validGenericTextfield } from './helpers'

export default class DrugVoluntaryTreatmentsValidator {
  constructor (data = {}) {
    this.involved = data.TreatmentVoluntary
    this.list = data.List
    this.listBranch = data.ListBranch
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
      const result = new DrugVoluntaryTreatmentValidator(item.Item).isValid()
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
  constructor (data = {}) {
    this.drugType = data.DrugType
    this.treatmentProvider = data.TreatmentProvider
    this.treatmentProviderAddress = data.TreatmentProviderAddress
    this.treatmentProviderTelephone = data.TreatmentProviderTelephone
    this.treatmentDates = data.TreatmentDates
    this.treatmentCompleted = data.TreatmentCompleted
    this.noTreatmentExplanation = data.NoTreatmentExplanation
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
