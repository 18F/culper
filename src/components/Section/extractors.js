import { extractDate } from './History/dateranges'

export const extractApplicantBirthdate = (app) => {
  const section = (app.Identification || {}).ApplicantBirthDate || {}
  if (!section.Date) {
    return null
  }

  const date = section.Date

  return extractDate(date)
}

export const extractOtherNames = (app) => {
  const identification = app && app.Identification
  if (!identification) return []

  const otherNames = identification.OtherNames
  if (!otherNames || !otherNames.List || !otherNames.List.items) return []

  const names = otherNames.List.items
    .filter(i => i.Item && i.Item.Name)
    .map(i => i.Item.Name)

  return names
}
