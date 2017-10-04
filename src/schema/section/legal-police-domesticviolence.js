import * as form from '../form'

export const legalPoliceDomesticViolence = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Explanation: form.textarea(x.Item.Explanation),
        Issued: form.datecontrol(x.Item.Issued),
        CourtName: form.text(x.Item.CourtName),
        CourtAddress: form.location(x.Item.CourtAddress)
      }
    }
  })
  return {
    List: form.collection(items)
  }
}
