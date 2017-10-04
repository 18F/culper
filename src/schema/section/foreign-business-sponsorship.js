import * as form from '../form'

export const foreignBusinessSponsorship = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Birthdate: form.datecontrol(x.Item.Birthdate),
        BirthdateNotApplicable: form.notapplicable(x.Item.BirthdateNotApplicable),
        Birthplace: form.location(x.Item.Birthplace),
        Address: form.location(x.Item.Address),
        Citizenship: form.country(x.Item.Citizenship),
        Organization: form.text(x.Item.Organization),
        OrganizationNotApplicable: form.notapplicable(x.Item.OrganizationNotApplicable),
        OrganizationAddress: form.location(x.Item.OrganizationAddress),
        OrganizationAddressNotApplicable: form.notapplicable(x.Item.OrganizationAddressNotApplicable),
        Dates: form.daterange(x.Item.Dates),
        Residence: form.location(x.Item.Residence),
        Stay: form.textarea(x.Item.Stay),
        Sponsorship: form.textarea(x.Item.Sponsorship)
      }
    }
  })
  return {
    HasForeignSponsorship: form.branch(data.HasForeignSponsorship),
    List: form.collection(items, data.ListBranch)
  }
}
