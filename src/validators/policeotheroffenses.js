import OffenseValidator from './offense'
import OtherOffenseValidator from './otheroffense'
import DomesticViolence from './domesticviolence'
import { validBranch } from './helpers'

export default class PoliceOtherOffensesValidator {
  constructor (state = {}, props = {}) {
    this.list = state.List || []
    this.hasOtherConviction = state.HasOtherConviction
    this.hasOtherFelony = state.HasOtherFelony
    this.hasOtherDomestic = state.HasOtherDomestic
    this.hasOtherFirearms = state.HasOtherFirearms
    this.hasOtherAlcohol = state.HasOtherAlcohol
  }

  validChecks () {
    const branches = [
      this.hasOtherConviction,
      this.hasOtherFelony,
      this.hasOtherDomestic,
      this.hasOtherFirearms,
      this.hasOtherAlcohol
    ]

    for (let branch of branches) {
      if (!validBranch(branch)) {
        return false
      }
    }
    return true
  }

  hasOtherOffensesCount () {
    let count = 0
    const branches = [
      this.hasOtherConviction,
      this.hasOtherFelony,
      this.hasOtherDomestic,
      this.hasOtherFirearms,
      this.hasOtherAlcohol
    ]
    branches.forEach(branch => {
      if (branch === 'Yes') {
        count++
      }
    })
    return count
  }

  hasOtherOffenses () {
    return this.hasOtherConviction === 'Yes' ||
      this.hasOtherFelony === 'Yes' ||
      this.hasOtherDomestic === 'Yes' ||
      this.hasOtherFirearms === 'Yes' ||
      this.hasOtherAlcohol === 'Yes'
  }

  validItems () {
    if (this.validChecks() && !this.hasOtherOffenses()) {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    for (const otherOffense of this.list) {
      if (new OtherOffenseValidator(otherOffense.Item, null).isValid() !== true) {
        return false
      }
    }
    return true
  }

  isValid () {
    return this.validChecks() &&
      this.validItems()
  }
}
