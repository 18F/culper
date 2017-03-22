import OffenseValidator from './offense'
import DomesticViolence from './domesticviolence'

export default class PoliceValidator {
  constructor (state = {}, props = {}) {
    this.hasSummons = state.HasSummons
    this.hasArrests = state.HasArrests
    this.hasCharges = state.HasCharges
    this.hasProbation = state.HasProbation
    this.hasTrial = state.HasTrial
    this.list = state.List || []
    this.domesticViolence = state.DomesticViolence || []
  }

  validChecks () {
    return (this.hasSummons === 'Yes' || this.hasSummons === 'No') &&
      (this.hasArrests === 'Yes' || this.hasArrests === 'No') &&
      (this.hasCharges === 'Yes' || this.hasCharges === 'No') &&
      (this.hasProbation === 'Yes' || this.hasProbation === 'No') &&
      (this.hasTrial === 'Yes' || this.hasTrial === 'No')
  }

  answeredYes () {
    return this.hasSummons === 'Yes' ||
      this.hasArrests === 'Yes' ||
      this.hasCharges === 'Yes' ||
      this.hasProbation === 'Yes' ||
      this.hasTrial === 'Yes'
  }

  validDomesticViolence () {
    return new DomesticViolence(this.domesticViolence).isValid()
  }

  validItems () {
    if (this.validChecks() && !this.answeredYes()) {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    for (const offense of this.list) {
      if (new OffenseValidator(offense.Item, null).isValid() !== true) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validChecks() &&
      this.validItems() &&
      this.validDomesticViolence()
  }
}
