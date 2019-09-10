import { validateModel, hasYesOrNo } from 'models/validate'
import alcoholVoluntaryCounseling from 'models/alcoholVoluntaryCounseling'

export const validateVoluntaryCounseling = data => (
  validateModel(data, alcoholVoluntaryCounseling)
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

  return validateModel(data, voluntaryCounselingsModel)
}
