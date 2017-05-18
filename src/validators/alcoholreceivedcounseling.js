import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validBranch, validGenericTextfield, validPhoneNumber } from './helpers'

export default class ReceivedCounselingsValidator {
  constructor (state, props) {
    this.receivedTreatment = state.ReceivedTreatment
    this.list = state.List
    this.listBranch = state.ListBranch
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
      const result = new ReceivedCounselingValidator(item.ReceivedCounseling, null).isValid()
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
  constructor (state, props) {
    this.treatmentProviderName = state.TreatmentProviderName
    this.treatmentProviderAddress = state.TreatmentProviderAddress
    this.agencyName = state.AgencyName
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
    return validGenericTextfield(this.treatmentProviderName) &&
      new AddressValidator(this.treatmentProviderAddress).isValid() &&
      validGenericTextfield(this.agencyName) &&
      this.validCompletedTreatment()
  }
}
