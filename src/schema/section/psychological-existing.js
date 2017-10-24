import * as form from '../form'

export const psychologicalExisting = (data = {}) => {
  const items = ((data.TreatmentList || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Condition: form.text(xitem.Condition),
        Diagnosed: form.daterange(xitem.Diagnosed),
        Treatment: form.treatment(xitem.Treatment),
        TreatmentFacility: form.treatment(xitem.TreatmentFacility),
        Effective: form.branch(xitem.Effective),
        Explanation: form.textarea(xitem.Explanation)
      }
    }
  })
  return {
    HasCondition: form.branch(data.HasCondition),
    ReceivedTreatment: form.radio(data.ReceivedTreatment),
    Explanation: form.textarea(data.Explanation),
    TreatmentList: form.collection(items, (data.TreatmentList || {}).branch),
    DidNotFollow: form.branch(data.DidNotFollow),
    DidNotFollowExplanation: form.textarea(data.DidNotFollowExplanation)
  }
}
