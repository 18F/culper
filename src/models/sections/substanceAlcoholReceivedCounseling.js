import { hasYesOrNo } from 'models/validate'
import alcoholReceivedCounseling from 'models/alcoholReceivedCounseling'

const substanceAlcoholReceivedCounselingModel = {
  ReceivedTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.ReceivedTreatment
      && attributes.ReceivedTreatment.value === 'Yes') {
      return { presence: true, accordion: { validator: alcoholReceivedCounseling } }
    }
    return {}
  },
}

export default substanceAlcoholReceivedCounselingModel
