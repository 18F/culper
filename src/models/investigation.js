import { checkValueIncluded } from 'models/validate'
import {
  US_DEPT_OF_TREASURY, FOREIGN_GOVT, OTHER,
} from 'constants/enums/legalOptions'

export const clearanceLevel = {
  Level: { presence: true, hasValue: true },
  Explanation: (value, attributes) => {
    if (attributes.Level && attributes.Level.value === 'Other') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

const investigation = {
  Agency: (value, attributes) => {
    if (attributes.AgencyNotApplicable
      && attributes.AgencyNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  AgencyExplanation: (value, attributes) => {
    if (checkValueIncluded(attributes.Agency, [US_DEPT_OF_TREASURY, FOREIGN_GOVT, OTHER])) {
      return { presence: true, hasValue: true }
    }

    return {}
  },
  Completed: (value, attributes) => {
    if (attributes.CompletedNotApplicable
      && attributes.CompletedNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, date: true }
  },
  Granted: (value, attributes) => {
    if (attributes.GrantedNotApplicable
      && attributes.GrantedNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, date: true }
  },
  ClearanceLevel: (value, attributes) => {
    if (attributes.ClearanceLevelNotApplicable
      && attributes.ClearanceLevelNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, model: { validator: clearanceLevel } }
  },
}

export default investigation
