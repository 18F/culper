import * as form from '../form'

export const relationshipsMarital = (data = {}) => {
  const items = (data.DivorcedList || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Birthdate: form.datecontrol(x.Item.Birthdate),
        BirthPlace: form.location(x.Item.BirthPlace),
        Telephone: form.telephone(x.Item.Telephone),
        Recognized: form.datecontrol(x.Item.Recognized),
        Address: form.location(x.Item.Address),
        DateDivorced: form.datecontrol(x.Item.DateDivorced),
        Status: form.radio(x.Item.Status),
        Deceased: form.radio(x.Item.Deceased),
        DeceasedAddress: form.location(x.Item.DeceasedAddress),
        DeceasedAddressNotApplicable: form.notapplicable(x.Item.DeceasedAddressNotApplicable)
      }
    }
  })
  return {
    Status: form.radio({ value: data.Status }),
    CivilUnion: form.civilunion(data.CivilUnion),
    DivorcedList: form.collection(items, data.DivorcedListBranch)
  }
}
