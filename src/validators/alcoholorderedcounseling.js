/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceAlcoholOrderedCounselingModel from 'models/sections/substanceAlcoholOrderedCounseling'

import { requireAlcoholOrderedCounselingParty } from 'helpers/branches'

export const validateOrderedCounselings = (data, formType, options = {}) => {
  const modelOptions = {
    requireAlcoholOrderedCounselingParty: requireAlcoholOrderedCounselingParty(formType),
  }

  return validateModel(data, substanceAlcoholOrderedCounselingModel, {
    ...options,
    ...modelOptions,
  })
}
