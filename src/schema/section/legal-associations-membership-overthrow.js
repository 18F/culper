import * as form from '../form'

export const legalAssociationsMembershipOverthrow = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Organization: form.text(xitem.Organization),
        Address: form.location(xitem.Address),
        Dates: form.daterange(xitem.Dates),
        Positions: form.text(xitem.Positions),
        PositionsNotApplicable: form.notapplicable(
          xitem.PositionsNotApplicable
        ),
        Contributions: form.text(xitem.Contributions),
        ContributionsNotApplicable: form.notapplicable(
          xitem.ContributionsNotApplicable
        ),
        Reasons: form.textarea(xitem.Reasons)
      }
    }
  })
  return {
    HasOverthrow: form.branch(data.HasOverthrow),
    List: form.collection(items, (data.List || {}).branch)
  }
}
