import { hasYesOrNo, checkValue } from 'models/validate'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

const alcoholVoluntaryCounseling = {
  TreatmentProviderName: { presence: true, hasValue: true },
  TreatmentProviderAddress: { presence: true, location: { validator: address } },
  TreatmentProviderTelephone: { presence: true, model: { validator: phone } },
  CounselingDates: { presence: true, daterange: true },
  CompletedTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
  NoCompletedTreatmentExplanation: (value, attributes) => {
    if (checkValue(attributes.CompletedTreatment, 'No')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default alcoholVoluntaryCounseling
