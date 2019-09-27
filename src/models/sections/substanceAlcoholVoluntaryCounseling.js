import { hasYesOrNo } from 'models/validate'
import alcoholVoluntaryCounseling from 'models/alcoholVoluntaryCounseling'

const substanceAlcoholVoluntaryCounselingModel = {
  SoughtTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.SoughtTreatment
      && attributes.SoughtTreatment.value === 'Yes') {
      return { presence: true, accordion: { validator: alcoholVoluntaryCounseling } }
    }
    return {}
  },
}

export default substanceAlcoholVoluntaryCounselingModel
