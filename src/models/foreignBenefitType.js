import { hasYesOrNo } from 'models/validate'
import {
  ONE_TIME,
  FUTURE,
  CONTINUING,
  OTHER,
  foreignBenefitFrequencyOptions,
} from 'constants/enums/foreignActivityOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

// TODO - check max currency value $2,147,483,647

const foreignBenefitType = {
  Country: { presence: true, country: true },
  Value: { presence: true, hasValue: { validator: { numericality: true } } },
  Reason: { presence: true, hasValue: true },
  Obligated: { presence: true, hasValue: { validator: hasYesOrNo } },
  ObligatedExplanation: (value, attributes) => {
    const { Obligated } = attributes
    if (Obligated && Obligated.value === 'Yes') {
      return { presence: true, hasValue: true }
    }

    return {}
  },
  Received: (value, attributes, attributeName, options) => {
    const { benefitType } = options
    if (benefitType === ONE_TIME) {
      return {
        presence: true,
        date: true,
      }
    }

    return {}
  },
  Began: (value, attributes, attributeName, options) => {
    const { benefitType } = options
    if ([FUTURE, CONTINUING, OTHER].indexOf(benefitType) > -1) {
      const dateLimits = {}

      if (benefitType === FUTURE) {
        dateLimits.earliest = DEFAULT_LATEST
      } else {
        dateLimits.latest = DEFAULT_LATEST
      }

      return {
        presence: true,
        date: dateLimits,
      }
    }

    return {}
  },
  Frequency: (value, attributes, attributeName, options) => {
    const { benefitType } = options
    if ([FUTURE, CONTINUING, OTHER].indexOf(benefitType) > -1) {
      return {
        presence: true,
        hasValue: { validator: { inclusion: foreignBenefitFrequencyOptions } },
      }
    }

    return {}
  },
  OtherFrequency: (value, attributes) => {
    const { Frequency } = attributes
    if (Frequency && Frequency.value === 'Other') {
      return { presence: true, hasValue: true }
    }

    return {}
  },
  End: (value, attributes, attributeName, options) => {
    const { benefitType } = options
    if ([CONTINUING, OTHER].indexOf(benefitType) > -1) {
      const dateLimits = {}
      if (attributes.Began) dateLimits.earliest = attributes.Began
      return {
        presence: true,
        date: dateLimits,
      }
    }

    return {}
  },
  OtherFrequencyTypeExplanation: (value, attributes, attributeName, options) => {
    const { benefitType } = options
    if (benefitType === OTHER) {
      return { presence: true, hasValue: true }
    }

    return {}
  },
}

export default foreignBenefitType
