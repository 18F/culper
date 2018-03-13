import * as form from '../form'

export const legalPoliceDomesticViolence = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Explanation: form.textarea(xitem.Explanation),
        Issued: form.datecontrol(xitem.Issued),
        CourtName: form.text(xitem.CourtName),
        CourtAddress: form.location(xitem.CourtAddress)
      }
    }
  })
  return {
    HasDomesticViolence: form.branch(data.HasDomesticViolence),
    List: form.collection(items, (data.List || {}).branch)
  }
}
