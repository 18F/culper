/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceDrugVoluntaryTreatmentsModel from 'models/sections/substanceDrugVoluntaryTreatments'

export const validateDrugVoluntaryTreatments = (data, formType, options = {}) => (
  validateModel(data, substanceDrugVoluntaryTreatmentsModel, options)
)
