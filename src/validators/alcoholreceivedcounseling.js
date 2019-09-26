/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceAlcoholReceivedCounselingModel from 'models/sections/substanceAlcoholReceivedCounseling'

export const validateReceivedCounselings = (data, formType, options = {}) => (
  validateModel(data, substanceAlcoholReceivedCounselingModel, options)
)
