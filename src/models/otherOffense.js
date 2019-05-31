import { hasYesOrNo, checkValue } from 'models/validate'
import offenseAddress from 'models/shared/locations/offense'
import sentence from 'models/shared/sentence'
import { offenseChargeTypes } from 'constants/enums/legalOptions'

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
  CourtDate: { presence: true, date: true },
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
