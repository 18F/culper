import * as form from '../form'

export const foreignBusinessSponsorship = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Birthdate: form.datecontrol(xitem.Birthdate),
        BirthdateNotApplicable: form.notapplicable(
          xitem.BirthdateNotApplicable
        ),
        Birthplace: form.location(xitem.Birthplace),
        Address: form.location(xitem.Address),
        Citizenship: form.country(xitem.Citizenship),
        Organization: form.text(xitem.Organization),
        OrganizationNotApplicable: form.notapplicable(
          xitem.OrganizationNotApplicable
        ),
        OrganizationAddress: form.location(xitem.OrganizationAddress),
        OrganizationAddressNotApplicable: form.notapplicable(
          xitem.OrganizationAddressNotApplicable
        ),
        Dates: form.daterange(xitem.Dates),
        Residence: form.location(xitem.Residence),
        Stay: form.textarea(xitem.Stay),
        Sponsorship: form.textarea(xitem.Sponsorship)
      }
    }
  })
  return {
    HasForeignSponsorship: form.branch(data.HasForeignSponsorship),
    List: form.collection(items, (data.List || {}).branch)
  }
}
