import * as form from '../form'

export const psychologicalExisting = (data = {}) => {
  const items = (data.TreatmentList || []).map(x => {
    return {
      Item: {
        Condition: form.text(x.Item.Condition),
        Diagnosed: form.daterange(x.Item.Diagnosed),
        Treatment: form.treatment(x.Item.Treatment),
        TreatmentFacility: form.treatment(x.Item.TreatmentFacility),
        Effective: form.branch(x.Item.Effective),
        Explanation: form.textarea(x.Item.Explanation)
      }
    }
  })
  return {
    HasCondition: form.branch(data.HasCondition),
    ReceivedTreatment: form.radio(data.ReceivedTreatment),
    Explanation: form.textarea(data.Explanation),
    TreatmentList: form.collection(items, data.TreatmentListBranch),
    DidNotFollow: form.branch(data.DidNotFollow),
    DidNotFollowExplanation: form.textarea(data.DidNotFollowExplanation)
  }
}
