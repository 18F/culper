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

export const validateOrderedCounselings = (data, formType = formTypes.SF86) => {
  const options = {
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

  return validateModel(data, orderedCounselingsModel, options)
}

export default class OrderedCounselingsValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateOrderedCounselings(this.data, this.formType) === true
  }
}

export class OrderedCounselingValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validCompletedTreatment() {
    return validateModel(this.data, {
      CompletedTreatment: alcoholOrderedCounseling.CompletedTreatment,
      NoCompletedTreatmentExplanation: alcoholOrderedCounseling.NoCompletedTreatmentExplanation,
    }) === true
  }

  isValid() {
    return validateOrderedCounseling(this.data, this.formType) === true
  }
}
