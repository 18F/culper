import { hasYesOrNo } from 'models/validate'

const drugUse = {
  // TODO add DrugType, DrugTypeExplanation
  // TODO >= DOB, <= NOW
  FirstUse: { presence: true, date: { requireDay: false } },
  // TODO >= first use, <= NOW
  RecentUse: { presence: true, date: { requireDay: false } },
  NatureOfUse: { presence: true, hasValue: true },
  Explanation: { presence: true, hasValue: true },
  UseWhileEmployed: (value, attributes, attributeName, options) => {
    if (options && options.requireUseWhileEmployed === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
  UseWithClearance: (value, attributes, attributeName, options) => {
    if (options && options.requireUseWithClearance === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
  UseInFuture: (value, attributes, attributeName, options) => {
    if (options && options.requireUseInFuture === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
}

export default drugUse
