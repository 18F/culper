import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import citizenship from 'models/citizenship'

import * as formTypes from 'constants/formTypes'
import { requireMultipleCitizenshipRenounced } from 'helpers/branches'

export const validateCitizenship = (data, formType = formTypes.SF86) => {
  const requireCitizenshipRenounced = requireMultipleCitizenshipRenounced(formType)
  return validateModel(data, citizenship, { requireCitizenshipRenounced }) === true
}

const citizenshipMultipleModel = {
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

export const validateCitizenshipMultiple = (data = {}, formType = formTypes.SF86) => {
  const requireCitizenshipRenounced = requireMultipleCitizenshipRenounced(formType)
  return validateModel(data, citizenshipMultipleModel, { requireCitizenshipRenounced })
}
