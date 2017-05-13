import OffenseValidator from './offense'

export default class PoliceOffensesValidator {
  constructor (state = {}, props = {}) {
    this.hasSummons = state.HasSummons
    this.hasArrests = state.HasArrests
    this.hasCharges = state.HasCharges
    this.hasProbation = state.HasProbation
    this.hasTrial = state.HasTrial
    this.list = state.List || []
    this.listBranch = state.ListBranch
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

  answeredYesCount () {
    let count = 0
    const branches = [
      this.hasSummons,
      this.hasArrests,
      this.hasCharges,
      this.hasProbation,
      this.hasTrial
    ]

    branches.forEach(branch => {
      if (branch === 'Yes') {
        count++
      }
    })
    return count
  }

  validItems () {
    if (this.validChecks() && !this.answeredYes()) {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    if (this.listBranch !== 'No') {
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
      this.validItems()
  }
}
