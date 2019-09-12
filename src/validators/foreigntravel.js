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

export const validateForeignTravel = (data, formType, options = {}) => {
  const modelOptions = {
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

  return validateModel(data, foreignTravelModel, { ...options, ...modelOptions })
}
