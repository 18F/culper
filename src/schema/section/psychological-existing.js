import * as form from '../form'

export const psychologicalExisting = (data = {}) => {
  return {
    HasCondition: form.branch(data.HasCondition),
    ReceivedTreatment: form.radio(data.ReceivedTreatment),
    Explanation: form.textarea(data.Explanation),
    TreatmentList: form.collection(data.TreatmentList),
    DidNotFollow: form.branch(data.DidNotFollow),
    DidNotFollowExplanation: form.textarea(data.DidNotFollowExplanation)
  }
}
