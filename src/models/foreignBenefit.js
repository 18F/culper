import {
  foreignBenefitFrequencyTypeOptions,
  foreignBenefitTypeOptions,
  ONE_TIME,
  FUTURE,
  CONTINUING,
  OTHER,
} from 'constants/enums/foreignActivityOptions'

import foreignBenefitType from 'models/foreignBenefitType'

const foreignBenefit = {
  InterestTypes: {
    presence: true,
    array: {
      validator: { presence: true },
      length: { minimum: 1 },
    },
  },
  BenefitType: {
    presence: true,
    hasValue: {
      validator: { inclusion: foreignBenefitTypeOptions },
    },
  },
  OtherBenefitType: (value, attributes) => {
    const { BenefitType } = attributes
    if (BenefitType && BenefitType.value === 'Other') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  BenefitFrequency: {
    presence: true,
    hasValue: {
      validator: { inclusion: foreignBenefitFrequencyTypeOptions },
    },
  },
  OneTimeBenefit: (value, attributes) => {
    const { BenefitFrequency } = attributes
    if (BenefitFrequency && BenefitFrequency.value === ONE_TIME) {
      return {
        presence: true,
        model: {
          validator: foreignBenefitType,
          benefitType: ONE_TIME,
        },
      }
    }

    return {}
  },
  FutureBenefit: (value, attributes) => {
    const { BenefitFrequency } = attributes
    if (BenefitFrequency && BenefitFrequency.value === FUTURE) {
      return {
        presence: true,
        model: {
          validator: foreignBenefitType,
          benefitType: FUTURE,
        },
      }
    }

    return {}
  },
  ContinuingBenefit: (value, attributes) => {
    const { BenefitFrequency } = attributes
    if (BenefitFrequency && BenefitFrequency.value === CONTINUING) {
      return {
        presence: true,
        model: {
          validator: foreignBenefitType,
          benefitType: CONTINUING,
        },
      }
    }

    return {}
  },
  OtherBenefit: (value, attributes) => {
    const { BenefitFrequency } = attributes
    if (BenefitFrequency && BenefitFrequency.value === OTHER) {
      return {
        presence: true,
        model: {
          validator: foreignBenefitType,
          benefitType: OTHER,
        },
      }
    }

    return {}
  },
}

export default foreignBenefit
