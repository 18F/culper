import { validateModel } from 'models/validate'
import diagnosis from 'models/diagnosis'

export const validateDiagnosis = (data, existingCondition = false) => (
  validateModel(data, diagnosis, { existingCondition })
)

export default class DiagnosisValidator {
  constructor(data = {}) {
    this.data = data
    this.prefix = (data || {}).prefix
  }

  validCondition() {
    return validateModel(this.data, {
      Condition: diagnosis.Condition,
    }, { existingCondition: this.prefix === 'existingConditions.diagnosis' }) === true
  }

  validEffective() {
    return validateModel(this.data, {
      Effective: diagnosis.Effective,
      Explanation: diagnosis.Explanation,
    }, { existingCondition: this.prefix === 'existingConditions.diagnosis' }) === true
  }

  isValid() {
    return validateDiagnosis(this.data, this.prefix === 'existingConditions.diagnosis') === true
  }
}

export class ExistingConditionsDiagnosisValidator extends DiagnosisValidator {
  constructor(data = {}) {
    super(data)
    this.diagnosed = data.Diagnosed || {}
    this.treatment = data.Treatment || {}
    this.effective = data.Effective || {}
    this.treatmentFacility = data.TreatmentFacility || {}
    this.explanation = data.Explanation || {}
    this.prefix = 'existingConditions.diagnosis'
  }
}
