const suffixOptions = ['', 'Jr', 'Sr', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Other']

export default class NameValidator {
  constructor (state = {}, props = {}) {
    this.first = state.first
    this.firstInitialOnly = state.firstInitialOnly
    this.last = state.last
    this.lastInitialOnly = state.lastInitialOnly
    this.middleInitialOnly = state.middleInitialOnly
    this.noMiddleName = state.noMiddleName
    this.middle = state.middle
    this.suffix = state.suffix
    this.suffixOther = state.suffixOther
  }

  /**
   * Validates a persons first name
   */
  validFirst () {
    if (!this.first) {
      return false
    }

    if (this.firstInitialOnly && this.first.length > 1) {
      return false
    }

    return true
  }

  /**
   * Validates a persons last name
   */
  validLast () {
    if (!this.last) {
      return false
    }

    if (this.lastInitialOnly && this.last.length > 1) {
      return false
    }

    return true
  }

  /**
   * Validates a persons middle name
   */
  validMiddle () {
    switch (this.noMiddleName) {
        // If user does not have a middle name, make sure middle name is not entered
      case true:
        if (this.middle) {
          return false
        }
        break
        // User should have a middle name or initial
      case false:
        if (!this.middle) {
          return false
        }
        if (this.middleInitialOnly && this.middle.length > 1) {
          return false
        }
        break
      default:
        return false
    }
    return true
  }

  /**
   * Validates a users suffix
   */
  validSuffix () {
    // Suffix is optional
    if (!this.suffix) {
      return true
    }

    let found = false
    for (let validSuffix of suffixOptions) {
      if (validSuffix === this.suffix) {
        found = true
      }
    }

    if (!found) {
      return false
    }

    if (this.suffix === 'Other' && !this.suffixOther) {
      return false
    }

    return true
  }

  /**
   * Validates all portions of a persons name
   */
  isValid () {
    return this.validFirst() &&
      this.validLast() &&
      this.validMiddle()
  }
}
