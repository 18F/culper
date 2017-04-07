import AddressValidator from './address'
import DateRangeValidator from './daterange'
import TreatmentValidator from './treatment'
import DiagnosisValidator from './diagnosis'
import { validGenericTextfield, validGenericMonthYear, validBranch } from './helpers'

export default class DiagnosesValidator {
  constructor (state = {}, props = {}) {
    this.diagnosed = state.Diagnosed
    this.didNotConsult = state.DidNotConsult
    this.inTreatment = state.InTreatment
    this.diagnosisList = state.DiagnosisList
    this.treatmentList = state.TreatmentList
  }

  validDiagnosisList () {
    if (this.diagnosed === 'No') {
      return true
    }

    if (this.diagnosed === 'Yes' && this.diagnosisList.length === 0) {
      return false
    }

    for (let item of this.diagnosisList) {
      if (!new DiagnosisValidator(item.Diagnosis).isValid()) {
        return false
      }
    }
    return true
  }

  validTreatmentList () {
    if (this.inTreatment === 'No') {
      return true
    }

    if (this.inTreatment === 'Yes' && this.treatmentList.length === 0) {
      return false
    }

    for (let item of this.treatmentList) {
      if (!new TreatmentValidator(item.Treatment).isValid()) {
        return false
      }
    }
    return true
  }

  isValid () {
    return validBranch(this.diagnosed) &&
      validBranch(this.didNotConsult) &&
      validBranch(this.inTreatment) &&
      this.validDiagnosisList() &&
      this.validTreatmentList()
  }
}

