import { general } from './general'
import { name } from './name'
import { datecontrol } from './datecontrol'
import { checkboxgroup } from './checkboxgroup'
import { text } from './text'
import { email } from './email'
import { telephone } from './telephone'
import { notapplicable } from './notapplicable'
import { location } from './location'

export const reference = (data) => {
  return general('reference', {
    FullName: name(data.FullName),
    LastContact: datecontrol(data.LastContact),
    Relationship: checkboxgroup(data.Relationship),
    RelationshipOther: text(data.RelationshipOther),
    Phone: telephone(data.Phone),
    Email: email(data.Email),
    EmailNotApplicable: notapplicable(data.EmailNotApplicable),
    Address: location(data.Address)
  })
}
