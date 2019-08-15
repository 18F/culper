import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import citizenship from 'models/citizenship'

import store from 'services/store'
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

/** Object Validators (as classes) - legacy */
export default class CitizenshipMultipleValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validHasMultiple() {
    return validateModel(this.data, {
      HasMultiple: citizenshipMultipleModel.HasMultiple,
    }) === true
  }

  validMinimumCitizenships() {
    return validateModel(this.data, {
      HasMultiple: citizenshipMultipleModel.HasMultiple,
      List: citizenshipMultipleModel.List,
    }) === true
  }

  validCitizenships() {
    return validateModel(this.data, {
      HasMultiple: citizenshipMultipleModel.HasMultiple,
      List: (value, attributes, options) => (
        checkValue(attributes.HasMultiple, 'Yes')
          ? {
            presence: true,
            accordion: {
              validator: citizenship,
              ...options,
            },
          } : {}
      ),
    }) === true
  }

  isValid() {
    return validateCitizenshipMultiple(this.data, this.formType) === true
  }
}

export class CitizenshipItemValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validCountry() {
    return validateModel(this.data, {
      Country: citizenship.Country,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: citizenship.Dates,
    }) === true
  }

  validHow() {
    return validateModel(this.data, {
      How: citizenship.How,
    }) === true
  }

  validRenounced() {
    return validateModel(this.data, {
      Renounced: citizenship.Renounced,
      RenouncedExplanation: citizenship.RenouncedExplanation,
    }, { requireCitizenshipRenounced: true }) === true
  }

  validCurrent() {
    return validateModel(this.data, {
      Current: citizenship.Current,
      CurrentExplanation: citizenship.CurrentExplanation,
    }) === true
  }

  isValid() {
    return validateCitizenship(this.data, this.formType) === true
  }
}
