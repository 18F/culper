export default class PhysicalValidator {
  constructor (state, props) {
    this.height = state.Height
    this.weight = state.Weight
    this.hairColor = state.HairColor
    this.eyeColor = state.EyeColor
    this.sex = state.Sex
  }

  /**
   * Validates all physical attributes
   */
  isValid () {
    return this.validHeight() &&
      this.validWeight() &&
      this.validHairColor() &&
      this.validEyeColor() &&
      this.validSex()
  }

  /**
   * Validates a users height
   */
  validHeight () {
    if (!this.height) {
      return false
    }

    if (this.height.feet < 1 || this.height.inches < 0 || this.height.inches > 11) {
      return false
    }

    return true
  }

  validWeight () {
    if (!this.weight) {
      return false
    }

    if (this.weight < 10) {
      return false
    }
    return true
  }

  validHairColor () {

  }

  validEyeColor () {

  }

  validSex () {

  }
}

/**
 * Validates physical attributes within the identification section
 */
//export const physicalValidator = (state, props) => {
  //const validHeight = () => {
    //if (!state.Height) {
      //return false
    //}

    //if (state.Height.feet < 1 || !state.Height.inches) {
      //return false
    //}
    //return true
  //}

  //const validWeight = () => {
    //if (!state.Weight) {
      //return false
    //}

    //if (state.Weight < 10) {
      //return false
    //}
    //return true
  //}

  //const validHairColor = () => {
    //if (!state.HairColor) {
      //return false
    //}

    //if (!state.HairColor.length) {
      //return false
    //}
    //return true
  //}

  //const validEyeColor = () => {
    //if (!state.EyeColor) {
      //return false
    //}

    //if (!state.EyeColor.length) {
      //return false
    //}
    //return true
  //}

  //const validSex = () => {
    //if (!state.Sex || !state.Sex.length) {
      //return false
    //}
    //return true
  //}

  //return {
    //isValid: () => {
      //return validHeight() &&
        //validWeight() &&
        //validHairColor() &&
        //validEyeColor() &&
        //validSex()
    //}
  //}
//}

