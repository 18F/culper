import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validBranch, validGenericTextfield, validDateField } from './helpers'

export default class ReceivedCounselingsValidator {
  constructor (data = {}) {
    this.receivedTreatment = data.ReceivedTreatment
    this.list = data.List
    this.listBranch = data.ListBranch
  }

  validReceivedTreatment () {
    return validBranch(this.receivedTreatment)
  }

  validReceivedCounselings () {
    if (this.validReceivedTreatment() && this.receivedTreatment === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new ReceivedCounselingValidator(item.Item).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validReceivedTreatment() &&
      this.validReceivedCounselings()
  }
}

export class ReceivedCounselingValidator {
  constructor (data = {}) {
    this.treatmentProviderName = data.TreatmentProviderName
    this.treatmentProviderAddress = data.TreatmentProviderAddress
    this.agencyName = data.AgencyName
    this.agencyAddress = data.AgencyAddress
    this.useSameAddress = data.UseSameAddress
    this.treatmentBeganDate = data.TreatmentBeganDate
    this.treatmentEndDate = data.TreatmentEndDate
    this.completedTreatment = data.CompletedTreatment
    this.noCompletedTreatmentExplanation = data.NoCompletedTreatmentExplanation
  }

  validCompletedTreatment () {
    switch (this.completedTreatment) {
      case 'Yes':
      case 'No':
        return validGenericTextfield(this.noCompletedTreatmentExplanation)
      default:
        return false
    }
  }

  validAddress () {
    if (this.useSameAddress === 'Yes') {
      return new LocationValidator(this.treatmentProviderAddress).isValid()
    }
    return new LocationValidator(this.treatmentProviderAddress).isValid() &&
      new LocationValidator(this.agencyAddress).isValid()
  }

  isValid () {
    return validGenericTextfield(this.treatmentProviderName) &&
      validBranch(this.useSameAddress) &&
      this.validAddress() &&
      validGenericTextfield(this.agencyName) &&
      this.validCompletedTreatment() &&
      validDateField(this.treatmentBeganDate) &&
      validDateField(this.treatmentEndDate) &&
      this.treatmentBeganDate.date < this.treatmentEndDate.date
  }
}
