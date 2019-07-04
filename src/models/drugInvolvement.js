import { hasYesOrNo } from 'models/validate'
import { drugTypes } from 'constants/enums/substanceOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const drugInvolvement = {
  DrugType: { presence: true, hasValue: { validator: { inclusion: drugTypes } } },
  DrugTypeExplanation: (value, attributes) => {
    if (attributes.DrugType && attributes.DrugType.value === 'Other') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  FirstInvolvement: { presence: true, date: { requireDay: false } },
  RecentInvolvement: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.FirstInvolvement) {
      dateLimits.earliest = attributes.FirstInvolvement
    }

    return { presence: true, date: { requireDay: false, ...dateLimits } }
  },
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
