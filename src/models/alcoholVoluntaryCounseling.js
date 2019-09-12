import { hasYesOrNo, checkValue } from 'models/validate'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const alcoholVoluntaryCounseling = {
  TreatmentProviderName: { presence: true, hasValue: true },
  TreatmentProviderAddress: { presence: true, location: { validator: address } },
  TreatmentProviderTelephone: { presence: true, model: { validator: phone, requireNumber: true } },
  CounselingDates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options
    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  CompletedTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
  NoCompletedTreatmentExplanation: (value, attributes) => {
    if (checkValue(attributes.CompletedTreatment, 'No')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default alcoholVoluntaryCounseling
