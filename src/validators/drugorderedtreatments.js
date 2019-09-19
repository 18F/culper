/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceDrugOrderedTreatmentsModel from 'models/sections/substanceDrugOrderedTreatments'

export const validateDrugOrderedTreatments = (data, formType, options = {}) => (
  validateModel(data, substanceDrugOrderedTreatmentsModel, options)
)
