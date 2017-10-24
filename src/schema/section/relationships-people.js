import * as form from '../form'

export const relationshipsPeople = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Address: form.location(xitem.Address),
        Dates: form.daterange(xitem.Dates),
        Email: form.email(xitem.Email),
        EmailNotApplicable: form.notapplicable(xitem.EmailNotApplicable),
        MobileTelephone: form.telephone(xitem.MobileTelephone),
        OtherTelephone: form.telephone(xitem.OtherTelephone),
        Rank: form.text(xitem.Rank),
        RankNotApplicable: form.notapplicable(xitem.RankNotApplicable),
        Relationship: form.checkbox(xitem.Relationship),
        RelationshipOther: form.text(xitem.RelationshipOther)
      }
    }
  })
  return {
    List: form.collection(items, (data.ListBranch || {}).branch)
  }
}
