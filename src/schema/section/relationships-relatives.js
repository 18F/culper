import * as form from '../form'

export const relationshipsRelatives = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Relation: form.radio(x.Item.Relation),
        Name: form.name(x.Item.Name),
        Birthdate: form.datecontrol(x.Item.Birthdate),
        Birthplace: form.location(x.Item.Birthplace),
        Citizenship: form.country(x.Item.Citizenship),
        MaidenSameAsListed: form.branch(x.Item.MaidenSameAsListed),
        MaidenName: form.name(x.Item.MaidenName),
        Aliases: form.collection((x.Item.Aliases || []).map(y => {
          return {
            Item: {
              Name: form.name(y.Item.Name),
              MaidenName: form.branch(y.Item.MaidenName),
              Dates: form.daterange(y.Item.Dates),
              Reason: form.textarea(y.Item.Reason)
            }
          }
        })),
        IsDeceased: form.branch(x.Item.IsDeceased),
        Address: form.location(x.Item.Address),
        DocumentNumber: form.text(x.Item.DocumentNumber),
        CourtName: form.text(x.Item.CourtName),
        CourtAddress: form.location(x.Item.CourtAddress),
        Document: form.radio(x.Item.Document),
        DocumentComments: form.textarea(x.Item.DocumentComments),
        ResidenceDocumentNumber: form.text(x.Item.ResidenceDocumentNumber),
        Expiration: form.datecontrol(x.Item.Expiration),
        FirstContact: form.datecontrol(x.Item.FirstContact),
        LastContact: form.datecontrol(x.Item.LastContact),
        Methods: form.checkbox(x.Item.Methods),
        MethodsComments: form.textarea(x.Item.MethodsComments),
        Frequency: form.radio(x.Item.Frequency),
        EmployerNotApplicable: form.notapplicable(x.Item.EmployerNotApplicable),
        EmployerAddressNotApplicable: form.notapplicable(x.Item.EmployerAddressNotApplicable),
        EmployerRelationshipNotApplicable: form.notapplicable(x.Item.EmployerRelationshipNotApplicable),
        Employer: form.text(x.Item.Employer),
        EmployerAddress: form.location(x.Item.EmployerAddress),
        HasAffiliation: form.branch(x.Item.HasAffiliation),
        EmployerRelationship: form.textarea(x.Item.EmployerRelationship)
      }
    }
  })
  return {
    List: form.collection(items, data.ListBranch)
  }
}
