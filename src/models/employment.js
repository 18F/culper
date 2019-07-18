import {
  employmentActivityOptions,
  militaryEmploymentOptions,
  otherEmploymentOptions,
  SELF_EMPLOYMENT,
  UNEMPLOYMENT,
} from 'constants/enums/employmentOptions'

import physicalAddress from 'models/shared/physicalAddress'
import name from 'models/shared/name'
import email from 'models/shared/email'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

import { today, dateWithinRange } from 'helpers/date'
import { isInternational, isPO } from 'helpers/location'
import { checkValue } from 'models/validate'

/** Helpers */
const withinSevenYears = (dates = {}) => {
  const { from, present } = dates
  const to = present ? today.toObject() : dates.to
  const employmentTimeFrame = { years: 7 }

  return dateWithinRange(to, employmentTimeFrame)
    || dateWithinRange(from, employmentTimeFrame)
}

const matchEmploymentActivity = (attributes = {}, activities = []) => (
  attributes
    && attributes.EmploymentActivity
    && activities.includes(attributes.EmploymentActivity.value)
)

/** Nested models (could be broken out into other files) */

const supervisor = {
  SupervisorName: { presence: true, hasValue: true },
  Title: { presence: true, hasValue: true },
  EmailNotApplicable: {},
  Email: (value, attributes = {}) => {
    const { EmailNotApplicable } = attributes
    if (EmailNotApplicable && !EmailNotApplicable.applicable) return {}
    return { presence: true, model: { validator: email } }
  },
  Address: { presence: true, location: { validator: address } },
  AlternateAddress: (value, attributes) => {
    if (attributes.Address && isInternational(attributes.Address)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: true },
      }
    }

    if (attributes.Address && isPO(attributes.Address)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: false },
      }
    }

    return {}
  },
  Telephone: { presence: true, model: { validator: phone } },
}

const additional = {
  Position: { presence: true, hasValue: true },
  Supervisor: { presence: true, hasValue: true },
  DatesEmployed: { presence: true, daterange: true },
}

const reprimand = {
  Text: { presence: true, hasValue: true },
  Date: { presence: true, date: { requireDay: false } },
}

const reasonLeftReason = {
  Reason: { presence: true, hasValue: true },
  Date: { presence: true, date: true },
  Text: { presence: true, hasValue: true },
}

const reasonLeft = {
  ReasonDescription: { presence: true, hasValue: true },
  Reasons: (value, attributes, attributeName, options) => {
    if (options && options.reasonsRequired) {
      return {
        presence: true,
        branchCollection: {
          validator: reasonLeftReason,
        },
      }
    }

    return {}
  },
}

/** Employment model */
const employment = {
  /** Required by all */
  EmploymentActivity: {
    presence: true,
    model: {
      validator: {
        value: {
          presence: true,
          inclusion: employmentActivityOptions,
        },
        otherExplanation: (value, attributes) => {
          if (attributes.value && attributes.value === 'Other') {
            return { presence: true }
          }
          return {}
        },
      },
    },
  },
  Dates: {
    presence: true,
    daterange: true,
  },

  // Required by all but Unemployment
  Title: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [UNEMPLOYMENT])) return {}
    return { presence: true }
  },
  Status: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [UNEMPLOYMENT])) return {}
    return { presence: true }
  },
  Address: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [UNEMPLOYMENT])) return {}
    return {
      presence: true,
      location: { validator: address },
    }
  },
  AlternateAddress: (value, attributes) => {
    if (attributes.Address && isInternational(attributes.Address)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: true },
      }
    }

    if (attributes.Address && isPO(attributes.Address)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: false },
      }
    }

    return {}
  },
  Telephone: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [UNEMPLOYMENT])) return {}
    return {
      presence: true,
      model: { validator: phone, requireNumber: true },
    }
  },

  ReasonLeft: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [UNEMPLOYMENT])) return {}
    const { Dates } = attributes
    if (Dates && Dates.present === true) return {}

    return {
      presence: true,
      model: {
        validator: reasonLeft,
        reasonsRequired: withinSevenYears(Dates),
      },
    }
  },

  Reprimand: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [UNEMPLOYMENT])) return {}
    const { Dates } = attributes
    if (withinSevenYears(Dates)) {
      return {
        presence: true,
        branchCollection: {
          validator: reprimand,
        },
      }
    }

    return {}
  },

  // Required by military & other
  Supervisor: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [
      ...militaryEmploymentOptions,
      ...otherEmploymentOptions,
    ])) {
      return {
        presence: true,
        model: {
          validator: supervisor,
        },
      }
    }

    return {}
  },

  // Required by other & self-employment
  Employment: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [
      ...otherEmploymentOptions,
      SELF_EMPLOYMENT,
    ])) {
      return { presence: true }
    }

    return {}
  },

  PhysicalAddress: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [
      ...otherEmploymentOptions,
      SELF_EMPLOYMENT,
    ])) {
      return {
        presence: true,
        model: {
          validator: physicalAddress,
        },
      }
    }

    return {}
  },

  PhysicalAlternateAddress: (value, attributes) => {
    const { PhysicalAddress } = attributes
    if (PhysicalAddress && checkValue(PhysicalAddress.HasDifferentAddress, 'Yes')) {
      const { Address } = PhysicalAddress
      if (Address && isInternational(Address)) {
        return {
          presence: true,
          model: { validator: physicalAddress, militaryAddress: true },
        }
      }

      if (Address && isPO(Address)) {
        return {
          presence: true,
          model: { validator: physicalAddress, militaryAddress: false },
        }
      }
    }

    return {}
  },

  // Required by self-employment & unemployed
  ReferenceName: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [
      SELF_EMPLOYMENT,
      UNEMPLOYMENT,
    ])) {
      return {
        presence: true,
        model: {
          validator: name,
          hideMiddleName: true,
        },
      }
    }

    return {}
  },
  ReferencePhone: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [
      SELF_EMPLOYMENT,
      UNEMPLOYMENT,
    ])) {
      return {
        presence: true,
        model: { validator: phone, requireNumber: true },
      }
    }

    return {}
  },
  ReferenceAddress: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, [
      SELF_EMPLOYMENT,
      UNEMPLOYMENT,
    ])) {
      return {
        presence: true,
        location: { validator: address },
      }
    }

    return {}
  },
  ReferenceAlternateAddress: (value, attributes = {}) => {
    if (attributes.ReferenceAddress && isInternational(attributes.ReferenceAddress)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: true },
      }
    }

    if (attributes.ReferenceAddress && isPO(attributes.ReferenceAddress)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: false },
      }
    }

    return {}
  },

  // Required by military
  DutyStation: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, militaryEmploymentOptions)) {
      return { presence: true }
    }

    return {}
  },

  // Applies to other employment
  Additional: (value, attributes = {}) => {
    if (matchEmploymentActivity(attributes, otherEmploymentOptions)) {
      return {
        branchCollection: {
          validator: additional,
        },
      }
    }
    return {}
  },
}

export default employment
