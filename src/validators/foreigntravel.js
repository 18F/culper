import * as formTypes from 'constants/formTypes'
import { validateModel, hasYesOrNo } from 'models/validate'
import foreignTravel from 'models/foreignTravel'
import store from 'services/store'
import {
  requireForeignCounterIntelligence,
  requireForeignExcessiveKnowledge,
  requireForeignSensitiveInformation,
  requireForeignThreatened,
} from 'helpers/branches'


export const validateTravel = (data, formType = formTypes.SF86) => {
  const options = {
    requireForeignCounterIntelligence: requireForeignCounterIntelligence(formType),
    requireForeignExcessiveKnowledge: requireForeignExcessiveKnowledge(formType),
    requireForeignSensitiveInformation: requireForeignSensitiveInformation(formType),
    requireForeignThreatened: requireForeignThreatened(formType),
  }
  return validateModel(data, foreignTravel, options) === true
}

export const validateForeignTravel = (data, formType) => {
  const options = {
    requireForeignCounterIntelligence: requireForeignCounterIntelligence(formType),
    requireForeignExcessiveKnowledge: requireForeignExcessiveKnowledge(formType),
    requireForeignSensitiveInformation: requireForeignSensitiveInformation(formType),
    requireForeignThreatened: requireForeignThreatened(formType),
  }

  const foreignTravelModel = {
    HasForeignTravelOutside: { presence: true, hasValue: { validator: hasYesOrNo } },
    HasForeignTravelOfficial: (value, attributes) => {
      if (attributes.HasForeignTravelOutside
        && attributes.HasForeignTravelOutside.value === 'Yes') {
        return { presence: true, hasValue: { validator: hasYesOrNo } }
      }
      return {}
    },
    List: (value, attributes) => {
      const { HasForeignTravelOutside, HasForeignTravelOfficial } = attributes
      if ((HasForeignTravelOutside && HasForeignTravelOutside.value === 'Yes')
        && (HasForeignTravelOfficial && HasForeignTravelOfficial.value === 'No')) {
        return {
          presence: true,
          accordion: { validator: foreignTravel },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignTravelModel, options) === true
}

export default class ForeignTravelValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType = formTypes.SF86 } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateForeignTravel(this.data, this.formType)
  }
}

export class TravelValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType = formTypes.SF86 } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignTravel.Country,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: foreignTravel.Dates,
    }) === true
  }

  validDays() {
    return validateModel(this.data, {
      Days: foreignTravel.Days,
    }) === true
  }

  validPurpose() {
    return validateModel(this.data, {
      Purpose: foreignTravel.Purpose,
    }) === true
  }

  validQuestioned() {
    return validateModel(this.data, {
      Questioned: foreignTravel.Questioned,
      QuestionedExplanation: foreignTravel.QuestionedExplanation,
    }) === true
  }

  validEncounter() {
    return validateModel(this.data, {
      Encounter: foreignTravel.Encounter,
      EncounterExplanation: foreignTravel.EncounterExplanation,
    }) === true
  }

  validContacted() {
    return validateModel(this.data, {
      Contacted: foreignTravel.Contacted,
      ContactedExplanation: foreignTravel.ContactedExplanation,
    }) === true
  }

  validCounter() {
    return validateModel(this.data, {
      Counter: foreignTravel.Counter,
      CounterExplanation: foreignTravel.CounterExplanation,
    }, {
      requireForeignCounterIntelligence: requireForeignCounterIntelligence(this.formType),
    }) === true
  }

  validInterest() {
    return validateModel(this.data, {
      Interest: foreignTravel.Interest,
      InterestExplanation: foreignTravel.InterestExplanation,
    }, {
      requireForeignExcessiveKnowledge: requireForeignExcessiveKnowledge(this.formType)
    }) === true
  }

  validSensitive() {
    return validateModel(this.data, {
      Sensitive: foreignTravel.Sensitive,
      SensitiveExplanation: foreignTravel.SensitiveExplanation,
    }, {
      requireForeignSensitiveInformation: requireForeignSensitiveInformation(this.formType),
    }) === true
  }

  validThreatened() {
    return validateModel(this.data, {
      Threatened: foreignTravel.Threatened,
      ThreatenedExplanation: foreignTravel.ThreatenedExplanation,
    }, {
      requireForeignThreatened: requireForeignThreatened(this.formType),
    }) === true
  }

  isValid() {
    return validateTravel(this.data, this.formType)
  }
}
