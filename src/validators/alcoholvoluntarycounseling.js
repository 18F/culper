/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceAlcoholVoluntaryCounselingModel from 'models/sections/substanceAlcoholVoluntaryCounseling'

export const validateVoluntaryCounselings = (data, formType, options = {}) => (
  validateModel(data, substanceAlcoholVoluntaryCounselingModel, options)
)
