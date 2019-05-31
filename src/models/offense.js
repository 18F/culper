import { hasYesOrNo, checkValue } from 'models/validate'
import offenseAddress from 'models/shared/locations/offense'
import charge from 'models/shared/charge'
import sentence from 'models/shared/sentence'

const offense = {
  Date: { presence: true, date: true },
  Description: { presence: true, hasValue: true },
  InvolvedViolence: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  InvolvedFirearms: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  InvolvedSubstances: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
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
  Charges: (value, attributes) => (
    checkValue(attributes.WasCharged, 'Yes')
      ? {
        presence: true,
        accordion: { validator: charge, ignoreBranch: true },
      } : {}
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
