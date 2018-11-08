import {
  validGenericTextfield,
  validCurrency,
  validDateField,
  validBranch
} from './helpers'

export default class ForeignBenefitValidator {
  constructor(data = {}) {
    this.interestTypes = (data.InterestTypes || {}).values || []
    this.benefitType = (data.BenefitType || {}).value
    this.otherBenefitType = data.OtherBenefitType
    this.benefitFrequency = (data.BenefitFrequency || {}).value
    this.oneTimeBenefit = data.OneTimeBenefit
    this.futureBenefit = data.FutureBenefit
    this.continuingBenefit = data.ContinuingBenefit
    this.otherBenefit = data.OtherBenefit
  }

  validInterestTypes() {
    return !!this.interestTypes && !!this.interestTypes.length
  }

  validBenefitType() {
    switch (this.benefitType) {
      case 'Educational':
      case 'Medical':
      case 'Retirement':
        return true
      case 'Other':
        return validGenericTextfield(this.otherBenefitType)
      default:
        return false
    }
  }

  validBenefitFrequency() {
    return (
      !!this.benefitFrequency &&
      ['OneTime', 'Future', 'Continuing', 'Other'].includes(
        this.benefitFrequency
      )
    )
  }

  validBenefit() {
    switch (this.benefitFrequency) {
      case 'OneTime':
        return new OneTimeBenefitValidator(this.oneTimeBenefit).isValid()
      case 'Future':
        return new FutureBenefitValidator(this.futureBenefit).isValid()
      case 'Continuing':
        return new ContinuingBenefitValidator(this.continuingBenefit).isValid()
      case 'Other':
        // Using ContinuingBenefitValidator because on the paper form, "Other"
        // uses identical fields to "Continuing Benefit"
        return new ContinuingBenefitValidator(this.otherBenefit).isValid()
      default:
        return false
    }
  }

  isValid() {
    return (
      this.validInterestTypes() &&
      this.validBenefitType() &&
      this.validBenefitFrequency() &&
      this.validBenefit()
    )
  }
}

export class OneTimeBenefitValidator {
  constructor(data = {}) {
    this.received = data.Received
    this.country = data.Country
    this.value = data.Value
    this.reason = data.Reason
    this.obligated = (data.Obligated || {}).value
    this.obligatedExplanation = data.ObligatedExplanation
  }

  validReceived() {
    return !!this.received && validDateField(this.received)
  }

  validCountry() {
    return !!this.country && validGenericTextfield(this.country)
  }

  validValue() {
    return !!this.value && validCurrency(this.value)
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validObligated() {
    return validBranch(this.obligated)
  }

  validObligatedExplanation() {
    if (!this.validObligated()) {
      return false
    }
    if (this.obligated === 'No') {
      return true
    }
    return validGenericTextfield(this.obligatedExplanation)
  }

  isValid() {
    return (
      this.validReceived() &&
      this.validCountry() &&
      this.validValue() &&
      this.validReason() &&
      this.validObligated() &&
      this.validObligatedExplanation()
    )
  }
}

export class FutureBenefitValidator {
  constructor(data = {}) {
    this.began = data.Began
    this.frequency = (data.Frequency || {}).value
    this.otherFrequency = data.OtherFrequency
    this.country = data.Country
    this.value = data.Value
    this.reason = data.Reason
    this.obligated = (data.Obligated || {}).value
    this.obligatedExplanation = data.ObligatedExplanation
  }

  validBegan() {
    return !!this.began && validDateField(this.began)
  }

  validFrequency() {
    switch (this.frequency) {
      case 'Annually':
      case 'Quarterly':
      case 'Monthly':
      case 'Weekly':
        return true
      case 'Other':
        return validGenericTextfield(this.otherFrequency)
      default:
        return false
    }
  }

  validCountry() {
    return !!this.country && validGenericTextfield(this.country)
  }

  validValue() {
    return !!this.value && validCurrency(this.value)
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validObligated() {
    return validBranch(this.obligated)
  }

  validObligatedExplanation() {
    if (!this.validObligated()) {
      return false
    }
    if (this.obligated === 'No') {
      return true
    }
    return validGenericTextfield(this.obligatedExplanation)
  }

  isValid() {
    return (
      this.validBegan() &&
      this.validFrequency() &&
      this.validCountry() &&
      this.validValue() &&
      this.validReason() &&
      this.validObligated() &&
      this.validObligatedExplanation()
    )
  }
}

export class ContinuingBenefitValidator {
  constructor(data = {}) {
    this.began = data.Began
    this.end = data.End
    this.frequency = (data.Frequency || {}).value
    this.otherFrequency = data.OtherFrequency
    this.country = data.Country
    this.value = data.Value
    this.reason = data.Reason
    this.obligated = (data.Obligated || {}).value
    this.obligatedExplanation = data.ObligatedExplanation
  }

  validBegan() {
    return !!this.began && validDateField(this.began)
  }

  validEnd() {
    return !!this.end && validDateField(this.end)
  }

  validFrequency() {
    switch (this.frequency) {
      case 'Annually':
      case 'Quarterly':
      case 'Monthly':
      case 'Weekly':
        return true
      case 'Other':
        return validGenericTextfield(this.otherFrequency)
      default:
        return false
    }
  }

  validCountry() {
    return !!this.country && validGenericTextfield(this.country)
  }

  validValue() {
    return !!this.value && validCurrency(this.value)
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validObligated() {
    return validBranch(this.obligated)
  }

  validObligatedExplanation() {
    if (!this.validObligated()) {
      return false
    }
    if (this.obligated === 'No') {
      return true
    }
    return validGenericTextfield(this.obligatedExplanation)
  }

  isValid() {
    return (
      this.validBegan() &&
      this.validEnd() &&
      this.validFrequency() &&
      this.validCountry() &&
      this.validValue() &&
      this.validReason() &&
      this.validObligated() &&
      this.validObligatedExplanation()
    )
  }
}
