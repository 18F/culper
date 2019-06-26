import { validateModel, hasYesOrNo } from 'models/validate'
import alcoholVoluntaryCounseling from 'models/alcoholVoluntaryCounseling'

export const validateVoluntaryCounseling = data => (
  validateModel(data, alcoholVoluntaryCounseling) === true
)

export const validateVoluntaryCounselings = (data) => {
  const voluntaryCounselingsModel = {
    SoughtTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.SoughtTreatment
        && attributes.SoughtTreatment.value === 'Yes') {
        return { presence: true, accordion: { validator: alcoholVoluntaryCounseling } }
      }
      return {}
    },
  }

  return validateModel(data, voluntaryCounselingsModel) === true
}

export default class VoluntaryCounselingsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateVoluntaryCounselings(this.data)
  }
}

export class VoluntaryCounselingValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCompletedTreatment() {
    return validateModel(this.data, {
      CompletedTreatment: alcoholVoluntaryCounseling.CompletedTreatment,
      NoCompletedTreatmentExplanation: alcoholVoluntaryCounseling.NoCompletedTreatmentExplanation,
    }) === true
  }

  isValid() {
    return validateVoluntaryCounseling(this.data)
  }
}
