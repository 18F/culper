import * as form from '../form'

export const foreignContacts = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        NameNotApplicable: form.notapplicable(xitem.NameNotApplicable),
        NameExplanation: form.textarea(xitem.NameExplanation),
        FirstContact: form.datecontrol(xitem.FirstContact),
        LastContact: form.datecontrol(xitem.LastContact),
        Methods: form.checkboxgroup(xitem.Methods),
        MethodsExplanation: form.textarea(xitem.MethodsExplanation),
        Frequency: form.radio(xitem.Frequency),
        FrequencyExplanation: form.textarea(xitem.FrequencyExplanation),
        Relationship: form.checkboxgroup(xitem.Relationship),
        RelationshipExplanation: form.textarea(xitem.RelationshipExplanation),
        Aliases: form.collection(
          ((xitem.Aliases || {}).items || []).map(y => {
            const yitem = y.Item || {}
            return {
              Item: {
                Has: form.branch(yitem.Has),
                Alias: form.name(yitem.Alias)
              }
            }
          })
        ),
        Citizenship: form.country(xitem.Citizenship),
        Birthdate: form.datecontrol(xitem.Birthdate),
        BirthdateNotApplicable: form.notapplicable(
          xitem.BirthdateNotApplicable
        ),
        Birthplace: form.location(xitem.Birthplace),
        BirthplaceNotApplicable: form.notapplicable(
          xitem.BirthplaceNotApplicable
        ),
        Address: form.location(xitem.Address),
        AddressNotApplicable: form.notapplicable(xitem.AddressNotApplicable),
        Employer: form.text(xitem.Employer),
        EmployerNotApplicable: form.notapplicable(xitem.EmployerNotApplicable),
        EmployerAddress: form.location(xitem.EmployerAddress),
        EmployerAddressNotApplicable: form.notapplicable(
          xitem.EmployerAddressNotApplicable
        ),
        HasAffiliations: form.branch(xitem.HasAffiliations),
        Affiliations: form.textarea(xitem.Affiliations)
      }
    }
  })
  return {
    HasForeignContacts: form.branch(data.HasForeignContacts),
    List: form.collection(items, (data.List || {}).branch)
  }
}
