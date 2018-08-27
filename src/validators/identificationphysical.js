const eyeColors = [
  'Black',
  'Blue',
  'Brown',
  'Gray',
  'Green',
  'Hazel',
  'Maroon',
  'Multicolored',
  'Pink',
  'Unknown'
]

const hairColors = [
  'Bald',
  'Black',
  'Blonde',
  'Brown',
  'Gray',
  'Red',
  'Sandy',
  'White',
  'Blue',
  'Green',
  'Orange',
  'Pink',
  'Purple',
  'Unknown'
]

export default class PhysicalValidator {
  constructor(data = {}) {
    this.height = data.Height
    this.weight = (data.Weight || {}).value
    this.hairColor = (data.HairColor || {}).value
    this.eyeColor = (data.EyeColor || {}).value
    this.sex = (data.Sex || {}).value
  }

  /**
   * Validates all physical attributes
   */
  isValid() {
    return (
      this.validHeight() &&
      this.validWeight() &&
      this.validHairColor() &&
      this.validEyeColor() &&
      this.validSex()
    )
  }

  /**
   * Validates a users height
   */
  validHeight() {
    if (!this.height) {
      return false
    }

    if (
      this.height.feet < 1 ||
      this.height.inches < 0 ||
      this.height.inches > 11
    ) {
      return false
    }

    return true
  }

  /**
   * Validats a users weight
   */
  validWeight() {
    if (!this.weight) {
      return false
    }

    if (this.weight < 10) {
      return false
    }
    return true
  }

  /**
   * Validates a users hair color
   */
  validHairColor() {
    if (!this.hairColor) {
      return false
    }

    let found = false
    for (let validColor of hairColors) {
      if (validColor === this.hairColor) {
        found = true
      }
    }

    return found
  }

  validEyeColor() {
    if (!this.eyeColor) {
      return false
    }

    let found = false
    for (let validColor of eyeColors) {
      if (validColor === this.eyeColor) {
        found = true
      }
    }

    return found
  }

  validSex() {
    if (!this.sex || !this.sex.length) {
      return false
    }
    return true
  }
}
