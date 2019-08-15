import { validateModel, hasYesOrNo } from 'models/validate'
import activitiesOverthrow from 'models/activitiesOverthrow'

export const validateActivities = data => (
  validateModel(data, activitiesOverthrow)
)

export const validateLegalAssociationActivities = (data) => {
  const legalAssociationActivitiesModel = {
    HasActivities: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasActivities && attributes.HasActivities.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: activitiesOverthrow },
        }
      }

      return {}
    },
  }

  return validateModel(data, legalAssociationActivitiesModel)
}

export default class LegalAssociationActivitiesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalAssociationActivities(this.data) === true
  }
}

export class ActivitiesValidator {
  constructor(data = {}) {
    this.data = data
  }

  validReasons() {
    return validateModel(this.data, {
      Reasons: activitiesOverthrow.Reasons,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: activitiesOverthrow.Dates,
    }) === true
  }

  isValid() {
    return validateActivities(this.data) === true
  }
}
