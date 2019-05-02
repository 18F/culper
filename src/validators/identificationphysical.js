import { validateModel } from 'models/validate'

import eyeColor from 'models/shared/eyeColor'
import hairColor from 'models/shared/hairColor'
import height from 'models/shared/height'
import sex from 'models/shared/sex'
import weight from 'models/shared/weight'

export const validateHeight = data => (
  validateModel(data, height) === true
)

export const validateWeight = data => (
  validateModel(data, weight) === true
)

export const validateHairColor = data => (
  validateModel(data, hairColor) === true
)

export const validateEyeColor = data => (
  validateModel(data, eyeColor) === true
)

export const validateSex = data => (
  validateModel(data, sex) === true
)

export const validateIdentificationPhysical = (data) => {
  const {
    Height, Weight, HairColor, EyeColor, Sex,
  } = data

  return validateHeight(Height)
    && validateWeight(Weight)
    && validateHairColor(HairColor)
    && validateEyeColor(EyeColor)
    && validateSex(Sex)
}

/** LEGACY */
export default class PhysicalValidator {
  constructor(data = {}) {
    this.data = data
  }

  /**
   * Validates all physical attributes
   */
  isValid() {
    return validateIdentificationPhysical(this.data)
  }

  validHeight() {
    return validateHeight(this.data.Height)
  }

  validWeight() {
    return validateWeight(this.data.Weight)
  }

  validHairColor() {
    return validateHairColor(this.data.HairColor)
  }

  validEyeColor() {
    return validateEyeColor(this.data.EyeColor)
  }

  validSex() {
    return validateSex(this.data.Sex)
  }
}
