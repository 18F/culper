import { hasYesOrNo, checkValue } from 'models/validate'
import offenseAddress from 'models/shared/locations/offense'
import sentence from 'models/shared/sentence'
import { offenseChargeTypes } from 'constants/enums/legalOptions'

const offense = {
  Date: { presence: true, date: true },
  Description: { presence: true, hasValue: true },
  InvolvedViolence: (value, attributes, attributeName, options) => {
    if (options.requireLegalOffenseInvolvements) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  InvolvedFirearms: (value, attributes, attributeName, options) => {
    if (options.requireLegalOffenseInvolvements) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  InvolvedSubstances: (value, attributes, attributeName, options) => {
    if (options.requireLegalOffenseInvolvements) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  Address: {
    presence: true,
    location: { validator: offenseAddress },
  },
  WasCited: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  CitedBy: (value, attributes) => (
    checkValue(attributes.WasCited, 'Yes')
      ? { presence: true, hasValue: true }
      : {}
  ),
  AgencyAddress: (value, attributes) => (
    checkValue(attributes.WasCited, 'Yes')
      ? {
        presence: true,
        location: { validator: offenseAddress },
      } : {}
  ),
  WasCharged: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  Explanation: (value, attributes) => (
    checkValue(attributes.WasCharged, 'No')
      ? { presence: true, hasValue: true }
      : {}
  ),
  CourtName: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? { presence: true, hasValue: true }
      : {}
  ),
  CourtAddress: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? {
        presence: true,
        location: { validator: offenseAddress },
      } : {}
  ),
  ChargeType: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? {
        presence: true,
        hasValue: { validator: { inclusion: offenseChargeTypes } },
      } : {}
  ),
  CourtCharge: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? { presence: true, hasValue: true }
      : {}
  ),
  CourtOutcome: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? { presence: true, hasValue: true }
      : {}
  ),
  CourtDate: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? { presence: true, date: { requireDay: false } }
      : {}
  ),
  WasSentenced: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? { presence: true, hasValue: { validator: hasYesOrNo } }
      : {}
  ),
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
