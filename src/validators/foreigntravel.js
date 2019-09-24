/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignTravel from 'models/sections/foreignTravel'

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

  return validateModel(data, foreignTravel, { ...options, ...modelOptions })
}
