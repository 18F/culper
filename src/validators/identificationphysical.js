import { validateModel } from 'models/validate'

import eyeColor from 'models/shared/eyeColor'
import hairColor from 'models/shared/hairColor'
import height from 'models/shared/height'
import sex from 'models/shared/sex'
import weight from 'models/shared/weight'
import identificationPhysical from 'models/sections/identificationPhysical'

export const validateIdentificationPhysical = (data) => {
  return validateModel(data, identificationPhysical) === true
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
    return validateModel(this.data.Height, height) === true
  }

  validWeight() {
    return validateModel(this.data.Weight, weight) === true
  }

  validHairColor() {
    return validateModel(this.data.HairColor, hairColor) === true
  }

  validEyeColor() {
    return validateModel(this.data.EyeColor, eyeColor) === true
  }

  validSex() {
    return validateModel(this.data.Sex, sex) === true
  }
}
