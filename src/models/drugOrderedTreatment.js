import { hasYesOrNo, checkValue } from 'models/validate'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'
// import { drugTypes } from 'constants/enums/substanceOptions'

const drugOrderedTreatment = {
  DrugType: { presence: true, hasValue: { validator: { exclusion: ['Other'] } } },
  // TODO - add this back after fixing DrugType structure
  /*
  DrugType: { presence: true, hasValue: { validator: { inclusion: drugTypes } } },
  DrugTypeExplanation: (value, attributes) => {
    if (attributes.DrugType && attributes.DrugType.value === 'Other') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  */
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
      return { presence: true, model: { validator: phone, requireNumber: true } }
    }
    return {}
  },
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
