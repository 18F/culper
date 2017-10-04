import * as form from '../form'

export const foreignContacts = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        NameNotApplicable: form.notapplicable(x.Item.NameNotApplicable),
        NameExplanation: form.textarea(x.Item.NameExplanation),
        FirstContact: form.datecontrol(x.Item.FirstContact),
        LastContact: form.datecontrol(x.Item.LastContact),
        Methods: form.checkboxgroup(x.Item.Methods),
        MethodsExplanation: form.textarea(x.Item.MethodsExplanation),
        Frequency: form.radio(x.Item.Frequency),
        FrequencyExplanation: form.textarea(x.Item.FrequencyExplanation),
        Relationship: form.checkboxgroup(x.Item.Relationship),
        RelationshipExplanation: form.textarea(x.Item.RelationshipExplanation),
        Aliases: form.collection((x.Item.Aliases || []).map(y => {
          return {
            Item: {
              Alias: form.name(y.Item.Alias)
            }
          }
        })),
        Citizenship: form.country(x.Item.Citizenship),
        Birthdate: form.datecontrol(x.Item.Birthdate),
        BirthdateNotApplicable: form.notapplicable(x.Item.BirthdateNotApplicable),
        Birthplace: form.location(x.Item.Birthplace),
        BirthplaceNotApplicable: form.notapplicable(x.Item.BirthplaceNotApplicable),
        Address: form.location(x.Item.Address),
        AddressNotApplicable: form.notapplicable(x.Item.AddressNotApplicable),
        Employer: form.text(x.Item.Employer),
        EmployerNotApplicable: form.notapplicable(x.Item.EmployerNotApplicable),
        EmployerAddress: form.location(x.Item.EmployerAddress),
        EmployerAddressNotApplicable: form.notapplicable(x.Item.EmployerAddressNotApplicable),
        HasAffiliations: form.branch(x.Item.HasAffiliations),
        Affiliations: form.textarea(x.Item.Affiliations)
      }
    }
  })
  return {
    HasForeignContacts: form.branch(data.HasForeignContacts),
    List: form.collection(items, data.ListBranch)
  }
}
