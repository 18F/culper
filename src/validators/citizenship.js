export default class CitizenshipValidator {
  constructor (state = {}, props = {}) {
    this.isForeignBorn = state.IsForeignBorn
    this.isNaturalized = state.IsNaturalized
    this.isDerived = state.IsDerived
    this.isNotCitizen = state.IsNotCitizen
  }

  validIsForeignBorn () {
    return !!this.isForeignBorn && (this.isForeignBorn === 'No' || this.isForeignBorn === 'Yes')
  }

  validIsNaturalized () {
    return !!this.isNaturalized && (this.isNaturalized === 'No' || this.isNaturalized === 'Yes')
  }

  validIsDerived () {
    return !!this.isDerived && (this.isDerived === 'No' || this.isDerived === 'Yes')
  }

  validIsNotCitizen () {
    return !!this.isNotCitizen && (this.isNotCitizen === 'No' || this.isNotCitizen === 'Yes')
  }

  isValid () {
    return this.validIsForeignBorn() &&
      this.validIsNaturalized() &&
      this.validIsDerived() &&
      this.validIsNotCitizen()
  }
}
