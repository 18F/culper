/* eslint-disable import/no-cycle */
import { validateModel, hasYesOrNo } from 'models/validate'
import * as formTypes from 'constants/formTypes'
import alcoholOrderedCounseling from 'models/alcoholOrderedCounseling'
import { requireAlcoholOrderedCounselingParty } from 'helpers/branches'
import store from 'services/store'

export const validateOrderedCounseling = (data, formType = formTypes.SF86) => {
  const options = {
    requireAlcoholOrderedCounselingParty: requireAlcoholOrderedCounselingParty(formType),
  }
  return validateModel(data, alcoholOrderedCounseling, options)
}

export const validateOrderedCounselings = (data, formType, options = {}) => {
  const modelOptions = {
    requireAlcoholOrderedCounselingParty: requireAlcoholOrderedCounselingParty(formType),
  }

  const orderedCounselingsModel = {
    HasBeenOrdered: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasBeenOrdered
        && attributes.HasBeenOrdered.value === 'Yes') {
        return { presence: true, accordion: { validator: alcoholOrderedCounseling } }
      }
      return {}
    },
  }

  return validateModel(data, orderedCounselingsModel, { ...options, ...modelOptions })
}
