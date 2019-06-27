import { hasYesOrNo, checkValue } from 'models/validate'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

const drugOrderedTreatment = {
  Explanation: { presence: true, hasValue: true },
  ActionTaken: { presence: true, hasValue: { validator: hasYesOrNo } },
  OrderedBy: (value) => {
    const length = { minimum: 1 }

    if (value && value.values && value.values.includes('None')) {
      length.maximum = 1
    }

    return {
      presence: true,
      array: {
        validator: { presence: true },
        length,
      },
    }
  },
  // TODO add DrugType, DrugTypeExplanation
  TreatmentProvider: (value, attributes) => {
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
      return { presence: true, model: { validator: phone } }
    }
    return {}
  },
  // TODO >= DOB, <= NOW
  TreatmentDates: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'Yes')) {
      return { presence: true, daterange: true }
    }
    return {}
  },
  TreatmentCompleted: (value, attributes) => {
    if (checkValue(attributes.ActionTaken, 'Yes')) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  NoTreatmentExplanation: (value, attributes) => {
    if (checkValue(attributes.TreatmentCompleted, 'No')) {
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

export default drugOrderedTreatment
