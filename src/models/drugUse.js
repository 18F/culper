import { hasYesOrNo } from 'models/validate'
// import { drugTypes } from 'constants/enums/substanceOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const drugUse = {
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
  FirstUse: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  RecentUse: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.FirstUse) {
      dateLimits.earliest = attributes.FirstUse
    }

    return { presence: true, date: { requireDay: false, ...dateLimits } }
  },
  NatureOfUse: { presence: true, hasValue: true },
  Explanation: (value, attributes, attributeName, options) => {
    if (options && options.requireUseInFuture === false) return {}
    return { presence: true, hasValue: true }
  },
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
