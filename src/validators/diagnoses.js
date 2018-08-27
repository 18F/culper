import TreatmentValidator from './treatment'
import DiagnosisValidator from './diagnosis'
import { validAccordion, validBranch } from './helpers'

export default class DiagnosesValidator {
  constructor(data = {}) {
    this.diagnosed = (data.Diagnosed || {}).value
    this.didNotConsult = (data.DidNotConsult || {}).value
    this.inTreatment = (data.InTreatment || {}).value
    this.diagnosisList = data.DiagnosisList
    this.treatmentList = data.TreatmentList
  }

  validDiagnosisList() {
    if (this.diagnosed === 'No') {
      return true
    }

    return validAccordion(this.diagnosisList, item => {
      return new DiagnosisValidator(item).isValid()
    })
  }

  validTreatmentList() {
    if (this.inTreatment === 'No') {
      return true
    }

    return validAccordion(this.treatmentList, item => {
      return new TreatmentValidator(item).isValid()
    })
  }

  isValid() {
    if (!validBranch(this.diagnosed)) {
      return false
    }

    if (this.diagnosed === 'No') {
      return true
    }

    return (
      validBranch(this.didNotConsult) &&
      validBranch(this.inTreatment) &&
      this.validDiagnosisList() &&
      this.validTreatmentList()
    )
  }
}
