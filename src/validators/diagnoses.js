import TreatmentValidator from './treatment'
import DiagnosisValidator from './diagnosis'
import { validBranch } from './helpers'

export default class DiagnosesValidator {
  constructor (data = {}) {
    this.diagnosed = data.Diagnosed
    this.didNotConsult = data.DidNotConsult
    this.inTreatment = data.InTreatment
    this.diagnosisList = data.DiagnosisList
    this.diagnosisListBranch = data.DiagnosisListBranch
    this.treatmentList = data.TreatmentList
    this.treatmentListBranch = data.TreatmentListBranch
  }

  validDiagnosisList () {
    if (this.diagnosed === 'No') {
      return true
    }

    if (this.diagnosed === 'Yes' && this.diagnosisList.length === 0) {
      return false
    }

    if (this.diagnosisListBranch !== 'No') {
      return false
    }

    for (let item of this.diagnosisList) {
      if (!new DiagnosisValidator(item.Item).isValid()) {
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

    if (this.treatmentListBranch !== 'No') {
      return false
    }

    for (let item of this.treatmentList) {
      if (!new TreatmentValidator(item.Item).isValid()) {
        return false
      }
    }

    return true
  }

  isValid () {
    if (!validBranch(this.diagnosed)) {
      return false
    }

    if (this.diagnosed === 'No') {
      return true
    }

    return validBranch(this.didNotConsult) &&
      validBranch(this.inTreatment) &&
      this.validDiagnosisList() &&
      this.validTreatmentList()
  }
}
