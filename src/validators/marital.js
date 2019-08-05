import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import { validateModel } from 'models/validate'
import civilUnion from 'models/civilUnion'
import divorce from 'models/divorce'
import { maritalStatusOptions, marriedOptions, previouslyMarriedOptions } from 'constants/enums/relationshipOptions'
import {
  requireRelationshipMaritalForeignBornDocExpiration,
  requireRelationshipMaritalDivorcePhoneNumber,
} from 'helpers/branches'

const maritalModel = {
  Status: {
    presence: true,
    hasValue: {
      validator: { inclusion: maritalStatusOptions },
    },
  },
  CivilUnion: (value, attributes) => {
    if (attributes.Status
      && attributes.Status.value
      && marriedOptions.indexOf(attributes.Status.value) > -1) {
      return {
        presence: true,
        model: {
          validator: civilUnion,
        },
      }
    }

    return {}
  },
  DivorcedList: (value, attributes) => {
    // Required if Status is a previously married value
    // OR if Status is a currently married value, AND CivilUnion.Divorced is "Yes"
    if (attributes.Status
      && attributes.Status.value
      && (previouslyMarriedOptions.indexOf(attributes.Status.value) > -1
        || (marriedOptions.indexOf(attributes.Status.value) > -1
          && attributes.CivilUnion && attributes.CivilUnion.Divorced
          && attributes.CivilUnion.Divorced.value === 'Yes'))) {
      return {
        presence: true,
        accordion: {
          validator: divorce,
        },
      }
    }

    return {}
  },
}

export const validateMarital = (data, formType = formTypes.SF86) => {
  const isForeignBornDocExpirationRequired = requireRelationshipMaritalForeignBornDocExpiration(formType)
  const isDivorceePhoneNumberRequired = requireRelationshipMaritalDivorcePhoneNumber(formType)
  const options = {
    requireForeignBornDocExpiration: isForeignBornDocExpirationRequired,
    requireRelationshipMaritalDivorcePhoneNumber: isDivorceePhoneNumberRequired,
  }
  return validateModel(data, maritalModel, options) === true
}

export default class MaritalValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType
  }

  validStatus() {
    return validateModel(this.data, { Status: maritalModel.Status }) === true
  }

  validDivorce() {
    return validateModel(this.data, {
      DivorcedList: maritalModel.DivorcedList,
    }) === true
  }

  isValid() {
    return validateMarital(this.data, this.formType)
  }
}
