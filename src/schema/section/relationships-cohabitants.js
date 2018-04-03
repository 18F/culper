import * as form from '../form'

export const relationshipsCohabitants = (data = {}) => {
  const items = ((data.CohabitantList || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Birthdate: form.datecontrol(xitem.Birthdate),
        BirthPlace: form.location(xitem.BirthPlace),
        ForeignBornDocument: form.foreignborndocument(xitem.ForeignBornDocument),
        SSN: form.ssn(xitem.SSN),
        OtherNames: form.collection(((xitem.OtherNames || {}).items || []).map(y => {
          const yitem = y.Item || {}
          return {
            Item: {
              Has: form.branch(yitem.Has),
              OtherName: form.name(yitem.OtherName),
              MaidenName: form.branch(yitem.MaidenName),
              DatesUsed: form.daterange(yitem.DatesUsed)
            }
          }
        })),
        Citizenship: form.country(xitem.Citizenship),
        CohabitationBegan: form.datecontrol(xitem.CohabitationBegan)
      }
    }
  })
  return {
    HasCohabitant: form.branch(data.HasCohabitant),
    CohabitantList: form.collection(items, (data.CohabitantList || {}).branch)
  }
}
