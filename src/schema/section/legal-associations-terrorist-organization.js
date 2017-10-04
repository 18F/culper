import * as form from '../form'

export const legalAssociationsTerroristOrganization = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Organization: form.text(x.Item.Organization),
        Address: form.location(x.Item.Address),
        Dates: form.daterange(x.Item.Dates),
        Positions: form.text(x.Item.Positions),
        PositionsNotApplicable: form.notapplicable(x.Item.PositionsNotApplicable),
        Contributions: form.text(x.Item.Contributions),
        ContributionsNotApplicable: form.notapplicable(x.Item.ContributionsNotApplicable),
        Reasons: form.textarea(x.Item.Reasons)
      }
    }
  })
  return {
    HasTerrorist: form.branch(data.HasTerrorist),
    List: form.collection(items, data.ListBranch)
  }
}
