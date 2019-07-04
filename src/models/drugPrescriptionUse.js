import { hasYesOrNo } from 'models/validate'

const drugPrescriptionUse = {
  PrescriptionName: { presence: true, hasValue: true },
  InvolvementDates: { presence: true, daterange: true },
  Reason: { presence: true, hasValue: true },
  UseWhileEmployed: (value, attributes, attributeName, options) => {
    if (options && options.requireUseWhileEmployed === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
  UseWithClearance: (value, attributes, attributeName, options) => {
    if (options && options.requireUseWithClearance === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
}

export default drugPrescriptionUse
