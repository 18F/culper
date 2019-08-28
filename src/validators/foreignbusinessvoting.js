import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessVoting from 'models/foreignBusinessVoting'

export const validateVoting = data => validateModel(data, foreignBusinessVoting)

export const validateForeignBusinessVoting = (data) => {
  const foreignBusinessVotingModel = {
    HasForeignVoting: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignVoting && attributes.HasForeignVoting.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessVoting },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessVotingModel)
}

export default class ForeignBusinessVotingValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessVoting(this.data) === true
  }
}

export class VotingValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDate() {
    return validateModel(this.data, {
      Date: foreignBusinessVoting.Date,
    }) === true
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignBusinessVoting.Country,
    }) === true
  }

  validReason() {
    return validateModel(this.data, {
      Reason: foreignBusinessVoting.Reason,
    }) === true
  }

  validEligibility() {
    return validateModel(this.data, {
      Eligibility: foreignBusinessVoting.Eligibility,
    }) === true
  }

  isValid() {
    return validateVoting(this.data) === true
  }
}
