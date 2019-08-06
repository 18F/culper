import { hasYesOrNo, checkValue } from 'models/validate'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

const alcoholOrderedCounseling = {
  Seekers: {},
  OtherSeeker: (value, attributes) => {
    if (attributes.Seekers
      && attributes.Seekers.values
      && attributes.Seekers.values.includes('Other')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  ActionTaken: { presence: true, hasValue: { validator: hasYesOrNo } },
  TreatmentProviderName: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'Yes')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  TreatmentProviderAddress: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'Yes')) {
      return { presence: true, location: { validator: address } }
    }
    return {}
  },
  TreatmentProviderTelephone: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'Yes')) {
      return { presence: true, model: { validator: phone, requireNumber: true } }
    }
    return {}
  },
  CounselingDates: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'Yes')) {
      return { presence: true, daterange: true }
    }
    return {}
  },
  CompletedTreatment: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'Yes')) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  NoCompletedTreatmentExplanation: (value, attributes) => {
    if (checkValue(attributes.CompletedTreatment, 'No')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  NoActionTakenExplanation: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'No')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default alcoholOrderedCounseling
