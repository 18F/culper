export const extractApplicantBirthdate = app => {
  const section = (app.Identification || {}).ApplicantBirthDate || {}
  if (!section.Date) {
    return null
  }

  const date = section.Date
  if (!date.day || !date.month || !date.year) {
    return null
  }

  return new Date(`${date.month}/${date.day}/${date.year}`)
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
