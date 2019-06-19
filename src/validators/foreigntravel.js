import { validateModel, hasYesOrNo } from 'models/validate'
import foreignTravel from 'models/foreignTravel'

export const validateTravel = data => validateModel(data, foreignTravel) === true

export const validateForeignTravel = (data) => {
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

  return validateModel(data, foreignTravelModel) === true
}

export default class ForeignTravelValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignTravel(this.data)
  }
}

export class TravelValidator {
  constructor(data = {}) {
    this.data = data
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
    }) === true
  }

  validInterest() {
    return validateModel(this.data, {
      Interest: foreignTravel.Interest,
      InterestExplanation: foreignTravel.InterestExplanation,
    }) === true
  }

  validSensitive() {
    return validateModel(this.data, {
      Sensitive: foreignTravel.Sensitive,
      SensitiveExplanation: foreignTravel.SensitiveExplanation,
    }) === true
  }

  validThreatened() {
    return validateModel(this.data, {
      Threatened: foreignTravel.Threatened,
      ThreatenedExplanation: foreignTravel.ThreatenedExplanation,
    }) === true
  }

  isValid() {
    return validateTravel(this.data)
  }
}
