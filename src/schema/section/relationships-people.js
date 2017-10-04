import * as form from '../form'

export const relationshipsPeople = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Address: form.location(x.Item.Address),
        Dates: form.daterange(x.Item.Dates),
        Email: form.email(x.Item.Email),
        EmailNotApplicable: form.notapplicable(x.Item.EmailNotApplicable),
        MobileTelephone: form.telephone(x.Item.MobileTelephone),
        OtherTelephone: form.telephone(x.Item.OtherTelephone),
        Rank: form.text(x.Item.Rank),
        RankNotApplicable: form.notapplicable(x.Item.RankNotApplicable),
        Relationship: form.checkbox(x.Item.Relationship),
        RelationshipOther: form.text(x.Item.RelationshipOther)
      }
    }
  })
  return {
    List: form.collection(items, data.ListBranch)
  }
}
