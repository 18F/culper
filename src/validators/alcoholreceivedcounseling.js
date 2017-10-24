import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validAccordion, validBranch, validGenericTextfield, validDateField } from './helpers'

export default class ReceivedCounselingsValidator {
  constructor (data = {}) {
    this.receivedTreatment = (data.ReceivedTreatment || {}).value
    this.list = data.List || {}
  }

  validReceivedTreatment () {
    return validBranch(this.receivedTreatment)
  }

  validReceivedCounselings () {
    if (this.validReceivedTreatment() && this.receivedTreatment === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new ReceivedCounselingValidator(item).isValid()
    })
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
    this.useSameAddress = (data.UseSameAddress || {}).value
    this.treatmentBeganDate = data.TreatmentBeganDate
    this.treatmentEndDate = data.TreatmentEndDate
    this.completedTreatment = (data.CompletedTreatment || {}).value
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
