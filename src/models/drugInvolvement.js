import { hasYesOrNo } from 'models/validate'

const drugInvolvement = {
  // TODO add DrugType, DrugTypeExplanation
  // TODO >= DOB, <= NOW
  FirstInvolvement: { presence: true, date: { requireDay: false } },
  // TODO >= first use, <= NOW
  RecentInvolvement: { presence: true, date: { requireDay: false } },
  NatureOfInvolvement: { presence: true, hasValue: true },
  Reasons: { presence: true, hasValue: true },
  InvolvementWhileEmployed: (value, attributes, attributeName, options) => {
    if (options && options.requireInvolvementWhileEmployed === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
  InvolvementWithClearance: (value, attributes, attributeName, options) => {
    if (options && options.requireInvolvementWithClearance === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
  InvolvementInFuture: (value, attributes, attributeName, options) => {
    if (options && options.requireInvolvementInFuture === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
  Explanation: (value, attributes) => {
    if (attributes.InvolvementInFuture
      && attributes.InvolvementInFuture.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default drugInvolvement
