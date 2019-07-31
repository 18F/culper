import { checkValueIncluded } from 'models/validate'
import { US_DEPT_OF_TREASURY, FOREIGN_GOVT, OTHER } from 'constants/enums/legalOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

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
  Issued: {},
  Granted: (value, attributes) => {
    if (attributes.GrantedNotApplicable
      && attributes.GrantedNotApplicable.applicable === false) {
      return {}
    }
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.Completed) dateLimits.earliest = attributes.Completed
    return { presence: true, date: dateLimits }
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
