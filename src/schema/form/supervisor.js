import { general } from './general'
import { text } from './text'
import { email } from './email'
import { notapplicable } from './notapplicable'
import { location } from './location'
import { telephone } from './telephone'

export const supervisor = (data) => {
  return general('supervisor', {
    SupervisorName: text(data.SupervisorName),
    Title: text(data.Title),
    Email: email(data.Email),
    EmailNotApplicable: notapplicable(data.EmailNotApplicable),
    Address: location(data.Address),
    Telephone: telephone(data.Telephone)
  })
}
