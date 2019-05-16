import {
  employmentActivityOptions,
  militaryEmploymentOptions,
  otherEmploymentOptions,
  SELF_EMPLOYMENT,
  UNEMPLOYMENT,
} from 'constants/enums/employmentOptions'

import physicalAddress from 'models/shared/physicalAddress'
import date from 'models/shared/date'

import { today, dateWithinRange } from 'helpers/date'

const withinSevenYears = (dates = {}) => {
  const { from, present } = dates
  const to = present ? today.toObject() : dates.to
  const employmentTimeFrame = { years: 7 }

  return dateWithinRange(to, employmentTimeFrame)
    || dateWithinRange(from, employmentTimeFrame)
}

const supervisor = {
  SupervisorName: { presence: true },
  Title: { presence: true },
  EmailNotApplicable: {},
  Email: (value, attributes = {}) => {
    const { EmailNotApplicable } = attributes
    if (EmailNotApplicable && !EmailNotApplicable.applicable) return {}
    return { presence: true, email: true }
  },
  Address: { presence: true, address: true },
  Telephone: { presence: true, phone: true },
}

const additional = {
  Position: { presence: true },
  Supervisor: { presence: true },
  DatesEmployed: { presence: true, daterange: true },
}

const reprimand = {
  Text: { presence: true },
  Date: { presence: true, model: { validator: date } },
}

// TODO
/*
const reasonLeftReason = {
  Reason: { presence: true },
  Date: { presence: true, datetime: true },
  Text: { presence: true },
}

const reasonLeft = {
  ReasonDescription: { presence: true },
  Reasons: (value, attributes, attributeName, options) => {
    if (options && options.reasonsRequired) {
      return {
        branchCollection: {
          validator: reasonLeftReason,
        },
      }
    }

    return {}
  },
}
*/

const employment = {
  /** Required by all */
  EmploymentActivity: {
    presence: true,
    inclusion: employmentActivityOptions,
  },
  Dates: {
    presence: true,
    daterange: true,
  },

  // Required by all but Unemployment
  Title: (value, attributes = {}) => {
    if (attributes.EmploymentActivity === UNEMPLOYMENT) return {}
    return { presence: true }
  },
  Status: (value, attributes = {}) => {
    if (attributes.EmploymentActivity === UNEMPLOYMENT) return {}
    return { presence: true }
  },
  Address: (value, attributes = {}) => {
    if (attributes.EmploymentActivity === UNEMPLOYMENT) return {}
    return {
      presence: true,
      address: true,
    }
  },
  Telephone: (value, attributes = {}) => {
    if (attributes.EmploymentActivity === UNEMPLOYMENT) return {}
    return {
      presence: true,
      phone: true,
    }
  },
  /*
  ReasonLeft: (value, attributes = {}) => {
    if (attributes.EmploymentActivity === UNEMPLOYMENT) return {}

    const { Dates } = attributes
    if (Dates && Dates.present === true) return {}

    return {
      present: true,
      model: {
        validator: reasonLeft,
        reasonsRequired: withinSevenYears(Dates),
      },
    }
  },
  */

  Reprimand: (value, attributes = {}) => {
    if (attributes.EmploymentActivity === UNEMPLOYMENT) return {}
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
    if ([...militaryEmploymentOptions, ...otherEmploymentOptions]
      .includes(attributes.EmploymentActivity)) {
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
    if ([...otherEmploymentOptions, SELF_EMPLOYMENT].includes(attributes.EmploymentActivity)) {
      return { presence: true }
    }

    return {}
  },

  PhysicalAddress: (value, attributes = {}) => {
    if ([...otherEmploymentOptions, SELF_EMPLOYMENT].includes(attributes.EmploymentActivity)) {
      return {
        presence: true,
        model: {
          validator: physicalAddress,
        },
      }
    }

    return {}
  },

  // Required by self-employment & unemployed
  ReferenceName: (value, attributes = {}) => {
    if ([SELF_EMPLOYMENT, UNEMPLOYMENT].includes(attributes.EmploymentActivity)) {
      return {
        presence: true,
        name: true,
      }
    }

    return {}
  },
  ReferencePhone: (value, attributes = {}) => {
    if ([SELF_EMPLOYMENT, UNEMPLOYMENT].includes(attributes.EmploymentActivity)) {
      return {
        presence: true,
        phone: true,
      }
    }

    return {}
  },
  ReferenceAddress: (value, attributes = {}) => {
    if ([SELF_EMPLOYMENT, UNEMPLOYMENT].includes(attributes.EmploymentActivity)) {
      return {
        presence: true,
        address: true,
      }
    }

    return {}
  },

  // Required by military
  DutyStation: (value, attributes = {}) => {
    if (militaryEmploymentOptions.includes(attributes.EmploymentActivity)) {
      return { presence: true }
    }

    return {}
  },

  // Applies to other employment
  Additional: {
    branchCollection: {
      validator: additional,
    },
  },
}

export default employment
