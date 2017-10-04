import * as form from '../form'

export const relationshipsCohabitants = (data = {}) => {
  const items = (data.CohabitantList || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Birthdate: form.datecontrol(x.Item.Birthdate),
        BirthPlace: form.location(x.Item.BirthPlace),
        ForeignBornDocument: form.foreignborndocument(x.Item.ForeignBornDocument),
        SSN: form.ssn(x.Item.SSN),
        OtherNames: form.collection((x.Item.OtherNames || []).map(y => {
          return {
            Item: {
              Name: form.name(y.Item.Name),
              MaidenName: form.branch(y.Item.MaidenName),
              DatesUsed: form.daterange(y.Item.DatesUsed)
            }
          }
        })),
        Citizenship: form.country(x.Item.Citizenship),
        CohabitationBegan: form.datecontrol(x.Item.CohabitationBegan)
      }
    }
  })
  return {
    HasCohabitant: form.branch(data.HasCohabitant),
    CohabitantList: form.collection(items, data.CohabitantListBranch)
  }
}
