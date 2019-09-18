/* eslint-disable import/prefer-default-export */
import { validateModel, hasYesOrNo } from 'models/validate'
import investigation from 'models/investigation'
import { requireLegalInvestigationClearanceGranted } from 'helpers/branches'

export const validateLegalInvestigationsHistory = (data, formType, options = {}) => {
  const legalInvestigationsHistoryModel = {
    HasHistory: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasHistory && attributes.HasHistory.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: investigation },
        }
      }
      return {}
    },
  }

  const modelOptions = {
    requireLegalInvestigationClearanceGranted: requireLegalInvestigationClearanceGranted(formType),
  }

  return validateModel(data, legalInvestigationsHistoryModel, { ...options, ...modelOptions })
}
