import { validateModel, hasYesOrNo } from 'models/validate'
import alcoholReceivedCounseling from 'models/alcoholReceivedCounseling'

export const validateReceivedCounseling = (data) => {
  const modelData = {
    ...data,
    TreatmentDates: {
      from: data.TreatmentBeganDate,
      to: data.TreatmentEndDate,
    },
  }

  return validateModel(modelData, alcoholReceivedCounseling)
}

export const validateReceivedCounselings = (data, formType, options = {}) => {
  const receivedCounselingsModel = {
    ReceivedTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.ReceivedTreatment
        && attributes.ReceivedTreatment.value === 'Yes') {
        return { presence: true, accordion: { validator: alcoholReceivedCounseling } }
      }
      return {}
    },
  }

  // We need to make actual date ranges for consistent validation
  const modelData = { ...data }
  if (data.List && data.List.items) {
    const newItems = data.List.items.map(i => ({
      ...i,
      Item: {
        ...i.Item,
        TreatmentDates: {
          from: i.Item && i.Item.TreatmentBeganDate,
          to: i.Item && i.Item.TreatmentEndDate,
        },
      },
    }))

    modelData.List.items = newItems
  }

  return validateModel(modelData, receivedCounselingsModel, options)
}

export default class ReceivedCounselingsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateReceivedCounselings(this.data) === true
  }
}

export class ReceivedCounselingValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCompletedTreatment() {
    return validateModel(this.data, {
      CompletedTreatment: alcoholReceivedCounseling.CompletedTreatment,
      NoCompletedTreatmentExplanation: alcoholReceivedCounseling.NoCompletedTreatmentExplanation,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      TreatmentProviderAddress: alcoholReceivedCounseling.TreatmentProviderAddress,
      UseSameAddress: alcoholReceivedCounseling.UseSameAddress,
      AgencyAddress: alcoholReceivedCounseling.AgencyAddress,
    }) === true
  }

  isValid() {
    return validateReceivedCounseling(this.data) === true
  }
}
