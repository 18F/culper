/* eslint-disable import/prefer-default-export */
import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import citizenship from 'models/citizenship'

import { requireMultipleCitizenshipRenounced } from 'helpers/branches'

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

export const validateCitizenshipMultiple = (data = {}, formType, options = {}) => {
  const requireCitizenshipRenounced = requireMultipleCitizenshipRenounced(formType)
  return validateModel(data, citizenshipMultipleModel, { ...options, requireCitizenshipRenounced })
}
