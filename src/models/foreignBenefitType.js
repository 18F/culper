import { hasYesOrNo } from 'models/validate'
import {
  ONE_TIME,
  FUTURE,
  CONTINUING,
  OTHER,
  foreignBenefitFrequencyOptions,
} from 'constants/enums/foreignActivityOptions'

// TODO - check max currency value $2,147,483,647

const foreignBenefitType = {
  // TODO country
  Country: { presence: true, hasValue: true },
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
  // TODO must be >= DOBSpouseDOBCohabDOBFloor ??, <= NOW
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
  // TODO must be >= NOW if Future
  // TODO must be >= DOBSpouseDOBCohabDOBFloor ??, <= NOW if Continuing/Other
  Began: (value, attributes, attributeName, options) => {
    const { benefitType } = options
    if ([FUTURE, CONTINUING, OTHER].indexOf(benefitType) > -1) {
      return {
        presence: true,
        date: true,
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
  // TODO must be >= date began, future ok
  End: (value, attributes, attributeName, options) => {
    const { benefitType } = options
    if ([CONTINUING, OTHER].indexOf(benefitType) > -1) {
      return {
        presence: true,
        date: true,
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
