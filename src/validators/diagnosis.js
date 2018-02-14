import DateRangeValidator from './daterange'
import TreatmentValidator from './treatment'
import { validGenericTextfield } from './helpers'

export default class DiagnosisValidator {
  constructor (data = {}) {
    this.condition = data.Condition || ''
    this.diagnosed = data.Diagnosed || {}
    this.treatment = data.Treatment || {}
    this.effective = (data.Effective || {}).value
    this.treatmentFacility = data.TreatmentFacility || {}
    this.explanation = data.Explanation || {}
    this.prefix = (data || {}).prefix
  }

  validEffective () {
    if (this.prefix === 'existingConditions.diagnosis') {
      return true
    }

    if (this.effective !== 'Yes' && this.effective !== 'No') {
      return false
    }

    if (this.effective === 'No' && !validGenericTextfield(this.explanation)) {
      return false
    }

    return true
  }

  isValid () {
    return !!this.condition &&
      new DateRangeValidator(this.diagnosed).isValid() &&
      new TreatmentValidator(this.treatment).isValid() &&
      new TreatmentValidator(this.treatmentFacility).isValid() &&
      this.validEffective()
  }
}
export class ExistingConditionsDiagnosisValidator extends DiagnosisValidator {
  constructor (data = {}) {
    super(data)
    this.condition = data.Condition || ''
    this.diagnosed = data.Diagnosed || {}
    this.treatment = data.Treatment || {}
    this.effective = data.Effective || {}
    this.treatmentFacility = data.TreatmentFacility || {}
    this.explanation = data.Explanation || {}
    this.prefix = 'existingConditions.diagnosis'
  }
}
