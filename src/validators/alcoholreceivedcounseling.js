/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceAlcoholReceivedCounselingModel from 'models/sections/substanceAlcoholReceivedCounseling'

export const validateReceivedCounselings = (data, formType, options = {}) => {
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

  return validateModel(modelData, substanceAlcoholReceivedCounselingModel, options)
}
