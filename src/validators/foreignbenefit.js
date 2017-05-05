import { validGenericTextfield, validCurrency, validDateField, validBranch } from './helpers'

export default class ForeignBenefitValidator {
  constructor (state = {}, props = {}) {
    this.interestTypes = props.InterestTypes
    this.benefitType = props.BenefitType
    this.benefitFrequency = props.BenefitFrequency
    this.oneTimeBenefit = props.OneTimeBenefit
    this.futureBenefit = props.FutureBenefit
    this.continuingBenefit = props.ContinuingBenefit
    this.otherBenefit = props.OtherBenefit
  }

  validInterestTypes () {
    return !!this.interestTypes && !!this.interestTypes.length
  }

  validBenefitType () {
    return !!this.benefitType &&
      ['Educational', 'Medical', 'Retirement', 'Other'].includes(this.benefitType)
  }

  validBenefitFrequency () {
    return !!this.benefitFrequency &&
      ['OneTime', 'Future', 'Continuing', 'Other'].includes(this.benefitFrequency)
  }

  validBenefit () {
    switch (this.benefitFrequency) {
      case 'OneTime':
        return new OneTimeBenefitValidator(null, this.oneTimeBenefit).isValid()
      case 'Future':
        return new FutureBenefitValidator(null, this.futureBenefit).isValid()
      case 'Continuing':
        return new ContinuingBenefitValidator(null, this.continuingBenefit).isValid()
      case 'Other':
        return validGenericTextfield(this.otherBenefit)
      default:
        return false
    }
  }

  isValid () {
    return this.validInterestTypes() &&
      this.validBenefitType() &&
      this.validBenefitFrequency() &&
      this.validBenefit()
  }
}

export class OneTimeBenefitValidator {
  constructor (state = {}, props = {}) {
    this.received = props.Received
    this.country = props.Country
    this.value = props.Value
    this.reason = props.Reason
    this.obligated = props.Obligated
    this.obligatedExplanation = props.ObligatedExplanation
  }

  validReceived () {
    return !!this.received && validDateField(this.received)
  }

  validCountry () {
    return !!this.country && validGenericTextfield(this.country)
  }

  validValue () {
    return !!this.value && validCurrency(this.value)
  }

  validReason () {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validObligated () {
    return validBranch(this.obligated)
  }

  validObligatedExplanation () {
    if (!this.validObligated()) {
      return false
    }
    if (this.obligated === 'No') {
      return true
    }
    return validGenericTextfield(this.obligatedExplanation)
  }

  isValid () {
    return this.validReceived() &&
      this.validCountry() &&
      this.validValue() &&
      this.validReason() &&
      this.validObligated() &&
      this.validObligatedExplanation()
  }
}

export class FutureBenefitValidator {
  constructor (state = {}, props = {}) {
    this.begin = props.Begin
    this.country = props.Country
    this.value = props.Value
    this.reason = props.Reason
    this.obligated = props.Obligated
    this.obligatedExplanation = props.ObligatedExplanation
  }

  validBegin () {
    return !!this.begin && validDateField(this.begin)
  }

  validCountry () {
    return !!this.country && validGenericTextfield(this.country)
  }

  validValue () {
    return !!this.value && validCurrency(this.value)
  }

  validReason () {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validObligated () {
    return validBranch(this.obligated)
  }

  validObligatedExplanation () {
    if (!this.validObligated()) {
      return false
    }
    if (this.obligated === 'No') {
      return true
    }
    return validGenericTextfield(this.obligatedExplanation)
  }

  isValid () {
    return this.validBegin() &&
      this.validCountry() &&
      this.validValue() &&
      this.validReason() &&
      this.validObligated() &&
      this.validObligatedExplanation()
  }
}

export class ContinuingBenefitValidator {
  constructor (state = {}, props = {}) {
    this.began = props.Began
    this.end = props.End
    this.frequency = props.Frequency
    this.country = props.Country
    this.value = props.Value
    this.reason = props.Reason
    this.obligated = props.Obligated
    this.obligatedExplanation = props.ObligatedExplanation
  }

  validBegan () {
    return !!this.began && validDateField(this.began)
  }

  validEnd () {
    return !!this.end && validDateField(this.end)
  }

  validFrequency () {
    return !!this.frequency
  }

  validCountry () {
    return !!this.country && validGenericTextfield(this.country)
  }

  validValue () {
    return !!this.value && validCurrency(this.value)
  }

  validReason () {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validObligated () {
    return validBranch(this.obligated)
  }

  validObligatedExplanation () {
    if (!this.validObligated()) {
      return false
    }
    if (this.obligated === 'No') {
      return true
    }
    return validGenericTextfield(this.obligatedExplanation)
  }

  isValid () {
    return this.validBegan() &&
      this.validEnd() &&
      this.validFrequency() &&
      this.validCountry() &&
      this.validValue() &&
      this.validReason() &&
      this.validObligated() &&
      this.validObligatedExplanation()
  }
}
