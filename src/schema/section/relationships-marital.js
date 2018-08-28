import * as form from '../form'

export const relationshipsMarital = (data = {}) => {
  const items = ((data.DivorcedList || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Birthdate: form.datecontrol(xitem.Birthdate),
        BirthPlace: form.location(xitem.BirthPlace),
        Citizenship: form.country(xitem.Citizenship),
        Telephone: form.telephone(xitem.Telephone),
        Recognized: form.datecontrol(xitem.Recognized),
        Address: form.location(xitem.Address),
        DateDivorced: form.datecontrol(xitem.DateDivorced),
        Status: form.radio(xitem.Status),
        Deceased: form.radio(xitem.Deceased),
        DeceasedAddress: form.location(xitem.DeceasedAddress),
        DeceasedAddressNotApplicable: form.notapplicable(
          xitem.DeceasedAddressNotApplicable
        )
      }
    }
  })
  return {
    Status: form.radio(data.Status),
    CivilUnion: form.civilunion(data.CivilUnion),
    DivorcedList: form.collection(items, (data.DivorcedList || {}).branch)
  }
}
