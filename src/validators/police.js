import OffenseValidator from './offense'
import OtherOffenseValidator from './otheroffense'
import DomesticViolence from './domesticviolence'

export default class PoliceValidator {
  constructor (state = {}, props = {}) {
    this.hasSummons = state.HasSummons
    this.hasArrests = state.HasArrests
    this.hasCharges = state.HasCharges
    this.hasProbation = state.HasProbation
    this.hasTrial = state.HasTrial
    this.list = state.List || []
    this.otherOffenses = state.OtherOffenses || []
    this.domesticViolence = state.DomesticViolence || []
    this.hasOtherConviction = state.HasOtherConviction
    this.hasOtherFelony = state.HasOtherFelony
    this.hasOtherDomestic = state.HasOtherDomestic
    this.hasOtherFirearms = state.HasOtherFirearms
    this.hasOtherAlcohol = state.HasOtherAlcohol
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

  hasOtherOffenses () {
    return this.hasOtherConviction === 'Yes' ||
      this.hasOtherFelony === 'Yes' ||
      this.hasOtherDomestic === 'Yes' ||
      this.hasOtherFirearms === 'Yes' ||
      this.hasOtherAlcohol === 'Yes'
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

    for (const otherOffense of this.otherOffenses) {
      if (new OtherOffenseValidator(otherOffense.Item, null).isValid() !== true) {
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
