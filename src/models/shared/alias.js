import name from 'models/shared/name'
import { hasYesOrNo } from 'models/validate'

const alias = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: (value, attributes, attributeName, options) => (
    options && options.hideMaiden
      ? {}
      : {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
  ),
  Dates: {
    presence: true,
    daterange: true,
  },
  Reason: {
    presence: true,
    hasValue: true,
  },
}

export default alias
