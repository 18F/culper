import { hasYesOrNo, checkValue } from 'models/validate'
import citizenship from 'models/citizenship'

const citizenshipDualCitizenship = {
  HasMultiple: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes, attributeName, options) => (
    checkValue(attributes.HasMultiple, 'Yes')
      ? {
        presence: true,
        accordion: {
          validator: citizenship,
          length: { minimum: 2 },
          ...options,
        },
      } : {}
  ),
}

export default citizenshipDualCitizenship
