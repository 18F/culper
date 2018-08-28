import * as form from '../form'

export const relationshipsRelatives = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Relation: form.radio(xitem.Relation),
        Name: form.name(xitem.Name),
        Birthdate: form.datecontrol(xitem.Birthdate),
        Birthplace: form.location(xitem.Birthplace),
        Citizenship: form.country(xitem.Citizenship),
        CitizenshipDocumentation: form.radio(xitem.CitizenshipDocumentation),
        MaidenSameAsListed: form.branch(xitem.MaidenSameAsListed),
        MaidenName: form.name(xitem.MaidenName),
        Aliases: form.collection(
          ((xitem.Aliases || {}).items || []).map(y => {
            const yitem = y.Item || {}
            return {
              Item: {
                Has: form.branch(yitem.Has),
                Name: form.name(yitem.Name),
                MaidenName: form.branch(yitem.MaidenName),
                Dates: form.daterange(yitem.Dates),
                Reason: form.textarea(yitem.Reason)
              }
            }
          })
        ),
        IsDeceased: form.branch(xitem.IsDeceased),
        Address: form.location(xitem.Address),
        DocumentNumber: form.text(xitem.DocumentNumber),
        CourtName: form.text(xitem.CourtName),
        CourtAddress: form.location(xitem.CourtAddress),
        Document: form.radio(xitem.Document),
        DocumentComments: form.textarea(xitem.DocumentComments),
        ResidenceDocumentNumber: form.text(xitem.ResidenceDocumentNumber),
        Expiration: form.datecontrol(xitem.Expiration),
        FirstContact: form.datecontrol(xitem.FirstContact),
        LastContact: form.datecontrol(xitem.LastContact),
        Methods: form.checkboxgroup(xitem.Methods),
        MethodsComments: form.textarea(xitem.MethodsComments),
        Frequency: form.radio(xitem.Frequency),
        EmployerNotApplicable: form.notapplicable(xitem.EmployerNotApplicable),
        EmployerAddressNotApplicable: form.notapplicable(
          xitem.EmployerAddressNotApplicable
        ),
        EmployerRelationshipNotApplicable: form.notapplicable(
          xitem.EmployerRelationshipNotApplicable
        ),
        Employer: form.text(xitem.Employer),
        EmployerAddress: form.location(xitem.EmployerAddress),
        HasAffiliation: form.branch(xitem.HasAffiliation),
        EmployerRelationship: form.textarea(xitem.EmployerRelationship)
      }
    }
  })
  return {
    List: form.collection(items, (data.List || {}).branch)
  }
}
