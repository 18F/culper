import { validateModel } from 'models/validate'
import foreignBenefit from 'models/foreignBenefit'
import foreignBenefitType from 'models/foreignBenefitType'

export const validateForeignBenefit = data => (
  validateModel(data, foreignBenefit) === true
)

export const validateForeignBenefitType = (data, options = {}) => (
  validateModel(data, foreignBenefitType, options) === true
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
    return validateForeignBenefit(this.data)
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
    return validateForeignBenefitType(this.data, { benefitType: 'OneTime' })
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
    return validateForeignBenefitType(this.data, { benefitType: 'Future' })
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
    return validateForeignBenefitType(this.data, { benefitType: 'Continuing' })
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
    return validateForeignBenefitType(this.data, { benefitType: 'Other' })
  }
}
