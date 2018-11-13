import * as form from '../form'

export const historyResidence = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Dates: form.daterange(xitem.Dates),
        Address: form.location(xitem.Address),
        AlternateAddress: form.physicaladdress(xitem.AlternateAddress),
        Comments: form.textarea(xitem.Comments),
        ReferenceName: form.name(xitem.ReferenceName),
        ReferenceLastContact: form.datecontrol(xitem.ReferenceLastContact),
        ReferenceRelationshipComments: form.checkboxgroup(
          xitem.ReferenceRelationshipComments
        ),
        ReferenceRelationship: form.checkboxgroup(xitem.ReferenceRelationship),
        ReferenceRelationshipOther: form.text(xitem.ReferenceRelationshipOther),
        ReferencePhoneEvening: form.telephone(xitem.ReferencePhoneEvening),
        ReferencePhoneDay: form.telephone(xitem.ReferencePhoneDay),
        ReferencePhoneMobile: form.telephone(xitem.ReferencePhoneMobile),
        ReferenceEmailNotApplicable: form.notapplicable(
          xitem.ReferenceEmailNotApplicable
        ),
        ReferenceEmail: form.email(xitem.ReferenceEmail),
        ReferenceAddress: form.location(xitem.ReferenceAddress),
        ReferenceAlternateAddress: form.physicaladdress(xitem.ReferenceAlternateAddress),
        Role: form.radio(xitem.Role),
        RoleOther: form.text(xitem.RoleOther)
      }
    }
  })

  return {
    List: form.collection(items, (data.List || {}).branch)
  }
}
