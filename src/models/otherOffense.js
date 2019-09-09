import { hasYesOrNo, checkValue } from 'models/validate'
import offenseAddress from 'models/shared/locations/offense'
import sentence from 'models/shared/sentence'
import { offenseChargeTypes } from 'constants/enums/legalOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const offense = {
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Description: { presence: true, hasValue: true },
  InvolvedViolence: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  InvolvedFirearms: (value, attributes, attributeName, options) => {
    if (options.requireLegalPoliceFirearms) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  InvolvedSubstances: (value, attributes, attributeName, options) => {
    if (options.requireLegalPoliceDrugs) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  CourtName: { presence: true, hasValue: true },
  CourtAddress: {
    presence: true,
    location: { validator: offenseAddress },
  },
  ChargeType: {
    presence: true,
    hasValue: { validator: { inclusion: offenseChargeTypes } },
  },
  CourtCharge: { presence: true, hasValue: true },
  CourtOutcome: { presence: true, hasValue: true },
  CourtDate: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  WasSentenced: { presence: true, hasValue: { validator: hasYesOrNo } },
  AwaitingTrial: (value, attributes) => (
    checkValue(attributes.WasSentenced, 'No')
      ? { presence: true, hasValue: { validator: hasYesOrNo } }
      : {}
  ),
  AwaitingTrialExplanation: (value, attributes) => (
    checkValue(attributes.WasSentenced, 'No')
      ? { presence: true, hasValue: true }
      : {}
  ),
  Sentence: (value, attributes) => (
    checkValue(attributes.WasSentenced, 'Yes')
      ? { presence: true, model: { validator: sentence } }
      : {}
  ),
}

export default offense
