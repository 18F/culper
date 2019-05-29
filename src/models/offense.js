import { hasYesOrNo } from 'models/validate'
import offenseAddress from 'models/shared/locations/offense'
import sentence from 'models/shared/sentence'

const offenseChargeTypes = ['Felony', 'Misdemeanor', 'Other']

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
  CitedBy: (value, attributes) => {
    if (attributes.WasCited && attributes.WasCited.value === 'Yes') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  AgencyAddress: (value, attributes) => {
    if (attributes.WasCited && attributes.WasCited.value === 'Yes') {
      return {
        presence: true,
        location: { validator: offenseAddress },
      }
    }

    return {}
  },
  WasCharged: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  Explanation: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'No') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  CourtName: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'Yes') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  CourtAddress: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'Yes') {
      return {
        presence: true,
        location: { validator: offenseAddress },
      }
    }

    return {}
  },
  ChargeType: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'Yes') {
      return {
        presence: true,
        hasValue: { validator: { inclusion: offenseChargeTypes } },
      }
    }

    return {}
  },
  CourtCharge: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'Yes') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  CourtOutcome: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'Yes') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  CourtDate: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'Yes') {
      return {
        presence: true,
        date: true,
      }
    }

    return {}
  },
  WasSentenced: (value, attributes) => {
    if (attributes.WasCharged && attributes.WasCharged.value === 'Yes') {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  AwaitingTrial: (value, attributes) => {
    if (attributes.WasSentenced && attributes.WasSentenced.value === 'No') {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  AwaitingTrialExplanation: (value, attributes) => {
    if (attributes.WasSentenced && attributes.WasSentenced.value === 'No') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  Sentence: (value, attributes) => {
    if (attributes.WasSentenced && attributes.WasSentenced.value === 'Yes') {
      return {
        presence: true,
        model: { validator: sentence },
      }
    }

    return {}
  },
}

export default offense
