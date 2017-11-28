import { branch } from './branch'
import { collection } from './collection'
import { location } from './location'
import { notapplicable } from './notapplicable'
import { datecontrol } from './datecontrol'
import { daterange } from './daterange'
import { email } from './email'
import { foreignborndocument } from './foreignborndocument'
import { name } from './name'
import { ssn } from './ssn'
import { telephone } from './telephone'

export const civilunion = (data = {}) => {
  return {
    Address: location(data.Address),
    AddressSeparated: location(data.AddressSeparated),
    AddressSeparatedNotApplicable: notapplicable(data.AddressSeparatedNotApplicable),
    BirthPlace: location(data.BirthPlace),
    Birthdate: datecontrol(data.Birthdate),
    Citizenship: datecontrol(data.Citizenship),
    DateSeparated: datecontrol(data.DateSeparated),
    Divorced: datecontrol(data.Divorced),
    Email: email(data.Email),
    EnteredCivilUnion: datecontrol(data.EnteredCivilUnion),
    ForeignBornDocument: foreignborndocument(data.ForeignBornDocument),
    Name: name(data.Name),
    OtherNames: collection(((data.OtherNames || {}).items || []).map(y => {
      const yitem = y.Item || {}
      return {
        Item: {
          Has: branch(yitem.Has),
          Name: name(yitem.Name),
          MaidenName: branch(yitem.MaidenName),
          DatesUsed: daterange(yitem.DatesUsed)
        }
      }
    })),
    SSN: ssn(data.SSN),
    Separated: branch(data.Separated),
    Telephone: telephone(data.Telephone)
  }
}
