import { extractDate } from './History/dateranges'

export const extractApplicantBirthdate = app => {
  const section = (app.Identification || {}).ApplicantBirthDate || {}
  if (!section.Date) {
    return null
  }

  const date = section.Date

  return extractDate(date)
}

export const extractMaritalStatus = app => {
  const section = (app.Relationships || {}).Marital || {}
  if (!section.Status) {
    return null
  }

  return section.Status.value
}

export const extractOtherNames = app => {
  let names = []
  let identification = app.Identification
  if (!identification) {
    return names
  }

  let otherNames = identification.OtherNames
  if (!otherNames) {
    return names
  }

  if (!otherNames.List || !otherNames.List.items) {
    return names
  }

  for (let otherName of otherNames.List.items) {
    const item = otherName.Item || {}
    names.push(item.Name)
  }
  return names
}
