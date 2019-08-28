import { validateModel } from 'models/validate'
import foreignBenefit from 'models/foreignBenefit'
import foreignBenefitType from 'models/foreignBenefitType'

export const validateForeignBenefit = data => (
  validateModel(data, foreignBenefit)
)

export const validateForeignBenefitType = (data, options = {}) => (
  validateModel(data, foreignBenefitType, options)
)

export default class ForeignBenefitValidator {
  constructor(data = {}) {
    this.data = data
  }

  validBenefitType() {
    return validateModel(this.data, {
      BenefitType: foreignBenefit.BenefitType,
      OtherBenefitType: foreignBenefit.OtherBenefitType,
    }) === true
  }

  validBenefit() {
    return validateModel(this.data, {
      BenefitFrequency: foreignBenefit.BenefitFrequency,
      OneTimeBenefit: foreignBenefit.OneTimeBenefit,
      FutureBenefit: foreignBenefit.FutureBenefit,
      ContinuingBenefit: foreignBenefit.ContinuingBenefit,
      OtherBenefit: foreignBenefit.OtherBenefit,
    }) === true
  }

  isValid() {
    return validateForeignBenefit(this.data) === true
  }
}

export class OneTimeBenefitValidator {
  constructor(data = {}) {
    this.data = data
  }

  validObligatedExplanation() {
    return validateModel(this.data, {
      Obligated: foreignBenefitType.Obligated,
      ObligatedExplanation: foreignBenefitType.ObligatedExplanation,
    }, { benefitType: 'OneTime' }) === true
  }

  isValid() {
    return validateForeignBenefitType(this.data, { benefitType: 'OneTime' }) === true
  }
}

export class FutureBenefitValidator {
  constructor(data = {}) {
    this.data = data
  }

  validFrequency() {
    return validateModel(this.data, {
      Frequency: foreignBenefitType.Frequency,
      OtherFrequency: foreignBenefitType.OtherFrequency,
    }, { benefitType: 'Future' }) === true
  }

  validObligatedExplanation() {
    return validateModel(this.data, {
      Obligated: foreignBenefitType.Obligated,
      ObligatedExplanation: foreignBenefitType.ObligatedExplanation,
    }, { benefitType: 'Future' }) === true
  }

  isValid() {
    return validateForeignBenefitType(this.data, { benefitType: 'Future' }) === true
  }
}

export class ContinuingBenefitValidator {
  constructor(data = {}) {
    this.data = data
  }

  validFrequency() {
    return validateModel(this.data, {
      Frequency: foreignBenefitType.Frequency,
      OtherFrequency: foreignBenefitType.OtherFrequency,
    }, { benefitType: 'Continuing' }) === true
  }

  validObligatedExplanation() {
    return validateModel(this.data, {
      Obligated: foreignBenefitType.Obligated,
      ObligatedExplanation: foreignBenefitType.ObligatedExplanation,
    }, { benefitType: 'Continuing' }) === true
  }

  isValid() {
    return validateForeignBenefitType(this.data, { benefitType: 'Continuing' }) === true
  }
}

export class OtherBenefitValidator {
  constructor(data = {}) {
    this.data = data
  }

  validFrequency() {
    return validateModel(this.data, {
      Frequency: foreignBenefitType.Frequency,
      OtherFrequency: foreignBenefitType.OtherFrequency,
    }, { benefitType: 'Other' }) === true
  }

  isValid() {
    return validateForeignBenefitType(this.data, { benefitType: 'Other' }) === true
  }
}
